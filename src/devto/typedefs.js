

/**
 * @see https://developers.forem.com/api/v0#tag/users/operation/getUser
 * @typedef {Object} DevToUser
 * @property {string} type_of - The type of the object, in this case "user".
 * @property {number} id - The unique identifier of the user.
 * @property {string} username - The username of the user.
 * @property {string} name - The name of the user.
 * @property {string} summary - A brief summary or bio of the user.
 * @property {string} twitter_username - The user's Twitter username.
 * @property {string} github_username - The user's GitHub username.
 * @property {?string} website_url - The user's personal website URL or null if not provided.
 * @property {string} location - The user's location.
 * @property {string} joined_at - The date the user joined, formatted as a string.
 * @property {string} profile_image - The URL to the user's profile image.
 */

/**
 * @see https://developers.forem.com/api/v1#tag/articles/operation/getArticles
 * @typedef {Object} DevToArticle
 * @property {string} type_of - The type of the object, in this case "article".
 * @property {number} id - The unique identifier of the article.
 * @property {string} title - The title of the article.
 * @property {string} description - A brief description of the article.
 * @property {string} readable_publish_date - The human-readable publish date.
 * @property {string} slug - The article's slug.
 * @property {string} path - The relative path to the article.
 * @property {string} url - The full URL to the article.
 * @property {number} comments_count - The number of comments on the article.
 * @property {number} public_reactions_count - The number of public reactions to the article.
 * @property {?number} collection_id - The collection ID if the article belongs to a collection.
 * @property {string} published_timestamp - The timestamp when the article was published.
 * @property {number} positive_reactions_count - The number of positive reactions to the article.
 * @property {string} cover_image - The URL to the article's cover image.
 * @property {string} social_image - The URL to the article's social image.
 * @property {string} canonical_url - The canonical URL of the article.
 * @property {string} created_at - The timestamp when the article was created.
 * @property {?string} edited_at - The timestamp when the article was last edited.
 * @property {?string} crossposted_at - The timestamp when the article was crossposted.
 * @property {string} published_at - The timestamp when the article was published.
 * @property {string} last_comment_at - The timestamp of the last comment on the article.
 * @property {number} reading_time_minutes - The estimated reading time in minutes.
 * @property {Array<string>} tag_list - List of tags associated with the article.
 * @property {string} tags - Comma-separated string of tags.
 * @property {DevToUser} user - The user who wrote the article.
 * @property {DevToOrganization} organization - The organization associated with the article.
 * @property {DevToFlareTag} flare_tag - The flare tag associated with the article.
 */

/**
 * @typedef {Object} DevToOrganization
 * @property {string} name - The name of the organization.
 * @property {string} username - The username of the organization.
 * @property {string} slug - The slug of the organization.
 * @property {string} profile_image - The URL to the organization's profile image.
 * @property {string} profile_image_90 - The URL to the 90x90 version of the organization's profile image.
 */

/**
 * @typedef {Object} DevToFlareTag
 * @property {string} name - The name of the flare tag.
 * @property {string} bg_color_hex - The background color of the flare tag in HEX format.
 * @property {string} text_color_hex - The text color of the flare tag in HEX format.
 */


