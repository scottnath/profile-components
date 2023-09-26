

import { intToString } from '../../utils/index.js';

/**
 * GitHub repository HTML generation
 * @param {GitHubRepositoryHTML} content - content needed to render a GitHub repository
 * @returns {string} HTML which represents a GitHub repository
 */
function repository(content) {
  if (content.error) {
    return `
      <div aria-label="GitHub repository" itemscope itemtype="http://schema.org/Action">
        <p itemprop="error">${content.error}</p>
      </div>
    `
  }
  return `
    <div aria-label="GitHub repository" class="repo" itemscope itemtype="http://schema.org/SoftwareSourceCode">
      <a href="https://github.com/${content.full_name}" itemprop="codeRepository">
        ${content.org ? `
          <span itemprop="maintainer">${content.org} /</span>
        ` : ''}
        <span itemprop="name">${content.name}</span>
      </a>
      ${content.description ? `
        <p itemprop="about">${content.description}</p>
      ` : ''}
      <dl aria-label="Repository details">
        ${content.language ? `
          <dt data-detail="language" data-language="${content.language}"><span class="sr-only">Language</span></dt>
          <dd itemprop="programmingLanguage">${content.language}</dd>
        ` : ''}
        ${content.stargazers_count ? `
          <dt data-detail="stars"><span class="sr-only">Stars</span></dt>
          <dd><span aria-hidden="true">${intToString(content.stargazers_count)}</span><span class="sr-only">${content.stargazers_count}</span></dd>
        ` : ''}
        ${content.subscribers_count ? `
          <dt data-detail="watchers"><span class="sr-only">Watchers</span></dt>
          <dd><span aria-hidden="true">${intToString(content.subscribers_count)}</span><span class="sr-only">${content.subscribers_count}</span></dd>
        ` : ''}
        ${content.forks_count ? `
          <dt data-detail="forks"><span class="sr-only">Forks</span></dt>
          <dd><span aria-hidden="true">${intToString(content.forks_count)}</span><span class="sr-only">${content.forks_count}</span></dd>
        ` : ''}
      </dl>
    </div>
  `;
}

export default repository;