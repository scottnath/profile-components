import { formatDate } from "../utils";
import postHTML from "../post/html.js";

/**
 * dev.to (or forem.dev) user HTML generation
 * @param {import("./content").ForemUser} content 
 * @returns 
 */
function post(content) {
  if (content.error) {
    return `
      <section aria-label="dev.to user profile" itemscope itemtype="http://schema.org/Action">
        <p itemprop="error">${content.error}</p>
      </section>
    `
  }

  return `
    <section aria-label="dev.to user profile" itemscope itemtype="http://schema.org/Person">
      <header>
        <span><span itemprop="memberOf">dev.to</span> <span>user</span></span> 
        <address>
          <a href="https://dev.to/${content.username}" aria-label="View @${content.username}'s profile on dev.to" itemprop="url">
            <span itemprop="image">
              <img src="${content.profile_image}" alt="Avatar for ${content.name}" loading="lazy" />
            </span>
            <span itemprop="name">${content.name}</span>
          </a>
        </address>
      </header>
      <div part="main">
        ${content.summary ? `<p itemprop="description">${content.summary}</p>` : ''}
        ${content.joined_at ? `<p>Joined on <time datetime="${formatDate(content.joined_at)}">${content.joined_at}</time></p>` : ''}
        ${content.post_count ? `<p class="post_count">${content.post_count} posts published</p>` : ''}
        ${content.latest_post || content.popular_post ? `
          <dl>
            ${content.latest_post ? `
              <dt>Latest post</dt>
              <dd>${postHTML(content.latest_post)}</dd>
            ` : ''}
            ${content.popular_post ? `
              <dt>Popular post</dt>
              <dd>${postHTML(content.popular_post)}</dd>
            ` : ''}
          </dl>
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

export default post;