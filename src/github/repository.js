import { intToString, fetchRepo, parseFetchedRepo } from './utils/github';
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
 * Primer Octicons used by this component
 * @see https://primer.style/octicons/
 */
const repoIcon = `<svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path></svg>`;
const forksIcon = `<svg height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="currentColor" aria-hidden="true">
<path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
</svg>`;
const starIcon = `<svg height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="currentColor" aria-hidden="true">
<path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
</svg>`;
const watchIcon = `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 2c1.981 0 3.671.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.62 1.62 0 0 1 0 1.798c-.45.678-1.367 1.932-2.637 3.023C11.67 13.008 9.981 14 8 14c-1.981 0-3.671-.992-4.933-2.078C1.797 10.83.88 9.576.43 8.898a1.62 1.62 0 0 1 0-1.798c.45-.677 1.367-1.931 2.637-3.022C4.33 2.992 6.019 2 8 2ZM1.679 7.932a.12.12 0 0 0 0 .136c.411.622 1.241 1.75 2.366 2.717C5.176 11.758 6.527 12.5 8 12.5c1.473 0 2.825-.742 3.955-1.715 1.124-.967 1.954-2.096 2.366-2.717a.12.12 0 0 0 0-.136c-.412-.621-1.242-1.75-2.366-2.717C10.824 4.242 9.473 3.5 8 3.5c-1.473 0-2.825.742-3.955 1.715-1.124.967-1.954 2.096-2.366 2.717ZM8 10a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 10Z"></path></svg>`;

/**
 * Generates a circle svg with a fill color based on the repository language
 * @param {string} language 
 * @returns hex code color from colors.json
 * @todo parse actual colors.json
 */
const getCircle = (language) => {
  let fill = '#f1e05a';
  switch (language) {
    case "TypeScript":
      fill = '#3178c6'
    case "Shell":
      fill = '#89e051'
    case "JavaScript":
      fill = '#f1e05a'
    case "HTML":
      fill = '#e34c26'
    case "CSS":
      fill = '#563d7c'
    case "Java":
      fill = '#b07219'
    default:
      fill = '#f1e05a'
  }

    return `<svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fill="${fill}" /></svg>`
}

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
          ${repoIcon}
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
            <dt>${getCircle(this.language)} <span class="sr-only">Language</span></dt>
            <dd itemprop="programmingLanguage">${this.language}</dd>
          ` : ''}
          ${this.stargazers_count ? `
            <dt>${starIcon} <span class="sr-only">Stars</span></dt>
            <dd><span aria-hidden="true">${intToString(this.stargazers_count)}</span><span class="sr-only">${this.stargazers_count}</span></dd>
          ` : ''}
          ${this.subscribers_count ? `
            <dt>${watchIcon} <span class="sr-only">Watchers</span></dt>
            <dd><span aria-hidden="true">${intToString(this.subscribers_count)}</span><span class="sr-only">${this.subscribers_count}</span></dd>
          ` : ''}
          ${this.forks_count ? `
            <dt>${forksIcon} <span class="sr-only">Forks</span></dt>
            <dd><span aria-hidden="true">${intToString(this.forks_count)}</span><span class="sr-only">${this.forks_count}</span></dd>
          ` : ''}
        </dl>
      </div>
    `;
  }
}

customElements.define('github-repository', GitHubRepository);
