
import { expect } from '@storybook/jest';
import { within as shadowWithin } from 'shadow-dom-testing-library';

import { intToString } from '../../utils/index.js';

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
    try {
      reps = parseify(args.repos);
      await expect(elements.repos).toHaveLength(reps.length);
    } catch (error) {
      await expect(elements.repos).toHaveLength(0);
    }
  } else {
    await expect(elements.repos).toHaveLength(0);
  }
}