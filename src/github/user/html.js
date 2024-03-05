
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
        <section aria-label="GitHub user profile" itemscope itemtype="http://schema.org/Action">
          <p itemprop="error">${content.error}</p>
        </section>
      `
    }
    
    return `
      <section aria-label="GitHub user profile" itemscope itemtype="http://schema.org/Person">
        <header aria-label="${content.a11y.headerLabel}">
          <span itemprop="memberOf" aria-hidden="true">GitHub</span>
          <span itemprop="alternativeName" aria-hidden="true">${content.login}</span>
        </header>
        <div part="main">
          <address>
            <a href="https://github.com/${content.login}" aria-label="${content.name || content.login}'s profile on GitHub" itemprop="url">
              <span class="avatar" itemprop="image">
                <img src="${content.avatar_url}" alt="Avatar for ${content.name || content.login}" loading="lazy" />
              </span>
              <span itemprop="creator" aria-hidden="true">
                <span itemprop="name">${content.name}</span>
                <span itemprop="alternativeName">${content.login}</span>
              </span>
            </a>
          </address>
          ${content.bio ? `<p itemprop="description">${content.bio}</p>` : ''}
          ${content.following || content.followers ? `
            <dl aria-label="GitHub user stats">
            ${content.followers ? `
              <div aria-label="followers: ${content.followers}">
              <dt aria-hidden="true">followers</dt>
              <dd itemprop="followee" aria-hidden="true">
                <span>${intToString(content.followers)}</span>
                <span class="sr-only">${content.followers}</span>
              </dd></div>
            ` : ''}
            ${content.following ? `
              <div aria-label="following: ${content.following}">
              <dt aria-hidden="true">following</dt>
              <dd itemprop="follows" aria-hidden="true">
                <span>${intToString(content.following)}</span>
                <span class="sr-only">${content.following}</span>
              </dd></div>
            ` : ''}
            </dl>
          ` : ''}
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
