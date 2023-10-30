import { generateTootContent } from './content.js';
import tootHTML from './html.js';
// import { styles } from '../styles/index.js';

/**
 * Mastodon toot web component
 * @summary Native web component which shows a Mastodon toot. Can use local data,
 *  fetch data from the Mastodon API, or use a combination of both.
 * @element mastodon-toot
 * @name MastodonToot
 * @module
 * 
 * @property {number} id - Toot ID
 * @property {string} content - Toot content
 * @property {string} url - Toot URL
 * @property {number} favourites_count - Number of favourites for the toot
 * @property {number} replies_count - Number of replies to the toot
 * @property {number} reblogs_count - Number of reblogs of the toot
 * @property {string} created_at - Creation date of the toot
 * @property {boolean} [fetch] - when true, fetches toot from the Mastodon API
 * 
 * @example
 * <!-- import the web component -->
 * <script type="module" src="https://unpkg.com/profile-components/dist/mastodon-toot.js"></script>
 * 
 * <!-- use the custom element -->
 * <mastodon-toot id="123456" fetch="true"></mastodon-toot>
 */
export class MastodonToot extends HTMLElement {
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
    this.toot = await generateTootContent(this.attrs, this.attrs.fetch);
    console.log(this.attrs);
    view += tootHTML(this.toot);
    this.shadowRoot.innerHTML = view;
    if (this.attrs.itemprop) {
      this.setAttribute('itemprop', this.attrs.itemprop);
    }
  }
}

customElements.define('mastodon-toot', MastodonToot);
