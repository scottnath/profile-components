

import { intToString } from '../../utils/index.js';

/**
 * GitHub repository HTML generation
 * @param {GitHubRepositoryHTML} content - content needed to render a GitHub repository
 * @returns {string} HTML which represents a GitHub repository
 * @function
 * @memberof GitHubUtils.repo
 */
function html(content) {
  if (content.error) {
    return `
      <section aria-label="GitHub repository" class="repo" itemscope itemtype="https://schema.org/Action">
        <p itemprop="error">${content.error}</p>
      </section>
    `
  }

  const itemprop = content.schema_itemprop !== '' ? `itemprop=${content.schema_itemprop}` : '';

  return `
    <section aria-label="GitHub repository" class="repo" ${itemprop} itemscope itemtype="https://schema.org/SoftwareSourceCode">
      <a href="https://github.com/${content.full_name}" itemprop="codeRepository" aria-label="${content.full_name} repository on GitHub">
        ${content.org ? `
          <span itemprop="maintainer" aria-hidden="true">${content.org} /</span>
        ` : ''}
        <span itemprop="name" aria-hidden="true">${content.name}</span>
      </a>
      ${content.description ? `
        <p itemprop="description">${content.description}</p>
      ` : ''}
      <dl aria-label="Repository details">
        ${content.language ? `
          <div>
            <dt data-detail="language" data-language="${content.language}"><span class="sr-only">Language</span></dt>
            <dd itemprop="programmingLanguage">${content.language}</dd>
          </div>
        ` : ''}
        ${content.stargazers_count ? `
          <div itemprop="interactionStatistic" itemscope itemtype="https://schema.org/InteractionCounter">
            <dt data-detail="stars"><meta itemprop="interactionType" content="https://schema.org/LikeAction"><span class="sr-only">Stars</span></dt>
            <dd><span aria-hidden="true">${intToString(content.stargazers_count)} </span><span class="sr-only" itemprop="userInteractionCount">${content.stargazers_count}</span></dd>
          </div>
        ` : ''}
        ${content.subscribers_count ? `
          <div itemprop="interactionStatistic" itemscope itemtype="https://schema.org/InteractionCounter">
            <dt data-detail="watchers"><meta itemprop="interactionType" content="https://schema.org/FollowAction"><span class="sr-only">Watchers</span></dt>
            <dd><span aria-hidden="true">${intToString(content.subscribers_count)}</span><span class="sr-only" itemprop="userInteractionCount">${content.subscribers_count}</span></dd>
          </div>
        ` : ''}
        ${content.forks_count ? `
          <div itemprop="interactionStatistic" itemscope itemtype="https://schema.org/InteractionCounter">
            <dt data-detail="forks"><meta itemprop="interactionType" content="https://schema.org/CreateAction"><span class="sr-only" itemprop="location">Forks</span></dt>
            <dd><span aria-hidden="true">${intToString(content.forks_count)}</  span><span class="sr-only" itemprop="userInteractionCount">${content.forks_count}</span></dd>
          </div>
        ` : ''}
      </dl>
    </section>
  `;
}

export default html;