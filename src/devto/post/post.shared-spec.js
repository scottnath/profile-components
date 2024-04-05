import { expect } from '@storybook/test';
import { within as shadowWithin } from 'shadow-dom-testing-library';
import { virtual } from '@guidepup/virtual-screen-reader';

import { spokenDLItem } from '../../utils/testing.js';


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

/**
 * Extract the expected screen reader spoken output
 * @param {ForemPostHTML} args - a content object representing a DEV post
 * @returns {string[]} - array of strings representing the expected screen reader output
 */
export const getExpectedScreenText = (args) => {
  const expected = ['dev.to article'];

  // uses `spokenDLItem` to create dt/dd spoken pairs
  const dlItem = new spokenDLItem(expected);

  if (args.error) {
    expected.push(args.error);
  } else {
    expected.push(`link, article ${args.title}`);
    expected.push(`img, Cover image for article ${args.title}`);
    expected.push(`end of link, article ${args.title}`);
  }

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
