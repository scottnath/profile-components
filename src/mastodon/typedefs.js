

/**
 * @typedef {Object} MastodonAccount
 * @property {string} id - The account id.
 * @property {string} username - The username of the account, not including domain.
 * @property {string} acct - The Webfinger account URI. Equal to username for local users, or username@domain for remote users.
 * @property {string} url - The location of the user’s profile page.
 * @property {string} display_name - The profile’s display name.
 * @property {string} note - The profile’s bio or description.
 * @property {string} avatar - An image icon that is shown next to statuses and in the profile.
 * @property {string} avatar_static - A static version of the avatar. Equal to avatar if its value is a static image; different if avatar is an animated GIF.
 * @property {string} header - An image banner that is shown above the profile and in profile cards.
 * @property {string} header_static - A static version of the header. Equal to header if its value is a static image; different if header is an animated GIF.
 * @property {boolean} locked - Whether the account manually approves follow requests.
 * @property {Array<Object>} fields - Additional metadata attached to a profile as name-value pairs.
 * @property {Array<Object>} emojis - Custom emoji entities to be used when rendering the profile.
 * @property {boolean} bot - Indicates that the account may perform automated actions, may not be monitored, or identifies as a robot.
 * @property {boolean} group - Indicates that the account represents a Group actor.
 * @property {?boolean} discoverable - Whether the account has opted into discovery features such as the profile directory.
 * @property {?boolean} noindex - Whether the local user has opted out of being indexed by search engines.
 * @property {?MastodonAccount} moved - Indicates that the profile is currently inactive and that its user has moved to a new account.
 * @property {boolean} suspended - An extra attribute returned only when an account is suspended.
 * @property {boolean} limited - An extra attribute returned only when an account is silenced. If true, indicates that the account should be hidden behind a warning screen.
 * @property {string} created_at - When the account was created.
 * @property {?string} last_status_at - When the most recent status was posted.
 * @property {number} statuses_count - How many statuses are attached to this account.
 * @property {number} followers_count - The reported followers of this profile.
 * @property {number} following_count - The reported follows of this profile.
 */
