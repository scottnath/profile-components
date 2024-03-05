
import { expect } from '@storybook/jest';
import { within as shadowWithin } from 'shadow-dom-testing-library';
import { virtual } from '@guidepup/virtual-screen-reader';

import { a11yContent } from './content.js';
import { getExpectedScreenText as getRepoScreenText } from '../repository/repository.shared-spec';
import { intToString } from '../../utils/index.js';
import { spokenDLItem } from '../../utils/testing.js';

/**
 * Extract elements from an shadow DOM element
 */
export const getElements = async (canvasElement) => {
  const screen = shadowWithin(canvasElement);
  const container = await screen.findByShadowLabelText(/GitHub user profile/i);
  const [headerName] = await container?.querySelectorAll('[itemprop="alternativeName"]');
  const [mainLink] = await screen.queryAllByShadowRole('link');
  const [ avatar ] = await screen.queryAllByShadowRole('img');
  const [ bio ] = await container?.querySelectorAll('[itemprop="description"]');
  return { 
    screen,
    canvasElement,
    container,
    error: await container?.querySelector('[itemprop="error"]'),
    headerName,
    mainLink,
    avatar,
    name: await mainLink?.querySelector('[itemprop="name"]'),
    login: await mainLink?.querySelector('[itemprop="alternativeName"]'),
    bio,
    followers: await container?.querySelector('[itemprop="followee"]'),
    following: await container?.querySelector('[itemprop="follows"]'),
    repos: await Array.from(container?.querySelectorAll('[itemscope].repo')),
  };
}

/**
 * Ensure elements are present and have the correct content
 */
export const ensureElements = async (elements, args) => {
  if (args.error) {
    await expect(elements.mainLink).toBeFalsy();
    await expect(elements.container).toBeTruthy();
    await expect(elements.error).toBeTruthy();
    await expect(elements.error).toHaveTextContent(args.error);
    return;
  }

  await expect(elements.error).toBeFalsy();
  await expect(elements.container).toBeTruthy();
  await expect(elements.headerName).toBeTruthy();
  await expect(elements.headerName).toHaveTextContent(args.login);
  await expect(elements.mainLink).toBeTruthy();
  await expect(elements.avatar).toBeTruthy();
  await expect(elements.name).toBeTruthy();
  await expect(elements.login).toBeTruthy();
  
  if (args?.bio) {
    await expect(elements.bio).toBeTruthy();
    await expect(elements.bio).toHaveTextContent(args.bio);
  } else {
    await expect(elements.bio).toBeFalsy();
  }
  if (args?.following) {
    await expect(elements.following).toBeTruthy();
    await expect(elements.following).toHaveTextContent(intToString(args.following));
  } else {
    await expect(elements.following).toBeFalsy();
  }
  if (args?.followers) {
    await expect(elements.followers).toBeTruthy();
    await expect(elements.followers).toHaveTextContent(intToString(args.followers));
  } else {
    await expect(elements.followers).toBeFalsy();
  }
  if (args?.repos) {
    let reps = [];
    if (typeof args.repos === 'string') {
      reps = parseify(args.repos);
    } else if (Array.isArray(args.repos)){
      reps = args.repos;
    }
    await expect(elements.repos).toHaveLength(reps.length);
  } else {
    await expect(elements.repos).toHaveLength(0);
  }
}

/**
 * Extract the expected screen reader spoken output
 * @param {GitHubUserHTML} args - a content object representing a GitHub user
 * @returns {string[]} - array of strings representing the expected screen reader output
 */
export const getExpectedScreenText = (args) => {
  const { a11y } = a11yContent(args);
  const expected = ['region, GitHub user profile'];

  // uses `spokenDLItem` to create dt/dd spoken pairs
  const dlItem = new spokenDLItem(expected);

  if (args.error) {
    expected.push(args.error);
  } else {
    expected.push(`banner, ${a11y.headerLabel}`);
    expected.push(`link, ${args.name || args.login}'s profile on GitHub`);
    expected.push(`img, Avatar for ${args.name || args.login}`);
    expected.push(`end of link, ${args.name || args.login}'s profile on GitHub`);
    

    if (args.bio) {
      expected.push(args.bio)
    }
    if (args.followers || args.following) {
      expected.push('GitHub user stats');
      if (args.followers) {
        // dlItem.spoken('Followers', args.followers);
        expected.push(`followers: ${args.followers}`);
      }
      if (args.following) {
        // dlItem.spoken('Following', args.following);
        expected.push(`following: ${args.following}`);
      }
    }
    if (args?.repos) {
      let reps = [];
      if (typeof args.repos === 'string') {
        reps = parseify(args.repos);
      } else if (Array.isArray(args.repos)){
        reps = args.repos;
      }
      if (Array.isArray(reps)) {
        expected.push('banner, Pinned repositories');
        reps.forEach((repo) => {
          const repoExpected = getRepoScreenText(repo);
          expected.push(...repoExpected);
        });
      }
    }
  }

  expected.push('end of region, GitHub user profile');
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