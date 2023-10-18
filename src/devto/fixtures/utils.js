/**
 * @name Fixtures
 * @module
 * @typicalname fixtures
 * @description Utility functions for generating fixtures for devto data
 * @author @scottnath
 */

import { outputFile } from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

import { fetchPost } from '../post/content.js';
import { fetchUser } from '../user/content.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fixturesDir = path.join(__dirname, './generated');

/**
 * Generate a fixture for a post and write it to a JSON file
 * @param {number} id - article identifier
 */
export const generateFixturePost = async ({id, slug}) => {
  const contents = await fetchPost(id);
  if (contents.error) return console.error(contents);
  const filename = `post--${slug}.json`;

  try {
    await outputFile(path.join(fixturesDir, filename), JSON.stringify(contents, null, 2));
  } catch (err) {
    console.error(err)
  }
}

/**
 * Generate a fixture for a GitHub user and write it to a JSON file
 * @param {string} username - GitHub user login 
 */
export const generateFixtureUser = async (username) => {
  const filename = `user--${username}.json`;
  const contents = await fetchUser(username);

  try {
    await outputFile(path.join(fixturesDir, filename), JSON.stringify(contents, null, 2));
  } catch (err) {
    console.error(err)
  }
}

/**
 * Generate fixtures for a set of GitHub repositories and users
 */
export const generateFixtures = async () => {
  const posts = [
    {
      id: 1568661,
      slug: 'dependabot',
    },
    {
      id: 1466138,
      slug: 'bugfix-multi-vite',
    },
    {
      id: 1630208,
      slug: 'profile-components',
    },
    {
      id: 1631825,
      slug: 'profile-components-github',
    }
  ];
  const users = [
    'scottnath',
    'meowmeow',
  ];

  for (const post of posts) {
    await generateFixturePost(post);
  }
  for (const user of users) {
    await generateFixtureUser(user);
  }
}
