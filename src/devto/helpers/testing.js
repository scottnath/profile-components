/**
 * @name Testing
 * @module
 * @typicalname testing
 * @description Utility functions used for testing and prototyping components
 * @author @scottnath
 */

/**
 * Generate a mock github api response
 * @param {(ForemPost|ForemUser)} content - mock return data
 * @param {string} type - 'users' or 'article'
 * @param {number} status - 200 or 404
 * @returns mock response object
 * @function
 */
export const generateMockResponse = (content, type='article', status=200) => {
  let url = `https://dev.to/api/`;

  if (type === 'article') {
    // calls /articleS/:id (adds 's' to type)
    url += `${type}s/${content.id}`;
  } else if (type === 'articles') {
    url += `${type}/latest?per_page=1000&username=fake`;
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
        error: "Not Found"
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