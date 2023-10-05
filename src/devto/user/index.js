
import { generateUserContent } from './content.js';
import userHTML from './html.js';
import { styles } from '../styles/index.js';

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
  }
  
}
customElements.define('devto-user', DevtoUser);