import { expect } from '@storybook/jest';
import { within as shadowWithin } from 'shadow-dom-testing-library';

/**
 * Extract elements from an shadow DOM element
 */
export const getElements = async (canvasElement) => {
  const screen = shadowWithin(canvasElement);
  const container = await screen.findByShadowLabelText(/dev.to article/i);
  const link = await screen.queryByShadowRole('link');
  const image = await screen.queryByShadowRole('img');
  const title = await container?.querySelector('[itemprop="name"]');
  return { 
    screen,
    canvasElement,
    container,
    link,
    image,
    title,
    error: await container?.querySelector('[itemprop="error"]'),
  };
}

/**
 * Ensure elements are present and have the correct content
 */
export const ensureElements = async (elements, args) => {
  await expect(elements.container).toBeTruthy();

  if (args.fetch && !args.id) {
    await expect(elements.link).toBeFalsy();
    await expect(elements.container).toHaveTextContent('Post ID is required to fetch post content');
  }
  if (args.error) {
    await expect(elements.link).toBeFalsy();
    await expect(elements.error).toBeTruthy();
    await expect(elements.error).toHaveTextContent(args.error);
    return;
  }

  await expect(elements.link).toBeTruthy();
  await expect(elements.link).toHaveAttribute('href', args.url);
  await expect(elements.title).toBeTruthy();
  await expect(elements.title).toHaveTextContent(args.title);
  await expect(elements.image).toBeTruthy();
  await expect(elements.image).toHaveAttribute('src', args.cover_image);
}