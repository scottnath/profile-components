/**
 * Mastodon user HTML generation
 * @param {Object} content - a content object representing a Mastodon user
 * @returns {string} HTML string
 * @function
 * @memberof MastodonUtils.user
 */
function html(content) {
  if (content.error) {
    return `
      <section aria-label="Mastodon user profile" itemscope itemtype="http://schema.org/Action">
        <p itemprop="error">${content.error}</p>
      </section>
    `;
  }

  return `
    <section aria-label="Mastodon user profile" itemscope itemtype="http://schema.org/Person">
      <dl>
        <dt>id</dt>
        <dd>${content.id}</dd>
        <dt>username</dt>
        <dd>${content.username}</dd>
        <dt>acct</dt>
        <dd>${content.acct}</dd>
        <dt>url</dt>
        <dd>${content.url}</dd>
        <dt>display_name</dt>
        <dd>${content.display_name}</dd>
        <dt>note</dt>
        <dd>${content.note}</dd>
        <dt>avatar</dt>
        <dd><img src="${content.avatar}" alt="Avatar for ${content.display_name}"></dd>
        <dt>avatar_static</dt>
        <dd><img src="${content.avatar_static}" alt="Static avatar for ${content.display_name}"></dd>
        <dt>header</dt>
        <dd><img src="${content.header}" alt="Header for ${content.display_name}"></dd>
        <dt>header_static</dt>
        <dd><img src="${content.header_static}" alt="Static header for ${content.display_name}"></dd>
        <dt>bot</dt>
        <dd>${content.bot}</dd>
        <dt>group</dt>
        <dd>${content.group}</dd>
        <dt>created_at</dt>
        <dd>${content.created_at}</dd>
        <dt>last_status_at</dt>
        <dd>${content.last_status_at}</dd>
        <dt>statuses_count</dt>
        <dd>${content.statuses_count}</dd>
        <dt>followers_count</dt>
        <dd>${content.followers_count}</dd>
        <dt>following_count</dt>
        <dd>${content.following_count}</dd>
      </dl>
    </section>
  `;
}

export default html;
