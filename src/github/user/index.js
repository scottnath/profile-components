import { intToString } from '../../utils/index.js';
import { fetchUser, parseFetchedUser } from './content.js';
import userHTML from './html.js';
import { generateRepoContent } from '../repository/content.js';
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
 * @property {string} login - User's GitHub login
 * @property {string} avatar_url - URL to user's avatar
 * @property {string} name - User's name
 * @property {boolean} [fetch] - when true, fetches user from GitHub api
 * @property {string} [username] - alias for `login`
 * @property {string} [bio] - User's biography content
 * @property {string} [following] - number of people user is following
 * @property {string} [followers] - number of followers
 * @property {string} [repos] - JSON stringified array of repositories
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
        if (repo.split('/')[1]) {
          return {
            full_name: repo,
            fetch: true,
          };
        }
        return {
          full_name: `${this.login}/${repo}`,
          fetch: true,
          no_org: true,
        };
      }
      repo.itemprop = repo.itemprop || 'maintainer';
      return repo;
      // return Object.entries(repo)
      //   .map(([key, value]) => `${key}="${value}"`)
      //   .join(' ');
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
    this.repositories = this.repos ? this._parseReposAttribute(this.repos) : [];
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
    if (this.repositories?.length) {
      this.repositories = await Promise.all(this.repositories.map(async (repo) => await generateRepoContent(repo, repo.fetch, repo.no_org)));
      
    }
    view += userHTML(this);
    this.shadowRoot.innerHTML = view;
  }
}

customElements.define('github-user', GitHubUser);