
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
 * Primer Octicons used by this component
 * @see https://primer.style/octicons/
 */
export const githubLogoSvg = `<svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32">
<path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
</svg>`;
export const octiconPeople = `<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16">
<path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2 5.5ZM11 4a3.001 3.001 0 0 1 2.22 5.018 5.01 5.01 0 0 1 2.56 3.012.749.749 0 0 1-.885.954.752.752 0 0 1-.549-.514 3.507 3.507 0 0 0-2.522-2.372.75.75 0 0 1-.574-.73v-.352a.75.75 0 0 1 .416-.672A1.5 1.5 0 0 0 11 5.5.75.75 0 0 1 11 4Zm-5.5-.5a2 2 0 1 0-.001 3.999A2 2 0 0 0 5.5 3.5Z"></path>
</svg>`;

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
        <section role="complementary" itemscope itemtype="http://schema.org/Action">
          <p itemprop="error">${this.error}</p>
        </section>
      `
    }
    
    return `
      <section role="complementary" itemscope itemtype="http://schema.org/Person">
        <header>
          <address>
            <a href="https://github.com/${this.login}" itemprop="url">
              <span>
                ${githubLogoSvg}
              </span>
              <span itemprop="alternativeName">${this.login}</span>
            </a>
          </address>
        </header>
        <div part="main">
          <address>
            <a href="https://github.com/${this.login}" itemprop="url">
              <span class="avatar" itemprop="image">
                <img src="${this.avatar_url}" alt="Avatar for ${this.name}" loading="lazy" />
              </span>
              <span itemprop="creator">
                <span itemprop="name">${this.name}</span>
                <span itemprop="alternativeName">${this.login}</span>
              </span>
            </a>
          </address>
          ${this.bio ? `<p itemprop="description">${this.bio}</p>` : ''}
          ${this.followers || this.following ? `
            <dl>
              ${this.following ? `
                <dt>Following</dt>
                <dd itemprop="follows">${this.following}</dd>
              ` : ''}
              ${this.followers ? `
                <dt>Followers</dt>
                <dd itemprop="followee">${this.followers}</dd>
              ` : ''}
              <dd aria-hidden="true">${octiconPeople}</dd>
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