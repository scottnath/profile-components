
import repositoryHTML from '../repository/html.js';
import { intToString } from '../../utils/index.js';

/**
 * Generates an HTML string for a GitHub user profile.
 * @param {GitHubUserHTML} content - a content object representing a GitHub user
 * @returns {string} HTML string
 * @function
 * @memberof GitHubUtils.user
 */
function html(content) {
  {
    if (content.error) {
      return `
        <section aria-label="GitHub user profile" itemscope itemtype="https://schema.org/Action">
          <p itemprop="error">${content.error}</p>
        </section>
      `
    }

    const itemprop = content.schema_itemprop && content.schema_itemprop !== '' ? `itemprop=${content.schema_itemprop}` : '';
    
    return `
      <section aria-label="GitHub user profile" ${itemprop} itemscope itemtype="https://schema.org/ProfilePage">
        <header aria-label="${content.a11y.headerLabel}">
          <span itemprop="publisher" aria-hidden="true">GitHub</span>
          <span itemprop="author" aria-hidden="true">${content.login}</span>
        </header>
        <meta itemprop="significantLink" content="https://github.com/${content.login}">
        <div part="main" itemprop="mainEntity" itemscope itemtype="https://schema.org/Person">
          <a href="https://github.com/${content.login}" itemprop="url" aria-label="${content.name || content.login}'s profile on GitHub">
            <span class="avatar" itemprop="image">
              <img src="${content.avatar_url}" alt="Avatar for ${content.name || content.login}" loading="lazy" />
            </span>
            <span aria-hidden="true">
              <span itemprop="name">${content.name}</span>
              <span itemprop="additionalName">${content.login}</span>
            </span>
          </a>
          ${content.bio ? `<p itemprop="description">${content.bio}</p>` : ''}
          ${content.following || content.followers ? `
            <dl aria-label="GitHub user stats">
            ${content.followers ? `
              <div aria-label="followers: ${content.followers}" itemprop="interactionStatistic" itemscope itemtype="https://schema.org/InteractionCounter">
              <dt aria-hidden="true">followers<meta itemprop="interactionType" content="https://schema.org/FollowAction"></dt>
              <dd class="followee" aria-hidden="true">
                <span itemprop="userInteractionCount">${intToString(content.followers)}</span>
                <span class="sr-only">${content.followers}</span>
              </dd></div>
            ` : ''}
            ${content.following ? `
              <div aria-label="following: ${content.following}" itemprop="interactionStatistic" itemscope itemtype="https://schema.org/InteractionCounter">
              <dt aria-hidden="true">following<meta itemprop="interactionType" content="https://schema.org/SubscribeAction"></dt>
              <dd class="follows" aria-hidden="true">
                <span itemprop="userInteractionCount">${intToString(content.following)}</span>
                <span class="sr-only">${content.following}</span>
              </dd></div>
            ` : ''}
            </dl>
          ` : ''}
        </div>
        <div>
          ${Array.isArray(content.repositories) && content.repositories?.length ? `
            <header aria-label="Pinned repositories">Pinned repositories</header>
            ${content.repositories.map((repo) => `
              ${repositoryHTML(repo)}
            `).join('')}
          ` : ''}
        </div>
      </section>
    `;
  }
}

export default html;
