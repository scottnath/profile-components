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

  const itemprop = content.schema_itemprop !== '' ? `itemprop=${content.schema_itemprop}` : '';

  return `
    <section aria-label="dev.to user profile" ${itemprop} itemscope itemtype="http://schema.org/ProfilePage">
      <header aria-label="${content.a11y.headerLabel}">
        <span aria-hidden="true"><span itemprop="publisher">dev.to</span></span>
        <address>
          <a href="https://dev.to/${content.username}" aria-label="${content.name || content.username}'s profile on dev.to" itemprop="significantLink">
            <span itemprop="thumbnail">
              <img src="${content.profile_image}" alt="Avatar for ${content.name || content.username}" loading="lazy" />
            </span>
            <span itemprop="author" aria-hidden="true">${content.name}</span>
          </a>
        </address>
      </header>
      <div part="main">
        ${content.summary ? `<p itemprop="headline">${content.summary}</p>` : ''}
        ${content.joined_at ? `<p>Joined on <time itemprop="dateCreated" datetime="${formatDate(content.joined_at)}">${content.joined_at}</time></p>` : ''}
        ${content.post_count ? `<p class="post_count" itemprop="size">${content.post_count} posts published</p>` : ''}
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
          <a href="https://dev.to/${content.username}" part="cta branded" itemprop="significantLink">View Profile on dev.to</a>
        </address>
      </footer>
    </section>
  `;
}

export default html;