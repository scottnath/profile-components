
import { expect } from '@storybook/test';
import { within as shadowWithin } from 'shadow-dom-testing-library';
import { virtual } from '@guidepup/virtual-screen-reader';

import { a11yContent } from './content.js';
import { getExpectedScreenText as getPostScreenText } from '../post/post.shared-spec';
import { formatDate } from "../helpers";
import { spokenDLItem } from '../../utils/testing.js';

/**
 * Extract elements from an shadow DOM element
 */
export const getElements = async (canvasElement) => {
  const screen = shadowWithin(canvasElement);
  const container = await screen.findByShadowLabelText(/dev.to user profile/i);
  const [mainLink] = await screen.queryAllByShadowRole('link');
  const [ avatar ] = await screen.queryAllByShadowRole('img');
  let latest_post = null;
  let popular_post = null;
  let postList = null;
  const banners = await screen.queryAllByShadowRole('banner');
  if (banners.length > 1) {
    postList = banners[1].parentElement;
    banners.forEach((banner) => {
      if (banner.textContent === 'Latest post') {
        latest_post = banner.nextElementSibling;
      }
      if (banner.textContent === 'Popular post') {
        popular_post = banner.nextElementSibling;
      }
    });
  }
  return { 
    screen,
    canvasElement,
    container,
    error: await container?.querySelector('[itemprop="error"]'),
    mainLink: mainLink !== undefined ? mainLink : null,
    avatar,
    name: await mainLink?.querySelector('[itemprop="name"]'),
    summary: await container?.querySelector('[itemprop="description"]'),
    joined_at: await container?.querySelector('[itemprop="startDate"]'),
    post_count: await container?.querySelector('.post_count'),
    postList,
    latest_post,
    popular_post,
  };
}

/**
 * Ensure elements are present and have the correct content
 */
export const ensureElements = async (elements, args) => {
  await expect(elements.container).toBeInTheDocument();
  if (args.error) {
    await expect(elements.mainLink).not.toBeInTheDocument();
    await expect(elements.error).toBeInTheDocument();
    await expect(elements.error).toHaveTextContent(args.error);
    return;
  }

  await expect(elements.error).not.toBeInTheDocument();
  await expect(elements.mainLink).toBeInTheDocument();
  await expect(elements.avatar).toBeInTheDocument();
  await expect(elements.name).toBeInTheDocument();
  
  if (args?.summary) {
    await expect(elements.summary).toBeInTheDocument();
    await expect(elements.summary.textContent).toEqual(args.summary);
  } else {
    await expect(elements.summary).not.toBeInTheDocument();
  }

  if (args?.joined_at) {
    await expect(elements.joined_at).toBeInTheDocument();
    await expect(elements.joined_at).toHaveAttribute('datetime', formatDate(args.joined_at));
    await expect(elements.joined_at.textContent).toContain(args.joined_at);
  } else {
    await expect(elements.joined_at).not.toBeInTheDocument();
  }
  
  if (args?.post_count) {
    await expect(elements.post_count).toBeInTheDocument();
    await expect(elements.post_count.textContent).toContain(`${args.post_count} posts published`);
  } else {
    await expect(elements.post_count).not.toBeInTheDocument();
  }
  
  if (args?.latest_post) {
    await expect(elements.latest_post).toBeInTheDocument();
  } else {
    await expect(elements.latest_post).not.toBeInTheDocument();
  }
  if (args?.popular_post) {
    await expect(elements.popular_post).toBeInTheDocument();
  } else {
    await expect(elements.popular_post).not.toBeInTheDocument();
  }
}

/**
 * Extract the expected screen reader spoken output
 * @param {ForemUser} args - a content object representing a DEV user
 * @returns {string[]} - array of strings representing the expected screen reader output
 */
export const getExpectedScreenText = (args) => {
  const { a11y } = a11yContent(args);
  const expected = ['region, dev.to user profile'];

  // uses `spokenDLItem` to create dt/dd spoken pairs
  const dlItem = new spokenDLItem(expected);

  if (args.error) {
    expected.push(args.error);
  } else {
    expected.push(`banner, ${a11y.headerLabel}`);
    expected.push(`link, ${args.name || args.username}'s profile on dev.to`);
    expected.push(`img, Avatar for ${args.name || args.username}`);
    expected.push(`end of link, ${args.name || args.username}'s profile on dev.to`);
    expected.push(`end of banner, ${a11y.headerLabel}`);
    

    if (args.summary) {
      expected.push(args.summary.replace(/[\r\n]+/gm, ''))
    }
    if (args.joined_at) {
      expected.push('Joined on');
      expected.push(args.joined_at);
    }
    if (args.post_count) {
      expected.push(`${args.post_count} posts published`);
    }
    if (args.latest_post) {
      expected.push('banner, Latest post');
      const postExpected1 = getPostScreenText(args.latest_post);
      expected.push(...postExpected1);
    }
    if (args.popular_post) {
      expected.push('banner, Popular post');
      const postExpected2 = getPostScreenText(args.popular_post);
      expected.push(...postExpected2);
    }

    // <footer>
    expected.push('contentinfo');

    expected.push(`link, View Profile on dev.to`);
    expected.push('end of contentinfo');
  }

  expected.push('end of region, dev.to user profile');
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