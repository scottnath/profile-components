/**
 * @name GitHub-Utilities
 * @kind module
 * @typicalname githubUtils
 * @namespace GitHubUtils
 * @description Utility functions for fetching and parsing GitHub api data, getting
 *  styles and generating HTML for GitHub profile UIs
 * @author @scottnath
 */

import {styles, repository} from './styles/index.js';
import {generateUserContent} from './user/content.js';
import userHTML from './user/html.js';
import {generateRepoContent} from './repository/content.js';
import repoHTML from './repository/html.js';

/**
 * @name GitHub-Repository-Declarative-Shadow-DOM
 * @param {GitHubRepositoryHTML} content - a content object representing a GitHub repository
 * @param {boolean} fetch 
 * @returns {string} GitHub HTML wrapped in a `template`
 */
const dsdRepo = async (content, fetch = false) => {
  const generated = await generateRepoContent(content, fetch);
  let genHTML = '<template shadowrootmode="open"><style>' + repository + '</style>';
  genHTML += repoHTML(generated);
  genHTML += '</template>';
  return genHTML;
}

/**
 * @name GitHub-Repository-Utilities
 * @module
 * @namespace repo
 * @memberof GitHubUtils
 * @description Utility functions for a repository
 * 
 * @example <caption>Server side rendering a Repository with Declarative Shadow Dom</caption>
 * <github-repository id="github-repo-1"></github-repository>
 * 
 * <script type="module">
 * import {repo} from 'profile-components/github-utils';
 * const dsdHTML = repo.dsd({full_name: 'scottnath/profile-components'}, true);
 * document.querySelector('#github-repo-1').innerHTML = dsdHTML;
 * </script>
 */
const repo = {
  generateContent: generateRepoContent,
  html: repoHTML,
  styles: repository,
  dsd: dsdRepo
};

/**
 * @name GitHub-Declarative-Shadow-DOM
 * @param {GitHubUserHTML} content - a content object representing a GitHub user
 * @param {boolean} fetch 
 * @returns {string} GitHub HTML wrapped in a `template`
 */
const dsd = async (content, fetch = false) => {
  const generated = await generateUserContent(content, fetch);
  let genHTML = '<template shadowrootmode="open"><style>' + styles + '</style>';
  genHTML += userHTML(generated);
  genHTML += '</template>';
  return genHTML;
}

/**
 * @name GitHub-User-Utilities
 * @module
 * @namespace user
 * @memberof GitHubUtils
 * @description Utility functions for a user
 * 
 * @example <caption>Server side rendering with Declarative Shadow Dom</caption>
 * <github-user></github-user>
 * 
 * <script type="module">
 * import {dsd} from 'profile-components/github-utils';
 * const dsdHTML = dsd({login: 'scottnath'}, true);
 * document.querySelector('github-user').innerHTML = dsdHTML;
 * </script>
 */
const user = {
  generateContent: generateUserContent,
  html: userHTML,
  styles,
  dsd
};

export {
  repo,
  user,
  dsd
}