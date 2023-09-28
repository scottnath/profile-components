import { generateRepoContent } from './content.js';
import repositoryHTML from './html.js';
import stylesPrimer from '../styles/vars-primer.css?inline';
import stylesGlobal from '../styles/vars-global.css?inline';
import styles from '../styles/repository.css?inline';

/**
 * Styles for the component, imported during development, inlined during build
 */
const componentStyles = `
${stylesPrimer}
${stylesGlobal}
${styles}
`;

/**
 * GitHub repository web component
 * @summary Native web component which shows a GitHub repository's content. Can use local data, 
 *  fetch data from the GitHub rest API, or use a combination of both.
 * @element github-repository
 * @name GitHubRepository
 * @see https://docs.github.com/en/rest/repos/repos#get-a-repository
 * 
 * @property {string} full_name - repository org and name, as in `scottnath/profile-components`
 * @property {string} [name] - repo name
 * @property {string} [org] - repo owner organization's login, found at `<REST_RESPONSE>.organization.login`
 * @property {string} [description] - repo description
 * @property {string} [language] - programming language used in repo
 * @property {string} [stargazers_count] - number of stars
 * @property {string} [forks_count] - number of forks
 * @property {string} [subscribers_count] - number of watchers
 * @property {boolean} [fetch] - when true, fetches repo from GitHub api
 * @property {string} [itemprop] - Itemprop content to go with a containing component's itemscope
 * @property {string} [no_org] - Do not include the repo owner or organization
 * 
 * @example
 * <github-repository full_name="scottnath/profile-components" fetch="true"></github-repository>
 */
export class GitHubRepository extends HTMLElement {
  /**
   * @ignore
   */
  constructor() {
    super();
    this.attrs = {};
    this.repo = {};
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
    this.repo = await generateRepoContent(this.attrs, this.attrs.fetch, this.attrs.no_org);
    view += repositoryHTML(this.repo);
    this.shadowRoot.innerHTML = view;
    if (this.attrs.itemprop) {
      this.setAttribute('itemprop', this.attrs.itemprop);
    }
  }
}

customElements.define('github-repository', GitHubRepository);