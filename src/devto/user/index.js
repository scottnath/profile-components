
import { generateUserContent } from './content.js';
import userHTML from './html.js';
import { styles } from '../styles/index.js';

/**
 * dev.to user profile web component
 * @summary Native web component which shows a dev.to user's profile content. 
 *  Can use local data, or fetch data from the dev.to API, or use a combination of both.
 * @element devto-user
 * @name DevtoUser
 * @module
 * 
 * @property {string} username - User's dev.to username
 * @property {boolean} [fetch] - when true, fetches user and posts from the [Forem API](https://developers.forem.com/api/v0#tag/users/operation/getUser)
 * @property {string} [name] - The name of the user
 * @property {string} [summary] - The user's bio
 * @property {string} [joined_at] - The date the user joined
 * @property {string} [profile_image] - The URL of the user's profile image
 * @property {number} [post_count] - The number of posts the user has published
 * @property {string} [latest_post] - User's latest post content, JSON stringified 
 * @property {string} [popular_post] - User's most popular post content, JSON stringified 
 * @property {string} [theme] - color theme for the component
 * 
 * @example
 * <!-- import the web component -->
 * <script type="module" src="https://unpkg.com/profile-components/dist/devto-user.js"></script>
 * 
 * <!-- use the custom element -->
 * <devto-user username="scottnath" fetch="true"></devto-user>
 */
export class DevtoUser extends HTMLElement {
  /**
   * @ignore
   */
  constructor() {
    super();
    this.attrs = {};
    this.attachShadow({ mode: "open" });
    this._getAttributes();
  }

  /**
   * Generate variables at `this.[attribute-name]` for each attribute on the element
   * @ignore
   */
  _getAttributes() {
    for (let name of this.getAttributeNames()) {
      if (this.getAttribute(name)) {
        this.attrs[name] = this.getAttribute(name);
      }
    }
  }

  async connectedCallback() {
    let view = `<style>${styles}</style>`;
    this.user = await generateUserContent(this.attrs, this.attrs.fetch);
    view += userHTML(this.user);
    this.shadowRoot.innerHTML = view;
    if (this.attrs.theme) {
      this.setAttribute('data-theme', this.attrs.theme);
    }
  }
  
}
customElements.define('devto-user', DevtoUser);