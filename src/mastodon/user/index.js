import { generateUserContent } from './content.js';
import html from './html.js';
// import { styles } from '../styles/index.js';

/**
 * Mastodon user profile web component
 * @summary Native web component which shows a Mastodon user's profile content. Can use local data, 
 *  fetch data from the Mastodon API, or use a combination of both.
 * @element mastodon-user
 * @name MastodonUser
 * @module
 * 
 * @property {string} id - User's Mastodon ID
 * @property {string} username - User's Mastodon username
 * @property {string} acct - User's Mastodon account
 * @property {string} url - User's Mastodon URL
 * @property {string} display_name - User's display name on Mastodon
 * @property {string} note - User's bio on Mastodon
 * @property {string} avatar - URL to user's avatar
 * @property {string} avatar_static - URL to user's static avatar
 * @property {string} header - URL to user's header image
 * @property {string} header_static - URL to user's static header image
 * @property {boolean} bot - Indicates if the user is a bot
 * @property {boolean} group - Indicates if the user is a group
 * @property {string} created_at - Date the user joined Mastodon
 * @property {string} last_status_at - Date of the user's last status
 * @property {number} statuses_count - Number of statuses posted by the user
 * @property {number} followers_count - Number of followers
 * @property {number} following_count - Number of users the user is following
 * @property {string} theme - Color theme for the component
 * 
 * @example
 * <!-- import the web component -->
 * <script type="module" src="https://unpkg.com/profile-components/dist/mastodon-user.js"></script>
 * 
 * <!-- use the custom element -->
 * <mastodon-user username="mastodonUsername" fetch="true"></mastodon-user>
 */
export class MastodonUser extends HTMLElement {
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
    // let view = `<style>${styles}</style>`;
    let view = '';
    this.user = await generateUserContent(this.attrs, this.attrs.fetch);
    view += html(this.user);
    this.shadowRoot.innerHTML = view;
    if (this.attrs.theme) {
      this.setAttribute('data-theme', this.attrs.theme);
    }
  }
}

customElements.define('mastodon-user', MastodonUser);
