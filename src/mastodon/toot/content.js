/** @ignore */
const mastodonApi = 'https://mastodon.social/api/v2/search';
const mastodonStatusApi = 'https://mastodon.social/api/v1/statuses';

/**
 * @typedef {Object} MastodonTootHTML
 * @property {string} content - The content of the toot.
 * @property {number} favourites_count - Number of favourites for the toot.
 * @property {number} replies_count - Number of replies to the toot.
 * @property {number} reblogs_count - Number of reblogs of the toot.
 * @property {string} created_at - Creation date of the toot.
 * @property {string} url - URL of the toot.
 * @property {string} [error] - Optional error message.
 */

/**
 * Fetch a specific Mastodon toot using its status ID
 * @param {string} statusId - Mastodon toot status ID
 * @returns {Object} toot; else {Object} error
 * @function
 * @ignore
 */
export const fetchToot = async (statusId) => {
  const options = {
    cache: 'no-cache',
  };
  const tootResponse = await fetch(`${mastodonStatusApi}/${statusId}`, options);
  const tootJson = await tootResponse.json();
  return tootJson;
}

/**
 * Fetch a Mastodon toot's content from the Mastodon API using a username
 * @param {string} username - Mastodon username
 * @returns {Object} toot; else {Object} error
 * @function
 * @ignore
 */
export const fetchTootByUsername = async (username) => {
  const options = {
    cache: 'no-cache',
  };
  const response = await fetch(`${mastodonApi}?q=${username}&type=statuses`, options);
  const tootJson = await response.json();

  // Filter toots to only include those owned by the specified username
  const userTweets = tootJson?.statuses 
  ? tootJson.statuses.filter(status => status.account.username === username)
  : [];

  // Check for a pinned toot
  const pinnedToot = userTweets.find(toot => toot.pinned);

  // Return the pinned toot if found, otherwise return the latest toot by the user
  return pinnedToot || userTweets?.[0] || { error: `No toots found for ${username}`};
}


/**
 * Parse a fetched Mastodon toot's content
 * @param {Object} toot - Mastodon toot object
 * @returns {Object} parsed toot content
 * @function
 * @ignore
 */
export const parseFetchedToot = (toot = {}) => {
  const parsed = {
    username: toot.username || toot.account?.username,
    content: toot.content,
    favourites_count: toot.favourites_count,
    replies_count: toot.replies_count,
    reblogs_count: toot.reblogs_count,
    created_at: toot.created_at,
    url: toot.url,
    username: toot.username,
  };

  const tt = {};
  // remove `undefined` values
  for (const key in parsed) {
    if (parsed[key]) tt[key] = parsed[key];
  }
  return tt;
}

/**
 * Validates and cleans toot content
 * @param {Object} content 
 * @returns {Object} cleaned toot content or error
 * @function
 * @ignore
 */
export const cleanTootContent = (content) => {
  if (!content.id) {
    return { error: "Toot content is missing the 'id' attribute." };
  }
  return content;
}

/**
 * Generates an object of content for the toot HTML
 * @param {Object} content 
 * @param {boolean} [fetch] 
 * @returns {Object} content ready for HTML, possibly includes fetched content
 * @function
 * @memberof MastodonUtils.toot
 * @name generateTootContent
 */
export const generateTootContent = async (content, fetch = false) => {
  const tootFromContent = parseFetchedToot(content);
  if (tootFromContent.error) return tootFromContent;
  let fetched = {};
  if (fetch) {
    if (content.id) {
      fetched = await fetchToot(content.id);
    } else {
      fetched = await fetchTootByUsername(content.username);
    }
    if (fetched.error) {
      return { error: `Fetch Error: ${fetched.error}` };
    }
    fetched = parseFetchedToot(fetched);
  }
  return Object.assign({}, fetched, tootFromContent);
}
