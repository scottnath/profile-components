/**
 * @name Fixtures
 * @module
 * @typicalname fixtures
 * @description Utility functions for generating fixtures for GitHub data
 * @author @scottnath
 */

import { outputFile } from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

import { fetchUser } from './github.js';
import { fetchRepo } from '../repository/content.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fixturesDir = path.join(__dirname, '../fixtures/generated');

/**
 * Generate a fixture for a GitHub repository and write it to a JSON file
 * @param {string} full_name - repo full name, as in `scottnath/profile-components`
 */
export const generateFixtureRepo = async (full_name) => {
  const filename = `repo--${full_name.replace('/', '-')}.json`;
  const contents = await fetchRepo(full_name);

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
  const repos = [
    'freeCodeCamp/freeCodeCamp',
    'scottnath/profile-components',
    'scottnath/scottnath.com',
    'storydocker/storydocker',
  ];
  const users = [
    'scottnath',
    'sindresorhus',
  ];

  for (const repo of repos) {
    await generateFixtureRepo(repo);
  }
  for (const user of users) {
    await generateFixtureUser(user);
  }
}
