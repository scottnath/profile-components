
const githubApi = 'https://api.github.com';

/**
 * Content needed to render a GitHub repository. This is a subset of the `repos` endpoint response
 * @typedef {Object} GitHubRepositoryHTML
 * 
 * @property {string} full_name - repository org and name, as in `scottnath/profile-components`
 * @property {string} name - repo name
 * @property {string} [org] - repo owner organization's login, found at `<REST_RESPONSE>.organization.login`
 * @property {string} [description] - repo description
 * @property {string} [language] - programming language used in repo
 * @property {string} [stargazers_count] - number of stars
 * @property {string} [forks_count] - number of forks
 * @property {string} [subscribers_count] - number of watchers
 * @property {string} [error] - error message, if any
 */

/**
 * Fetch a GitHub repository's content from the GitHub api
 * @see https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#get-a-repository
 * @param {string} full_name
 * @returns response status 200: {Object} repo; else {Object} error
 * @function
 */
export const fetchRepo = async (full_name) => {
  const response = await fetch(`${githubApi}/repos/${full_name}`);
  const repoJson = await response.json();
  return repoJson;
}

/**
 * Parse a GitHub repository's content. This is a reducer on the endpoint response, 
 *  but generally reduces any object to just the data required for the repo component HTML
 * @param {Object} repo - GitHub repository object
 * @returns {GitHubRepositoryHTML}
 * @function
 */
export const parseFetchedRepo = (repo = {}) => {
  return {
    full_name: repo.full_name,
    name: repo.name,
    org: repo.org || repo.organization?.login || repo.owner?.login,
    description: repo.description,
    language: repo.language,
    stargazers_count: repo.stargazers_count,
    forks_count: repo.forks_count,
    subscribers_count: repo.subscribers_count,
  }
}

/**
 * Parses and cleans repository content to match what is expected by the repository HTML
 * @param {GitHubRepositoryHTML} content - a content object either from component or GitHub API
 * @param {boolean} no_org - if true, remove the `org` attribute from the returned object
 * @returns {GitHubRepositoryHTML} ready for HTML content
 */
export const cleanRepoContent = (content, no_org) => {
  const repo = parseFetchedRepo(content);
  if (!repo.full_name || !repo.full_name.split('/')[1]) {
    repo.error = 'Missing repo attribute: `full_name`';
    return repo;
  }
  if (!repo.name) {
    repo.name = repo.full_name.split('/')[1];
  }
  if (!repo.org) {
    repo.org = repo.full_name.split('/')[0];
  }
  if (no_org) {
    delete repo.org;
  }
  if (repo.stargazers_count === '0') delete repo.stargazers_count;
  if (repo.forks_count === '0') delete repo.forks_count;
  if (repo.subscribers_count === '0') delete repo.subscribers_count;
  const r = {};
  // remove `undefined` values
  for (const key in repo) {
    if (repo[key]) r[key] = repo[key];
  }
  return r;
}

/**
 * Generates an object of content for the repository HTML
 * @param {GitHubRepositoryHTML} content 
 * @param {boolean} fetch 
 * @param {boolean} no_org 
 * @returns {GitHubRepositoryHTML} content ready for HTML, possibly includes fetched content
 */
export const generateRepoContent = async (content, fetch = false, no_org = false) => {
  const repoFromContent = cleanRepoContent(content, no_org);
  if (repoFromContent.error) return repoFromContent;
  let fetched = {};
  if (fetch) {
    fetched = await fetchRepo(repoFromContent.full_name);
    if (fetched.message && fetched.message === 'Not Found') {
      return { error: `Fetch Error: Repo "${repoFromContent.full_name}" not found`};
    }
    fetched = cleanRepoContent(fetched, no_org);
  }
  return Object.assign({}, fetched, repoFromContent);
}