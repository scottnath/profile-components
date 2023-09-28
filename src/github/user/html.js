
import repositoryHTML from '../repository/html.js';
import { intToString } from '../../utils/index.js';

function user(content) {
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
        <header>
          <span><span itemprop="memberOf">GitHub</span> user</span> 
          <span itemprop="alternativeName">${content.login}</span>
        </header>
        <div part="main">
          <address>
            <a href="https://github.com/${content.login}" aria-label="View @${content.login}'s profile on GitHub" itemprop="url">
              <span class="avatar" itemprop="image">
                <img src="${content.avatar_url}" alt="Avatar for ${content.name | content.login}" loading="lazy" />
              </span>
              <span itemprop="creator">
                <span itemprop="name">${content.name}</span>
                <span itemprop="alternativeName">${content.login}</span>
              </span>
            </a>
          </address>
          ${content.bio ? `<p itemprop="description">${content.bio}</p>` : ''}
          ${content.following || content.followers ? `
            <dl>
            ${content.followers ? `
              <span><dt>followers</dt>
              <dd itemprop="followee">
                <span aria-hidden="true">${intToString(content.followers)}</span>
                <span class="sr-only">${content.followers}</span>
              </dd></span>
            ` : ''}
            ${content.following ? `
              <span><dt>following</dt>
              <dd itemprop="follows">
                <span aria-hidden="true">${intToString(content.following)}</span>
                <span class="sr-only">${content.following}</span>
              </dd></span>
            ` : ''}
            </dl>
          ` : ''}
          ${Array.isArray(content.repositories) && content.repositories?.length ? `
            <dl>
              <dt>Pinned repositories</dt>
              ${content.repositories.map((repo) => `
                <dd>${repositoryHTML(repo)}</dd>
              `).join('')}
            </dl>
          ` : ''}
        </div>
      </section>
    `;
  }
}

export default user;
