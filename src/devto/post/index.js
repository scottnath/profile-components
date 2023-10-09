import { generatePostContent } from './content.js';
import postHTML from './html.js';
import { styles } from '../styles/index.js';

/**
 * dev.to post web component
 * @summary Native web component which shows a dev.to (or forem.dev) post. Can use local data,
 *  fetch data from the dev.to API, or use a combination of both.
 * @element devto-post
 * @name DevtoPost
 * @module
 * 
 * @property {number} id - Post ID
 * @property {string} title - Post title
 * @property {string} url - Post URL
 * @property {string} cover_image - Post cover image URL
 * @property {string} social_image - Post social image URL
 * @property {boolean} [fetch] - when true, fetches post from api
 * 
 * @example
 * <!-- import the web component -->
 * <script type="module" src="https://unpkg.com/profile-components/dist/devto-post.js"></script>
 * 
 * <!-- use the custom element -->
 * <devto-post id="123456" fetch="true"></devto-post>
 */
export class DevtoPost extends HTMLElement {
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
    this.post = await generatePostContent(this.attrs, this.attrs.fetch);
    view += postHTML(this.post);
    this.shadowRoot.innerHTML = view;
    if (this.attrs.itemprop) {
      this.setAttribute('itemprop', this.attrs.itemprop);
    }
  }
}
customElements.define('devto-post', DevtoPost);