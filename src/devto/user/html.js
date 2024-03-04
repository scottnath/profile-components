import { formatDate } from "../helpers";
import postHTML from "../post/html.js";

/**
 * dev.to (or forem.dev) user HTML generation
 * @param {ForemUser} content 
 * @returns {string} HTML string with added content
 * @function
 * @memberof DEVUtils.user
 */
function html(content) {
  if (content.error) {
    return `
      <section aria-label="dev.to user profile" itemscope itemtype="http://schema.org/Action">
        <p itemprop="error">${content.error}</p>
      </section>
    `
  }

  return `
    <section aria-label="dev.to user profile" itemscope itemtype="http://schema.org/Person">
      <header aria-label="${content.a11y.headerLabel}">
        <span aria-hidden="true"><span itemprop="memberOf">dev.to</span></span> 
        <address>
          <a href="https://dev.to/${content.username}" aria-label="${content.name || content.username}'s profile on dev.to" itemprop="url">
            <span itemprop="image">
              <img src="${content.profile_image}" alt="Avatar for ${content.name || content.username}" loading="lazy" />
            </span>
            <span itemprop="name" aria-hidden="true">${content.name}</span>
          </a>
        </address>
      </header>
      <div part="main">
        ${content.summary ? `<p itemprop="description">${content.summary}</p>` : ''}
        ${content.joined_at ? `<p>Joined on <time itemprop="startDate" datetime="${formatDate(content.joined_at)}">${content.joined_at}</time></p>` : ''}
        ${content.post_count ? `<p class="post_count">${content.post_count} posts published</p>` : ''}
        ${content.latest_post || content.popular_post ? `
          <div>
            ${content.latest_post ? `
              <header aria-label="Latest post">Latest post</header>
              ${postHTML(content.latest_post)}
            ` : ''}
            ${content.popular_post ? `
              <header aria-label="Popular post">Popular post</header>
              ${postHTML(content.popular_post)}
            ` : ''}
          </div>
        ` : ''}
      </div>
      <footer>
        <address>
          <a href="https://dev.to/${content.username}" part="cta branded" itemprop="url">View Profile on dev.to</a>
        </address>
      </footer>
    </section>
  `;
}

export default html;