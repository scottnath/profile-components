
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
      <div aria-label="dev.to article" class="post" itemscope itemtype="https://schema.org/Action">
        <span itemprop="error">${content.error}</span>
      </div>
    `
  }

  const itemprop = content.schema_itemprop !== '' ? `itemprop=${content.schema_itemprop}` : '';

  return `
    <span aria-label="dev.to article" class="post" ${itemprop} itemscope itemtype="https://schema.org/Article">
      <a href="${content.url}" itemprop="url" aria-label="article ${content.title}">
        <img src="${content.cover_image}" itemprop="image" alt="Cover image for article ${content.title}" />
        <span itemprop="name" aria-hidden="true">${content.title}</span>
      </a>
    </span>
  `;
}

export default html;