
/**
 * dev.to (or forem.dev) post HTML generation
 * @param {import("./content").ForemPostHTML} content 
 * @returns 
 */
function post(content) {
  if (content.error) {
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

export default post;