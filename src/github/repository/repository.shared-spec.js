import { expect } from '@storybook/jest';
import { within as shadowWithin } from 'shadow-dom-testing-library';

/**
 * Extract elements from an shadow DOM element
 */
export const getElements = async (canvasElement) => {
  const screen = shadowWithin(canvasElement);
  const container = await screen.queryByShadowLabelText(/GitHub repository/i);
  const link = await screen.queryByShadowRole('link');
  const langDetails = await container?.querySelector('[itemprop="programmingLanguage"]');
  const langTerm = await langDetails?.previousElementSibling;
  return { 
    screen,
    canvasElement,
    container,
    link,
    error: await container?.querySelector('[itemprop="error"]'),
    org: await container?.querySelector('[itemprop="maintainer"]'),
    name: await container?.querySelector('[itemprop="name"]'),
    description: await container?.querySelector('[itemprop="about"]'),
    langDetails,
    langTerm,
  };
}

/**
 * Ensure elements are present and have the correct content
 */
export const ensureElements = async (elements, args) => {
  if (args.error) {
    await expect(elements.link).toBeFalsy();
    await expect(elements.container).toBeTruthy();
    await expect(elements.error).toBeTruthy();
    await expect(elements.error).toHaveTextContent(args.error);
    return;
  }
  if (!args.full_name) {
    await expect(elements.link).toBeFalsy();
    await expect(elements.container).toBeTruthy();
    await expect(elements.container).toHaveTextContent('Missing repo attribute: `full_name`');
    return;
  }
  /** full_name split into an array */
  const full_nameSplit = args.full_name.split('/');

  await expect(elements.link).toBeTruthy();
  await expect(elements.container).toBeTruthy();
  await expect(elements.name).toBeTruthy();
  if (args?.name) {
    await expect(elements.name).toHaveTextContent(args.name);
  } else {
    await expect(elements.name).toHaveTextContent(full_nameSplit[1]);
  }

  /** org from args or derived from full_nameSplit */
  const org = args?.org ? args.org : full_nameSplit[0];
  if (args.no_org) {
    await expect(elements.org).toBeFalsy();
  } else {
    await expect(elements.org).toBeTruthy();
    await expect(elements.org).toHaveTextContent(org);
  }
  
  if (args?.description) {
    await expect(elements.description).toBeTruthy();
    await expect(elements.description).toHaveTextContent(args.description);
  } else {
    await expect(elements.description).toBeFalsy();
  }
  if (args?.language) {
    await expect(elements.langDetails).toBeTruthy();
    await expect(elements.langTerm).toBeTruthy();
  } else {
    await expect(elements.langDetails).toBeFalsy();
    await expect(elements.langTerm).toBeFalsy();
  }
}