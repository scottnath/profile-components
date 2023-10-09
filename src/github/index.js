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
 * @name GitHub-Repository-Utilities
 * @module
 * @namespace repo
 * @memberof GitHubUtils
 * @description Utility functions for a repository
 * 
 * @example
 * import {repo} from 'profile-components/github-utils';
 * const content = repo.content({full_name: 'scottnath/profile-components'}, true);
 * const html = repo.html(content);
 */
const repo = {
  generateContent: generateRepoContent,
  html: repoHTML,
  styles: repository,
};

/**
 * @name GitHub-User-Utilities
 * @module
 * @namespace user
 * @memberof GitHubUtils
 * @description Utility functions for a user
 * 
 * @example
 * import {user} from 'profile-components/github-utils';
 * const content = user.content({login: 'scottnath'}, true);
 * const html = user.html(content);
 */
const user = {
  generateContent: generateUserContent,
  html: userHTML,
  styles,
};

export default {
  repo,
  user
}