/**
 * @name GitHub-Utilities
 * @module
 * @typicalname githubUtils
 * @description Utility functions for fetching and parsing GitHub data
 * @author @scottnath
 */

const githubApi = 'https://api.github.com';

/**
 * Content needed to render a GitHub user. This is a subset of the `users` endpoint response
 * @see https://docs.github.com/en/rest/users/users#get-a-user
 * @typedef {Object} GitHubUser
 * 
 * @property {string} login - User's GitHub login
 * @property {string} name - User's name
 * @property {string} [username] - alias for `login`
 * @property {string} [avatar_url] - URL to user's avatar
 * @property {string} [bio] - User's biography content
 * @property {string} [following] - number of people user is following
 * @property {string} [followers] - number of followers
 */

/**
 * Fetch a user from
 * @see https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-a-user
 * @param {string} username 
 * @returns response status 200: {Object} user; else {Object} error
 * @function
 */
export const fetchUser = async (username) => {
  const response = await fetch(`${githubApi}/users/${username}`);
  const userJson = await response.json();
  return userJson;
}

/**
 * Parse a GitHub user from the `user` endpoint response down to 
 *  only the data required for the user component
 * @param {Object} user
 * @returns {GitHubUser} component-ready user object
 * @function
 */
export const parseFetchedUser = (user = {}) => {
  return {
    login: user.login,
    name: user.name,
    username: user.login,
    avatar_url: user.avatar_url,
    bio: user.bio,
    following: user.following,
    followers: user.followers,
  }
}

/**
 * Content needed to render a GitHub repository. This is a subset of the `repos` endpoint response
 * @typedef {Object} GitHubRepository
 * 
 * @property {string} itemprop - Itemprop content to go on itemscope
 * @property {string} full_name - repository org and name, as in `scottnath/profile-components`
 * @property {string} [name] - repo name
 * @property {string} [org] - repo owner organization's login, found at `<REST_RESPONSE>.organization.login`
 * @property {string} [description] - repo description
 * @property {string} [language] - programming language used in repo
 * @property {string} [stargazers_count] - number of stars
 * @property {string} [forks_count] - number of forks
 * @property {string} [subscribers_count] - number of watchers
 */


/**
 * Fetch a GitHub repository's content from the GitHub api
 * @see https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#get-a-repository
 * @param {string} full_name
 * @returns response status 200: {Object} repo; else {Object} error
 * @function
 */
export const fetchRepo = async (full_name) => {
  const response = await fetch(`${githubApi}/repos/${full_name}`);
  const repoJson = await response.json();
  return repoJson;
}

/**
 * Parse a GitHub repository from the `repos` endpoint response down to 
 *  only the data required for the repository component
 * @param {Object} repo
 * @returns {GitHubRepository}
 * @function
 */
export const parseFetchedRepo = (repo = {}) => {
  return {
    full_name: repo.full_name,
    name: repo.name,
    org: repo.organization?.login,
    description: repo.description,
    language: repo.language,
    stargazers_count: repo.stargazers_count,
    forks_count: repo.forks_count,
    subscribers_count: repo.subscribers_count,
  }
}
