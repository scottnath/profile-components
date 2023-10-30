/**
 * @name Testing
 * @module
 * @typicalname testing
 * @description Utility functions used for testing and prototyping components
 * @author @scottnath
 */

/**
 * Generate a mock mastodon api response
 * @param {(ForemPost|ForemUser)} content - mock return data
 * @param {string} type - 'toot-id', 'toot-username' or 'user'
 * @param {number} status - 200 or 404
 * @returns mock response object
 * @function
 */
export const generateMockResponse = (content, type='toot-id', status=200) => {
  let url = `https://mastodon.social/api`;
  let error = 'Record not found';

  if (type === 'toot-id') {
    // calls /articleS/:id (adds 's' to type)
    url += `/v1/statuses/${content.id}`;
  } else if (type === 'toot-username') {
    url += `/v2/search/?q=${username}&type=statuses`;
  } else if (type === 'users') {
    if (!content.id) {
      url += `${type}/by_username?url=${content.username}`;
    } else {
      url += `${type}/${content.id}`;
    }
  }

  if (status === 404) {
    return {
      url,
      method: 'GET',
      status: 404,
      delay: 0,
      response: {
        status: 404,
        error: error
      },
    }
  }
  return {
    url,
    method: 'GET',
    status: 200,
    delay: 0,
    response: content,
  }
}