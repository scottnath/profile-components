/**
 * @name Testing
 * @module
 * @typicalname testing
 * @description Utility functions used for testing and prototyping components
 * @author @scottnath
 */

/**
 * Generate a mock github api response
 * @param {(GitHubRepository | GitHubUser)} content - mock return data
 * @param {string} type - 'users' or 'repos'
 * @param {number} status - 200 or 404
 * @returns mock response object
 * @function
 */
export const generateMockResponse = (content, type='users', status=200) => {
  let url = `https://api.github.com/${type}/`;

  if (type === 'users') {
    url += content.login;
  } else if (type === 'repos') {
    url += content.full_name;
  }

  if (status === 404) {
    return {
      url,
      method: 'GET',
      status: 404,
      delay: 0,
      response: {
        documentation_url: `https://docs.github.com/rest/${type}/${type}`,
        message: "Not Found"
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