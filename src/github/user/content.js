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
