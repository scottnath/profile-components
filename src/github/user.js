
import { intToString, fetchUser, parseFetchedUser } from './utils/github';
import stylesPrimer from './styles/vars-primer.css?inline';
import stylesGlobal from './styles/vars-global.css?inline';
import styles from './styles/user.css?inline';

import './repository';

/**
 * Styles for the component, imported during development, inlined during build
 */
const componentStyles = `
${stylesPrimer}
${stylesGlobal}
${styles}
`;

/**
 * Blank base64-encoded png
 * @see https://png-pixel.com/
 */
const blankPng = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8/x8AAuMB8DtXNJsAAAAASUVORK5CYII=';

/**
 * GitHub repository UI component
 *  All props are attributes and should be the same content as the GitHub API
 *  endpoint for getting a repository
 * @see https://docs.github.com/en/rest/repos/repos#get-a-repository
 * @element github-user
 * @name GitHubUser
 * 
 * @attribute {string} login - User's GitHub login
 * @attribute {string} avatar_url - URL to user's avatar
 * @attribute {string} name - User's name
 * @attribute {boolean} [fetch] - when true, fetches user from GitHub api
 * @attribute {string} [username] - alias for `login`
 * @attribute {string} [bio] - User's biography content
 * @attribute {string} [following] - number of people user is following
 * @attribute {string} [followers] - number of followers
 * @attribute {string} [repos] - JSON stringified array of repositories
 */
export class GitHubUser extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._getAttributes();
  }

  /**
   * Parses a string, which should be a JSON stringified array of GitHubRepository 
   *  objects or strings. If a string, it should be the `full_name` of the repository
   *  and `fetch=true` will be an attribute on the repository component
   * @param {string} reposAttr - String of GitHubRepository data
   * @returns array of strings of attributes for each repository
   */
  _parseReposAttribute(reposAttr) {
    let repos = [];
    try {
      repos = JSON.parse(reposAttr);
    } catch (error) {
      console.error(error);
      return [];
    }
    return repos.map((repo) => {
      if (typeof repo === 'string') {
        return repo.split('/')[1] ? `full_name="${repo}" fetch="true"` : `full_name="${this.login}/${repo}" fetch="true"`;
      }
      repo.itemprop = repo.itemprop || 'maintainer';
      return Object.entries(repo)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');
    });
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
    this.repositories = this.repos ? this._parseReposAttribute(this.repos) : [];
  }

  /**
   * Check that required attributes are present, adjusts content as needed
   */
  _checkAttributes() {
    if (this.username && !this.login) {
      this.login = this.username;
    }
    if (!this.login) {
      this.error = 'Missing required attribute: `login` || `username`';
      return;
    }
    if (!this.avatar_url) {
      this.avatar_url = blankPng;
    }
    if (this.followers) {
      this.followers = intToString(this.followers);
    }
    if (this.following) {
      this.following = intToString(this.following);
    }
  }

  /**
   * Fetch user data from GitHub API and parse out 
   *  the content needed for this component. Either adds an error
   *  or adds the parsed content to the element's attributes
   */
  async _parseFetch() {
    const user = await fetchUser(this.username || this.login);
    if (user.message && user.message === 'Not Found') {
      this.error = `User "${this.username || this.login}" not found`;
      return;
    }
    const parsedUser = parseFetchedUser(user);
    Object.entries(parsedUser).forEach(([key, value]) => {
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
        <section aria-label="GitHub user profile" itemscope itemtype="http://schema.org/Action">
          <p itemprop="error">${this.error}</p>
        </section>
      `
    }
    
    return `
      <section aria-label="GitHub user profile" itemscope itemtype="http://schema.org/Person">
        <header>
          <span><span itemprop="memberOf">GitHub</span> user</span> 
          <span itemprop="alternativeName">${this.login}</span>
        </header>
        <div part="main">
          <address>
            <a href="https://github.com/${this.login}" aria-label="View @${this.login}'s profile on GitHub" itemprop="url">
              <span class="avatar" itemprop="image">
                <img src="${this.avatar_url}" alt="Avatar for ${this.name | this.login}" loading="lazy" />
              </span>
              <span itemprop="creator">
                <span itemprop="name">${this.name}</span>
                <span itemprop="alternativeName">${this.login}</span>
              </span>
            </a>
          </address>
          ${this.bio ? `<p itemprop="description">${this.bio}</p>` : ''}
          ${this.following || this.followers ? `
            <dl>
            ${this.followers ? `
              <span><dt>followers</dt>
              <dd itemprop="followee">${this.followers}</dd></span>
            ` : ''}
            ${this.following ? `
              <span><dt>following</dt>
              <dd itemprop="follows">${this.following}</dd></span>
            ` : ''}
            </dl>
          ` : ''}
          ${Array.isArray(this.repositories) && this.repositories?.length ? `
            <dl>
              <dt>Pinned repositories</dt>
              ${this.repositories.map((repo) => `
                <dd><github-repository ${repo}></github-repository></dd>
              `).join('')}
            </dl>
          ` : ''}
        </div>
      </section>
    `;
  }
}

customElements.define('github-user', GitHubUser);