import { intToString } from '../../utils/index.js';

/**
 * Mastodon toot HTML generation
 * @param {MastodonTootHTML} content - content needed to render a Mastodon toot
 * @returns {string} HTML which represents a Mastodon toot
 * @function
 * @memberof MastodonUtils.toot
 */
function html(content) {
  if (content.error) {
    return `
      <div aria-label="Mastodon toot" class="toot" itemscope itemtype="http://schema.org/SocialMediaPosting">
        <p itemprop="error">${content.error}</p>
      </div>
    `;
  }

  return `
    <div aria-label="Mastodon toot" class="toot" itemscope itemtype="http://schema.org/SocialMediaPosting">
      <span itemprop="text">${content.content}</span>
      <a href="${content.url}" itemprop="url" aria-label="View toot on Mastodon">${content.url}</a>
      <dl aria-label="Toot details">
        <dt data-detail="favourites"><span class="sr-only">Favourites</span></dt>
        <dd itemprop="interactionCount">${intToString(content.favourites_count)}</dd>
        <dt data-detail="replies"><span class="sr-only">Replies</span></dt>
        <dd itemprop="interactionCount">${intToString(content.replies_count)}</dd>
        <dt data-detail="reblogs"><span class="sr-only">Reblogs</span></dt>
        <dd itemprop="interactionCount">${intToString(content.reblogs_count)}</dd>
      </dl>
      
    </div>
  `;
}

export default html;
