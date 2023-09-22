import { intToString } from '../utils/index.js';
import { fetchRepo, parseFetchedRepo } from './utils/github';
import stylesPrimer from './styles/vars-primer.css?inline';
import stylesGlobal from './styles/vars-global.css?inline';
import styles from './styles/repository.css?inline';

/**
 * Styles for the component, imported during development, inlined during build
 */
const componentStyles = `
${stylesPrimer}
${stylesGlobal}
${styles}
`;

/**
 * GitHub repository UI component
 *  When `fetch` is true, fetches repo from GitHub api, but content from the 
 *  api _will be superseded_ by any attributes set on the element
 * @see https://docs.github.com/en/rest/repos/repos#get-a-repository
 * @element github-repository
 * @name GitHubRepository
 * 
 * @attribute {string} full_name - repository org and name, as in `scottnath/profile-components`
 * @attribute {boolean} [fetch] - when true, fetches repo from GitHub api
 * @attribute {string} [name] - repo name
 * @attribute {string} [org] - repo owner organization's login, found at `<REST_RESPONSE>.organization.login`
 * @attribute {string} [description] - repo description
 * @attribute {string} [language] - programming language used in repo
 * @attribute {string} [stargazers_count] - number of stars
 * @attribute {string} [forks_count] - number of forks
 * @attribute {string} [subscribers_count] - number of watchers
 * @attribute {string} [itemprop] - Itemprop content to go with a containing 
 *  component's itemscope
 * @attribute {string} [user_login] - User or organization login for use by 
 *  containing component
 */
export class GitHubRepository extends HTMLElement {
  constructor() {
    super();
    this.error = null;
    this.attachShadow({ mode: "open" });
    this._getAttributes();
  }

  /**
   * Generate variables at `this.[attribute-name]` for each attribute on the element
   */
  _getAttributes() {
    for (let name of this.getAttributeNames()) {
      if (this.getAttribute(name)) {
        this[name] = this.getAttribute(name);
      }
    }
  }

  /**
   * Check that required attributes are present, adjusts content as needed
   */
  _checkAttributes() {
    if (!this.full_name || !this.full_name.split('/')[1]) {
      this.error = 'Missing repo attribute: `full_name`';
      return;
    }
    if (!this.name) {
      this.name = this.full_name.split('/')[1];
    }
    if (!this.org) {
      this.org = this.full_name.split('/')[0];
    }
    if (this.org && this.user_login) {
      delete this.org;
    }
  }

  /**
   * Fetch repo data from GitHub API and parse out 
   *  the content needed for this component. Either adds an error
   *  or adds the parsed content to the element's attributes
   */
  async _parseFetch() {
    const repo = await fetchRepo(this.full_name);
    if (repo.message && repo.message === 'Not Found') {
      this.error = `Repo "${this.full_name}" not found`;
      return;
    }
    const parsedRepo = parseFetchedRepo(repo);
    Object.entries(parsedRepo).forEach(([key, value]) => {
      this[key] = this[key] || value;
    });
  }

  async connectedCallback() {
    let view = `<style>${componentStyles}</style>`;
    if (this.fetch) {
      await this._parseFetch();
    }
    this._checkAttributes();
    view += this._render();
    this.shadowRoot.innerHTML = view;
  }
  
  _render() {
    if (this.error) {
      return `
        <div aria-label="GitHub repository" itemscope itemtype="http://schema.org/Action">
          <p itemprop="error">${this.error}</p>
        </div>
      `
    }

    return `
      <div aria-label="GitHub repository" itemscope itemtype="http://schema.org/SoftwareSourceCode" ${this.itemprop ? `itemprop=${this.itemprop}` : ''}>
        <a href="https://github.com/${this.full_name}" itemprop="codeRepository">
          ${this.org ? `
            <span itemprop="maintainer">${this.org} /</span>
          ` : ''}
          <span itemprop="name">${this.name}</span>
        </a>
        ${this.description ? `
          <p itemprop="about">${this.description}</p>
        ` : ''}
        <dl aria-label="Repository details">
          ${this.language ? `
            <dt data-detail="language" data-language="${this.language}"><span class="sr-only">Language</span></dt>
            <dd itemprop="programmingLanguage">${this.language}</dd>
          ` : ''}
          ${this.stargazers_count ? `
            <dt data-detail="stars"><span class="sr-only">Stars</span></dt>
            <dd><span aria-hidden="true">${intToString(this.stargazers_count)}</span><span class="sr-only">${this.stargazers_count}</span></dd>
          ` : ''}
          ${this.subscribers_count ? `
            <dt data-detail="watchers"><span class="sr-only">Watchers</span></dt>
            <dd><span aria-hidden="true">${intToString(this.subscribers_count)}</span><span class="sr-only">${this.subscribers_count}</span></dd>
          ` : ''}
          ${this.forks_count ? `
            <dt data-detail="forks"><span class="sr-only">Forks</span></dt>
            <dd><span aria-hidden="true">${intToString(this.forks_count)}</span><span class="sr-only">${this.forks_count}</span></dd>
          ` : ''}
        </dl>
      </div>
    `;
  }
}

customElements.define('github-repository', GitHubRepository);
