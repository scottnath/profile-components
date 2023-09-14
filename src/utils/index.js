/**
 * @fileoverview Utility functions
 */

/**
 * Convert integer to string with big number suffixes
 * @param {number} num 
 * @returns string representing the number with big number suffixes
 */
export const intToString = (num) => {
  if (Math.abs(num) === 0) return 0;
  const map = [
    { suffix: 't', threshold: 1e12 },
    { suffix: 'b', threshold: 1e9 },
    { suffix: 'm', threshold: 1e6 },
    { suffix: 'k', threshold: 1e3 },
    { suffix: '', threshold: 1 },
  ];

  const found = map.find((x) => Math.abs(num) >= x.threshold);
  if (found) {
    let formatted = (num / found.threshold).toFixed(1);
    if (formatted.split('.')[1] && formatted.split('.')[1] == 0) {
      formatted = formatted.split('.')[0];
    }
    if (formatted.split('.')[0].length === 3) {
      formatted = formatted.split('.')[0];
    }
    return formatted + found.suffix;
  }

  return num;
};