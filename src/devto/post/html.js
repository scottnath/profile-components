
/**
 * dev.to (or forem.dev) post HTML generation
 * @param {ForemPostHTML} content 
 * @returns {string} HTML string with added content
 * @function
 * @memberof DEVUtils.post
 */
function html(content) {
  if (content.error) {
    return `
      <div aria-label="dev.to article" class="post" itemscope itemtype="http://schema.org/Action">
        <p itemprop="error">${content.error}</p>
      </div>
    `
  }

  return `
    <span aria-label="dev.to article" class="post" itemscope itemtype="http://schema.org/Article">
      <a href="${content.url}" itemprop="url" aria-label="article ${content.title}">
        <img src="${content.cover_image}" itemprop="image" alt="Cover image for article ${content.title}" />
        <span itemprop="name" aria-hidden="true">${content.title}</span>
      </a>
    </span>
  `;
}

export default html;