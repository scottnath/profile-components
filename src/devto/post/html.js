
/**
 * dev.to (or forem.dev) post HTML generation
 * @param {ForemPostHTML} content 
 * @returns {string} HTML string with added content
 * @function
 * @memberof DEVUtils.post
 */
function html(content) {
  if (content.error || !content.url || !content.title) {
    return '';
  }

  return `
    <span class="post" itemscope itemtype="http://schema.org/Article">
      <a href="${content.url}" itemprop="url" aria-label="read post ${content.title}">
        <img src="${content.cover_image}" itemprop="image" alt="Cover image for post ${content.title}" />
        <span itemprop="name">${content.title}</span>
      </a>
    </span>
  `;
}

export default html;