import { intToString } from '../../utils/index.js';

/**
 * Mastodon toot HTML generation
 * @param {MastodonTootHTML} content - content needed to render a Mastodon toot
 * @returns {string} HTML which represents a Mastodon toot
 * @function
 * @memberof MastodonUtils.toot
 * @todo CONTENT: https://github.com/mastodon/mastodon/blob/6c52f8286b335248162035acf86635c63cfc9222/app/javascript/mastodon/components/status_content.jsx
 * @todo ACTIONS: https://github.com/mastodon/mastodon/blob/6c52f8286b335248162035acf86635c63cfc9222/app/javascript/mastodon/components/status_action_bar.jsx
 * @TODO CONTAINER: https://github.com/mastodon/mastodon/blob/6c52f8286b335248162035acf86635c63cfc9222/app/javascript/mastodon/components/status.jsx
 *    maybe a mini-me profile for header
 * @TODO TIMEAGO: https://github.com/mastodon/mastodon/blob/6c52f8286b335248162035acf86635c63cfc9222/app/javascript/mastodon/components/relative_timestamp.tsx
 * 
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
      <a href="${content.url}" target="_blank" rel="noopener noreferrer" itemprop="url">
        <time datetime="2023-10-30T22:00:26.047Z" title="Oct 30, 2023, 18:00">38m</time>
      </a>
      ${content.content}
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
