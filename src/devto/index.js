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
 * @name DEV-Post-Utilities
 * @module
 * @namespace post
 * @memberof DEVUtils
 * @description Utility functions for a post
 * 
 * @example <caption>Server side rendering trick</caption>
 * <devto-post>
 *  <template id="devto-post" shadowrootmode="open"></template>
 * </devto-post>
 * 
 * <script type="module">
 * import {post} from 'profile-components/devto-utils';
 * const content = post.generateContent({id: '12345'}, true);
 * const html = post.html(content);
 * document.querySelector('#devto-post').innerHTML = `<style>${post.style}</style>${html}`;
 * </script>
 */
const post = {
  generateContent: generatePostContent,
  html: postHTML,
  styles,
};

/**
 * @name DEV-User-Utilities
 * @module
 * @namespace user
 * @memberof DEVUtils
 * @description Utility functions for a user
 * 
 * @example <caption>Server side rendering trick</caption>
 * <devto-user>
 *  <template id="devto-user" shadowrootmode="open"></template>
 * </devto-user>
 * 
 * <script type="module">
 * import {user} from 'profile-components/devto-utils';
 * const content = user.generateContent({username: 'scottnath'}, true);
 * const html = user.html(content);
 * document.querySelector('#devto-user').innerHTML = `<style>${user.style}</style>${html}`;
 * </script>
 */
const user = {
  generateContent: generateUserContent,
  html: userHTML,
  styles,
};

export default {
  post,
  user,
}