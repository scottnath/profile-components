import { fetchUserPosts, findPost, parseFetchedPost } from '../post/content.js';
import { getApiUrl } from '../helpers/index.js';
import { parseify } from '../../utils/index.js';

/**
 * Blank base64-encoded png
 * @see https://png-pixel.com/
 * @ignore
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
 * @memberof DEVUtils.user
 */

/**
 * 
 * @typedef {ForemUser} ForemUserHTML
 * @property {string} [error] - An error message
 * @property {number} [post_count] - The number of posts the user has published
 * @property {ForemPostHTML} [latest_post] - User's latest post
 * @property {ForemPostHTML} [popular_post] - User's most popular post
 * @property {Object} [a11y] - accessibility content
 * @property {string} [schema_itemprop] - schema.org itemprop content on main element
 * @memberof DEVUtils.user
 */

/**
 * Fetch a user's data from the Forem API
 * @param {string} username - The username of the user
 * @param {string} id - the id of the user
 * @returns {(ForemUser | ForemError)} response status 200: article; else status 404: error
 * @function
 * @ignore
 */
export const fetchUser = async (username, id) => {
  let response;
  if (!username && id) {
    response = await fetch(`${getApiUrl()}/users/${id}`, {
      cache: 'no-cache',
    });
  } else {
    response = await fetch(`${getApiUrl()}/users/by_username?url=${username?.toLowerCase()}`, {
      cache: 'no-cache',
    });
  }
  const userJson = await response.json();
  return userJson;
}

/**
 * Parses a string, which should be a JSON stringified array of DEV post 
 *  objects
 * @param {string} postStr - String of ForemPost data
 * @returns {ForemPost} content for a post
 * @function
 * @ignore
 */
export const parsePostString = (postStr) => {
  if (typeof postStr !== 'string') return postStr;
  let post = {};
  try {
    post = parseify(postStr);
  } catch (error) {
    console.error(error);
    return {};
  }
  post.schema_itemprop = post.schema_itemprop || 'exampleOfWork'
  return post;
}

/**
 * Parse a dev.to (or Forem) user's content. This is a reducer on the endpoint response, 
 *  but generally reduces any object to just the data required for the user component HTML
 * @param {ForemUser} user - user object
 * @returns {ForemUserHTML}
 * @function
 * @ignore
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
    latest_post: parsePostString(user.latest_post),
    popular_post: parsePostString(user.popular_post),
    a11y: user.a11y || {},
    schema_itemprop: user.schema_itemprop || '',
  }
  const usr = {};
  // remove `undefined` values
  for (const key in parsed) {
    if (parsed[key]) usr[key] = parsed[key];
  }
  return usr;
}

export const a11yContent = (content) => {
  let headerLabel = `dev.to user ${content.username}`;
  if (content.name) {
    headerLabel = headerLabel.replace(content.username, `${content.name}, username ${content.username}`);
  }
  content.a11y = {
    ...content.a11y,
    headerLabel,
  }
  return content;
}

/**
 * Parses and cleans user content to match what is expected by the user HTML
 * @param {ForemUserHTML} content - a content object representing a dev.to user
 * @returns {ForemUserHTML} ready for HTML content
 * @function
 * @ignore
 */
export const cleanUserContent = (content = {}) => {
  content.profile_image = content.profile_image || blankPng;
  content.name = content.name || `@${content.username}`;
  if (content.latest_post) {
    content.latest_post = parseFetchedPost(parsePostString(content.latest_post));
    if (content.popular_post) {
      content.popular_post = parseFetchedPost(parsePostString(content.popular_post));
      if (content.popular_post.url === content.latest_post.url) {
        delete content.popular_post;
      } else {
        content.popular_post.cover_image = content.popular_post.cover_image || blankPng;
      }
    }
    content.latest_post.cover_image = content.latest_post.cover_image || blankPng;
  }
  return a11yContent(content);
}

/**
 * Generates an object of content for the user HTML
 * @param {ForemUserHTML} content 
 * @param {boolean} [fetch] 
 * @returns {ForemUserHTML} content ready for HTML, possibly includes fetched content
 * @function
 * @memberof DEVUtils.user
 * @name generateContent
 */
export const generateUserContent = async (content, fetch = false) => {
  const user = parseFetchedUser(content);
  let fetched = {};
  if (fetch && fetch !== 'false') {
    fetched = await fetchUser(user.username);
    if (fetched?.error) {
      if (fetched.error === 'Not Found') {
        return { error: `Fetch Error: User "${content.username}" not found`};
      }
      return { error: `Fetch Error: ${fetched.message}`};
    }
    fetched = parseFetchedUser(fetched);
    const posts = await fetchUserPosts(user.username);
    if (posts.length) {
      fetched.post_count = posts.length;
      if (fetch !== 'no-posts') {
        fetched.latest_post = findPost(posts, 'latest');
        fetched.popular_post = findPost(posts, 'popular');
      }
      if (fetched.latest_post && user.latest_post) {
        user.latest_post = {
          ...fetched.latest_post,
          ...user.latest_post,
        }
      }
      if (fetched.popular_post && user.popular_post) {
        user.popular_post = {
          ...fetched.popular_post,
          ...user.popular_post,
        }
      }
    }
  }
  return cleanUserContent(Object.assign({}, fetched, user));
}