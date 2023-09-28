import { generateUserContent } from './content.js';
import userHTML from './html.js';
import stylesPrimer from '../styles/vars-primer.css?inline';
import stylesGlobal from '../styles/vars-global.css?inline';
import stylesRepo from '../styles/repository.css?inline';
import styles from '../styles/user.css?inline';

/**
 * Styles for the component, imported during development, inlined during build
 */
const componentStyles = `
${stylesPrimer}
${stylesGlobal}
${stylesRepo}
${styles}
`;

/**
 * GitHub user profile web component
 * @summary Native web component which shows a GitHub user's profile content. Can use local data, 
 *  fetch data from the GitHub rest API, or use a combination of both.
 * @see https://docs.github.com/en/rest/repos/repos#get-a-repository
 * @element github-user
 * @name GitHubUser
 * 
 * @property {string} login - User's GitHub login
 * @property {string} avatar_url - URL to user's avatar
 * @property {string} name - User's name
 * @property {boolean} [fetch] - when true, fetches user from GitHub api
 * @property {string} [username] - alias for `login`
 * @property {string} [bio] - User's biography content
 * @property {string} [following] - number of people user is following
 * @property {string} [followers] - number of followers
 * @property {string} [repos] - JSON stringified array of repositories
 * 
 * @example
 * <github-user login="scottnath" fetch="true"></github-user>
 */
export class GitHubUser extends HTMLElement {
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

  async connectedCallback() {
    let view = `<style>${componentStyles}</style>`;
    this.content = await generateUserContent(this.attrs, this.attrs.fetch);
    view += userHTML(this.content);
    this.shadowRoot.innerHTML = view;
  }
}

customElements.define('github-user', GitHubUser);