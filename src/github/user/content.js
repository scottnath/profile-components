import { generateRepoContent } from '../repository/content.js';

/** @ignore */
const githubApi = 'https://api.github.com';

/**
 * Blank base64-encoded png
 * @ignore
 * @see https://png-pixel.com/
 */
const blankPng = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8/x8AAuMB8DtXNJsAAAAASUVORK5CYII=';

/**
 * Content needed to render a GitHub user. This is a subset of the `users` endpoint response
 * @see https://docs.github.com/en/rest/users/users#get-a-user
 * @memberof GitHubUtils.user
 * @typedef {Object} GitHubUserHTML
 * 
 * @property {string} login - User's GitHub login
 * @property {string} name - User's name
 * @property {string} [username] - alias for `login`
 * @property {string} [avatar_url] - URL to user's avatar
 * @property {string} [bio] - User's biography content
 * @property {string} [following] - number of people user is following
 * @property {string} [followers] - number of followers
 * @property {string} [error] - error message, if any
 * @property {Array<GitHubRepositoryHTML>} [repositories] - array of repositories
 */

/**
 * Fetch a user from
 * @see https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-a-user
 * @param {string} username 
 * @returns response status 200: {Object} user; else {Object} error
 * @function
 * @ignore
 */
export const fetchUser = async (username) => {
  const options = {
    cache: 'no-cache',
  };
  const response = await fetch(`${githubApi}/users/${username}`, options);
  const userJson = await response.json();
  return userJson;
}

/**
 * Parse a GitHub user from the `user` endpoint response down to 
 *  only the data required for the user component
 * @param {Object} user
 * @returns {GitHubUserHTML} component-ready user object
 * @function
 * @ignore
 */
export const parseFetchedUser = (user = {}) => {
  return {
    login: user.login,
    name: user.name,
    username: user.login,
    avatar_url: user.avatar_url,
    bio: user.bio,
    following: user.following,
    followers: user.followers,
  }
}

/**
 * Parses a string, which should be a JSON stringified array of GitHubRepository 
 *  objects or JSON stringified array of strings. If an array of string, 
 *  each string should be the `full_name` of a repository.
 * @param {string} reposStr - String of GitHubRepository data
 * @param {string} [owner] - GitHub user login, repository strings are not `full_name`s
 * @returns array of strings of attributes for each repository
 * @function
 * @ignore
 */
export const parseReposString = (reposStr, owner) => {
  if (typeof reposStr !== 'string') return reposStr;
  let repos = [];
  try {
    repos = parseify(reposStr);
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
      if (!owner) return;
      return {
        full_name: `${owner}/${repo}`,
        fetch: true,
        no_org: true,
      };
    }
    repo.itemprop = repo.itemprop || 'maintainer';
    return repo;
  }).filter((repo) => repo !== undefined);
}

/**
 * Parses and cleans user content to match what is expected by the user HTML
 * @param {GitHubUserHTML} content - a content object representing a GitHub user
 * @returns {GitHubUserHTML} ready for HTML content
 * @function
 * @ignore
 */
export const cleanUserContent = (content = {}) => {
  if (content.username && !content.login) {
    content.login = content.username;
  }
  const user = parseFetchedUser(content);
  if (!user.login) {
    user.error = 'Missing required attribute: `login` || `username`';
    return user;
  }
  if (!user.avatar_url) {
    user.avatar_url = blankPng;
  }
  if (user.followers === '0') delete user.followers;
  if (user.following === '0') delete user.following;

  user.repositories = content.repos ? parseReposString(content.repos, user.login) : [];

  const c = {};
  // remove `undefined` values
  for (const key in user) {
    if (user[key]) c[key] = user[key];
  }
  return c;
};

/**
 * Generates an object of content for the repository HTML
 * @param {GitHubUserHTML} content 
 * @param {boolean} [fetch] 
 * @returns {GitHubUserHTML} content ready for HTML, possibly includes fetched content
 * @function
 * @memberof GitHubUtils.user
 * @name generateContent
 */
export const generateUserContent = async (content, fetch = false) => {
  const userFromContent = cleanUserContent(content);
  if (userFromContent.error) return userFromContent;
  let fetched = {};
  if (fetch) {
    fetched = await fetchUser(userFromContent.login);
    if (fetched.message) {
      if (fetched.message === 'Not Found') {
        return { error: `Fetch Error: User "${content.login}" not found`};
      }
      return { error: `Fetch Error: ${fetched.message}`};
    }
    fetched = cleanUserContent(fetched);
    delete fetched.repositories;
    if (fetched.avatar_url && userFromContent.avatar_url === blankPng) {
      delete userFromContent.avatar_url;
    }
  }
  if (userFromContent.repositories?.length) {
    const repos = new Set();
    for (const repo of userFromContent.repositories) {
      const fullRepo = await generateRepoContent(repo, repo.fetch, repo.no_org);
      if (fullRepo.name && !fullRepo.error) repos.add(fullRepo);
    }
    userFromContent.repositories = Array.from(repos);
  }
  return Object.assign({}, fetched, userFromContent);
}
  