/**
 * @name DevTo-Post-Utilities
 * @module
 * @typicalname devtoPostUtils
 * @description Utility functions for fetching and parsing post data
 * @author @scottnath
 */

import { getApiUrl } from '../utils/index.js';

/**
 * Content about one post by dev.to (or Forem) user, sourced from a Forem API.
 * @see https://developers.forem.com/api/v1#tag/articles/operation/getLatestArticles
 * @typedef {Object} ForemPost
 * @property {string} title - The title of the post
 * @property {string} url - The URL of the post
 * @property {string} cover_image - The URL of the post's full-size cover image
 * @property {string} social_image - The URL of the post's social image
 */

/**
 * Forem post content, ready for HTML
 * @typedef {ForemPost & {error: string}} ForemPostHTML
 */

/**
 * Fetch a post from the dev.to (or Forem) API
 * @see https://developers.forem.com/api/v0#tag/articles/operation/getArticleById
 * @param {string} id - unique post identifier
 * @returns {Object} response status 200: article; else status 404: error
 * @function
 */
export const fetchPost = async (id) => {
  const response = await fetch(`${getApiUrl()}/articles/${id}`);
  const repoJson = await response.json();
  return repoJson;
}

/**
 * @function Fetch a user's posts from the Forem API
 * @param {string} username 
 * @returns {ForemPost[]} - An array of posts
 */
export const fetchUserPosts = async (username) => {
  const articles = await fetch(`${getApiUrl()}/articles/latest?per_page=1000&username=${username?.toLowerCase()}`);
  const articlesJson = await articles.json();
  return articlesJson;
}

/**
 * Find a post in an array of posts
 * @param {ForemPost[]} posts - array of posts
 * @param {string} [type='popular'] - type of post to find
 * @returns {ForemPost} - post
 */
export const findPost = (posts, type='popular') => {
  if (!posts.length) return {};
  switch (type) {
    case 'latest':
      return posts.reduce((prev, current) => {
        return (prev.published_at > current.published_at) ? prev : current

      });
    case 'popular':
    default:
      return posts.reduce((prev, current) => {
        return (prev.positive_reactions_count > current.positive_reactions_count) ? prev : current
      });
  }
}

/**
 * Parse a dev.to (or Forem) post's content. This is a reducer on the endpoint response, 
 *  but generally reduces any object to just the data required for the post component HTML
 * @param {Object} post - post object
 * @returns {ForemPost}
 * @function
 */
export const parseFetchedPost = (post = {}) => {
  return {
    title: post.title,
    url: post.url,
    cover_image: post.cover_image,
    social_image: post.social_image,
  }
}

/**
 * Parses and confirms post content to match what is expected by the post HTML
 * @param {ForemPost} content 
 * @returns {(ForemPost | import('../utils/index.js').ForemError)} 
 */
export const cleanPostContent = (content = {}) => {
  const post = parseFetchedPost(content);
  if (!post.title || !post.url || !post.cover_image) {
    return { error: 'Post content is missing required data' };
  }
  return post;
}

/**
 * Generates an object of content for the post HTML
 * @param {ForemPost} content 
 * @param {boolean} [fetch] - whether to fetch post content from the API
 * @returns {(ForemPost | import('../utils/index.js').ForemError)} content ready for HTML, possibly includes fetched content
 * @function
 */
export const generatePostContent = async (content, fetch = false) => {
  if (fetch) {
    if (!content.id) {
      return { error: 'Post ID is required to fetch post content' };
    }
    let fetched = {};
    fetched = await fetchPost(content.id);
    if (fetched.error) {
      if (fetched.error === 'Not Found') {
        return { error: `Fetch Error: Post "${content.id}" not found`};
      }
      return { error: `Fetch Error: ${fetched.message}`};
    }
    fetched = cleanPostContent(fetched);
    if (fetched.error) return fetched;
    return parseFetchedPost(Object.assign({}, fetched, content));
  }

  return cleanPostContent(content);
}