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
 * Content needed to render a GitHub repository. This is a subset of the `repos` endpoint response
 * @typedef {Object} GitHubRepositoryHTML
 * 
 * @attribute {string} full_name - repository org and name, as in `scottnath/profile-components`
 * @attribute {string} [name] - repo name
 * @attribute {string} [org] - repo owner organization's login, found at `<REST_RESPONSE>.organization.login`
 * @attribute {string} [description] - repo description
 * @attribute {string} [language] - programming language used in repo
 * @attribute {string} [stargazers_count] - number of stars
 * @attribute {string} [forks_count] - number of forks
 * @attribute {string} [subscribers_count] - number of watchers
 */

/**
 * GitHub repository web component
 * @typedef {GitHubRepositoryHTML} GitHubRepositoryCE
 * @attribute {boolean} [fetch] - when true, fetches repo from GitHub api
 * @attribute {string} [itemprop] - Itemprop content to go with a containing component's itemscope
 * @attribute {string} [no_org] - Do not include the repo owner or organization
 */

/**
 * @summary Native web component which shows a GitHub repository's content. Can use local data, 
 *  fetch data from the GitHub rest API, or use a combination of both.
 * @description GitHub repository web component
 * @element github-repository
 * @name GitHubRepository
 * @param {GitHubRepositoryCE}
 * @see https://docs.github.com/en/rest/repos/repos#get-a-repository
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
