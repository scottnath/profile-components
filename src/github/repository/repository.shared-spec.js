import { expect } from '@storybook/jest';
import { within as shadowWithin } from 'shadow-dom-testing-library';
import { virtual } from '@guidepup/virtual-screen-reader';

import { spokenDLItem } from '../../utils/testing.js';

/**
 * Extract elements from an shadow DOM element
 */
export const getElements = async (canvasElement) => {
  const screen = shadowWithin(canvasElement);
  const container = await screen.findByShadowLabelText(/GitHub repository/i);
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


/**
 * Extract the expected screen reader spoken output
 * @param {GitHubRepositoryHTML} args - a content object representing a GitHub repository
 * @returns {string[]} - array of strings representing the expected screen reader output
 */
export const getExpectedScreenText = (args) => {
  const expected = ['region, GitHub repository'];

  // uses `spokenDLItem` to create dt/dd spoken pairs
  const dlItem = new spokenDLItem(expected);

  if (args.error) {
    expected.push(args.error);
  } else {
    expected.push(`link, ${args.full_name} repository on GitHub`);

    if (args.description) {
      expected.push(args.description)
    }
    // start of description list
    expected.push('Repository details');
    if (args.language) {
      dlItem.spoken('Language', args.language);
    }
    if (args.stargazers_count && args.stargazers_count > 0) {
      dlItem.spoken('Stars', args.stargazers_count);
    }
    if (args.subscribers_count && args.subscribers_count > 0) {
      dlItem.spoken('Watchers', args.subscribers_count);
    }
    if (args.forks_count && args.forks_count > 0) {
      dlItem.spoken('Forks', args.forks_count);
    }
  }

  expected.push('end of region, GitHub repository');
  return expected;
}

/**
 * Ensure the screen reader reads the correct content
 */
export const ensureScreenRead = async (elements, args) => {
  const expected = getExpectedScreenText(args);
  // Start virtual screen reader
  await virtual.start({ container: elements.container });
  while ((await virtual.lastSpokenPhrase()) !== expected[expected.length - 1]) {
    await virtual.next();
  }

  // Compare spoken phrases to expected
  expect(await virtual.spokenPhraseLog()).toEqual(expected);
  
  // Stop virtual screen reader
  await virtual.stop();
}