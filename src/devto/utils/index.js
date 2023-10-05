/**
 * @name DevTo-Utilities
 * @module
 * @typicalname devToUtils
 * @description Multi-use utility functions
 * @author @scottnath
 */

/**
 * Content in an error response from the dev.to (or Forem) API
 * @typedef {Object} ForemError
 * @property {number} status - response status code
 * @property {string} error - error message
 */

/**
 * Get the API url, whether dev.to or forem.dev
 * @function
 * @param {string} api - 'devto' or 'forem'
 * @returns {string} - url
 */
export const getApiUrl = (api = 'devto') => {
  switch (api) {
    case 'devto':
      return 'https://dev.to/api';
    case 'forem':
      return 'https://forem.dev/api';
    default:
      return 'https://dev.to/api';
  }
}

/**
 * Format a date for machine-readability
 * @param {string} dt 
 * @returns {string} - the machine-readable value of the date
 */
export const formatDate = (dt) => {
  const x = new Date(dt);
  const year = x.getFullYear()
  const month = String(x.getMonth() + 1).padStart(2, '0')
  const day = String(x.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}