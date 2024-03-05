import { generateUserContent } from './content.js';
import html from './html.js';
import { styles } from '../styles/index.js';

/**
 * GitHub user profile web component
 * @summary Native web component which shows a GitHub user's profile content. Can use local data, 
 *  fetch data from the GitHub rest API, or use a combination of both.
 * @element github-user
 * @name GitHubUser
 * @module
 * 
 * @property {string} login - User's GitHub login
 * @property {string} avatar_url - URL to user's avatar
 * @property {string} name - User's name
 * @property {boolean} [fetch] - when true, fetches user from the [GitHub api](https://docs.github.com/en/rest/users/users#get-a-user)
 * @property {string} [username] - alias for `login`
 * @property {string} [bio] - User's biography content
 * @property {string} [following] - number of people user is following
 * @property {string} [followers] - number of followers
 * @property {string} [repos] - JSON stringified array of repositories
 * @property {string} [theme] - color theme for the component
 * 
 * @example
 * <!-- import the web component -->
 * <script type="module" src="https://unpkg.com/profile-components/dist/github-user.js"></script>
 * 
 * <!-- use the custom element -->
 * <github-user login="scottnath" fetch="true"></github-user>
 */
export class GitHubUser extends HTMLElement {
  static #style = null;
  /**
   * @ignore
   */
  constructor() {
    super();
    this.attrs = {};
    this.content = {};
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

  /**
  * @ignore
  */
  #adoptStyles() {
    if (GitHubUser.#style === null) {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(styles);
      GitHubUser.#style = sheet;
    }
    this.shadowRoot.adoptedStyleSheets = [GitHubUser.#style];
  }

  async connectedCallback() {
    this.#adoptStyles();
    let view = ``;
    this.content = await generateUserContent(this.attrs, this.attrs.fetch);
    console.log('connectedCallback', this.content)
    view += html(this.content);
    this.shadowRoot.innerHTML = view;
    if (this.attrs.theme) {
      this.setAttribute('data-theme', this.attrs.theme);
    }
  }
}

customElements.define('github-user', GitHubUser);
