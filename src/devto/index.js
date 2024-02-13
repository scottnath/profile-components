/**
 * @name DEV-Utilities
 * @kind module
 * @typicalname devUtils
 * @namespace DEVUtils
 * @description Utility functions for fetching and parsing dev.to api data, getting
 *  styles and generating HTML for dev.to profile UIs
 * @author @scottnath
 */
import {styles} from './styles/index.js';
import {generateUserContent} from './user/content.js';
import userHTML from './user/html.js';
import {generatePostContent} from './post/content.js';
import postHTML from './post/html.js';

/**
 * @name DEV-Post-Declarative-Shadow-DOM
 * @param {ForemPostHTML} content - Content about one post by dev.to (or Forem) user
 * @param {boolean} fetch 
 * @returns {string} DEV post HTML wrapped in a `template`
 */
const dsdPost = async (content, fetch = false) => {
  const generated = await generatePostContent(content, fetch);
  let genHTML = '<template shadowrootmode="open"><style>' + styles + '</style>';
  genHTML += postHTML(generated);
  genHTML += '</template>';
  return genHTML;
}

/**
 * @name DEV-Post-Utilities
 * @module
 * @namespace post
 * @memberof DEVUtils
 * @description Utility functions for a post
 * 
 * @example <caption>Server side rendering a post with Declarative Shadow Dom</caption>
 * <devto-post></devto-post>
 * 
 * <script type="module">
 * import {post} from 'profile-components/devto-utils';
 * const dsdHTML = post.dsd({id: '12345'}, true);
 * document.querySelector('devto-post').innerHTML = dsdHTML;
 * </script>
 */
const post = {
  generateContent: generatePostContent,
  html: postHTML,
  styles,
  dsd: dsdPost
};

/**
 * @name DEV-Declarative-Shadow-DOM
 * @param {ForemUserHTML} content - a content object representing a DEV user
 * @param {boolean} fetch 
 * @returns {string} DEV HTML wrapped in a `template`
 */
const dsd = async (content, fetch = false) => {
  const generated = await generateUserContent(content, fetch);
  let genHTML = '<template shadowrootmode="open"><style>' + styles + '</style>';
  genHTML += userHTML(generated);
  genHTML += '</template>';
  return genHTML;
}

/**
 * @name DEV-User-Utilities
 * @module
 * @namespace user
 * @memberof DEVUtils
 * @description Utility functions for a user
 * 
 * @example <caption>Server side rendering with Declarative Shadow Dom</caption>
 * <devto-user></devto-user>
 * 
 * <script type="module">
 * import {dsd} from 'profile-components/devto-utils';
 * const dsdHTML = dsd({username: 'scottnath'}, true);
 * document.querySelector('devto-user').innerHTML = dsdHTML;
 * </script>
 */
const user = {
  generateContent: generateUserContent,
  html: userHTML,
  styles,
  dsd
};

export {
  post,
  user,
  dsd,
}