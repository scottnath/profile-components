/**
 * @name DEV-User-Utilities
 * @module
 * @typicalname devUserUtils
 * @description Utility functions for fetching and parsing user data
 * @author @scottnath
 */

import { fetchUserPosts, findPost } from '../post/content.js';
import { getApiUrl } from '../utils/index.js';

/**
 * Blank base64-encoded png
 * @see https://png-pixel.com/
 */
const blankPng = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8/x8AAuMB8DtXNJsAAAAASUVORK5CYII=';

/**
 * Content about a dev.to (or Forem) user, sourced from the Forem API and combined with post data.
 * Only required properties from the api are defined.
 * @see https://developers.forem.com/api/v0#tag/users/operation/getUser
 * @typedef {Object} ForemUser
 * 
 * @property {string} username - The username of the user
 * @property {string} name - The name of the user
 * @property {string} summary - The user's bio
 * @property {string} joined_at - The date the user joined
 * @property {string} profile_image - The URL of the user's profile image
 */

/**
 * 
 * @typedef {ForemUser} ForemUserHTML
 * @property {string} [error] - An error message
 * @property {number} [post_count] - The number of posts the user has published
 * @property {ForemPostHTML} [latest_post] - User's latest post
 * @property {ForemPostHTML} [popular_post] - User's most popular post
 */

/**
 * Fetch a user's data from the Forem API
 * @param {string} username - The username of the user
 * @param {string} id - the id of the user
 * @returns {(ForemUser | ForemError)} response status 200: article; else status 404: error
 * @function
 */
export const fetchUser = async (username, id) => {
  let response;
  if (!username && id) {
    response = await fetch(`${getApiUrl()}/users/${id}`);
  } else {
    response = await fetch(`${getApiUrl()}/users/by_username?url=${username?.toLowerCase()}`);
  }
  const userJson = await response.json();
  return userJson;
}

/**
 * Parse a dev.to (or Forem) user's content. This is a reducer on the endpoint response, 
 *  but generally reduces any object to just the data required for the user component HTML
 * @param {ForemUser} user - user object
 * @returns {ForemUserHTML}
 * @function
 */
export const parseFetchedUser = (user = {}) => {
  if (!user.username) {
    user.error = 'Username is required';
    return user;
  }
  const parsed = {
    username: user.username,
    name: user.name,
    summary: user.summary,
    joined_at: user.joined_at,
    profile_image: user.profile_image,
    post_count: user.post_count,
    posts: user.posts,
  }
  const usr = {};
  // remove `undefined` values
  for (const key in parsed) {
    if (parsed[key]) usr[key] = parsed[key];
  }
  return usr;
}

/**
 * Parses and cleans user content to match what is expected by the user HTML
 * @param {ForemUserHTML} content - a content object representing a dev.to user
 * @returns {ForemUserHTML} ready for HTML content
 * @function
 */
export const cleanUserContent = (content = {}) => {
  content.profile_image = content.profile_image || blankPng;
  content.name = content.name || `@${content.username}`;
  if (content.latest_post) {
    if (content.popular_post) {
      if (content.popular_post === content.latest_post) {
        delete content.popular_post;
      } else {
        content.popular_post.cover_image = content.popular_post.cover_image || blankPng;
      }
    }
    content.latest_post.cover_image = content.latest_post.cover_image || blankPng;
  }
  return content;
}

/**
 * Generates an object of content for the user HTML
 * @param {ForemUserHTML} content 
 * @param {boolean} [fetch] 
 * @returns {ForemUserHTML} content ready for HTML, possibly includes fetched content
 * @function
 */
export const generateUserContent = async (content, fetch = false) => {
  const user = parseFetchedUser(content);
  let fetched = {};
  if (fetch) {
    fetched = await fetchUser(user.username);
    if (fetched.error) {
      if (fetched.error === 'Not Found') {
        return { error: `Fetch Error: User "${content.username}" not found`};
      }
      return { error: `Fetch Error: ${fetched.message}`};
    }
    const posts = await fetchUserPosts(user.username);
    if (posts.length) {
      fetched.post_count = posts.length;
      fetched.latest_post = findPost(posts, 'latest');
      fetched.popular_post = findPost(posts, 'popular');
    }
  }
  return cleanUserContent(Object.assign({}, fetched, user));
}