import { parseify } from '../../utils/index.js';

/** @ignore */
const mastodonApi = 'https://mastodon.social/api';

/**
 * Fetch a user from Mastodon by ID
 * @param {string} id 
 * @returns response status 200: {Object} user; else {Object} error
 * @function
 * @ignore
 */
export const fetchUser = async (id) => {
  const response = await fetch(`${mastodonApi}/v1/accounts/${id}`);
  const userJson = await response.json();
  if (!userJson.id) {
    return { error: 'User not found' };
  }
  return userJson;
}

/**
 * Fetch a user from Mastodon by username
 * @param {string} username 
 * @returns response status 200: {Object} user; else {Object} error
 * @function
 * @ignore
 */
export const fetchUserByUsername = async (username) => {
  const response = await fetch(`${mastodonApi}/v2/search?q=${username}&type=accounts`);
  const searchResults = await response.json();
  const user = searchResults.accounts.find(account => account.username === username);
  if (!user) {
    return { error: 'User not found' };
  }
  return user;
}

/**
 * Parse a Mastodon user down to only the data required for the user component
 * @param {Object} user
 * @returns {Object} component-ready user object
 * @function
 * @ignore
 */
export const parseFetchedUser = (user = {}) => {
  return {
    id: user.id,
    username: user.username,
    acct: user.acct,
    url: user.url,
    display_name: user.display_name,
    note: user.note,
    avatar: user.avatar,
    avatar_static: user.avatar_static,
    header: user.header,
    header_static: user.header_static,
    bot: user.bot,
    group: user.group,
    created_at: user.created_at,
    last_status_at: user.last_status_at,
    statuses_count: user.statuses_count,
    followers_count: user.followers_count,
    following_count: user.following_count
  }
}

/**
 * Generates an object of content for the Mastodon user HTML
 * @param {Object} content 
 * @param {boolean} [fetch] 
 * @returns {Object} content ready for HTML, possibly includes fetched content
 * @function
 * @memberof MastodonUtils.user
 * @name generateUserContent
 */
export const generateUserContent = async (content, fetch = false) => {
  const userFromContent = parseFetchedUser(content);
  if (userFromContent.error) return userFromContent;
  let fetched = {};
  if (fetch) {
    if (content.id) {
      fetched = await fetchUser(content.id);
    } else if (content.username) {
      fetched = await fetchUserByUsername(content.username);
    }
    if (fetched.error) {
      return { error: `Fetch Error: ${fetched.error}` };
    }
    fetched = parseFetchedUser(fetched);
  }
  return Object.assign({}, fetched, userFromContent);
}
