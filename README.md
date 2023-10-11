# profile-components

Web components which display profile information from various websites


* install via npm: `npm i profile-components`
* play with the components in [Storybook](https://scottnath.github.io/profile-components)
* [See demos on stackblitz](https://stackblitz.com/edit/profile-components)

## Components

<dl>
<dt><a href="#module_GitHubUser">GitHubUser</a></dt>
<dd><p>GitHub user profile web component</p>
</dd>
<dt><a href="#module_GitHubRepository">GitHubRepository</a></dt>
<dd><p>GitHub repository web component</p>
</dd>
<dt><a href="#module_DevtoUser">DevtoUser</a></dt>
<dd><p>dev.to user profile web component</p>
</dd>
<dt><a href="#module_DevtoPost">DevtoPost</a></dt>
<dd><p>dev.to post web component</p>
</dd>
</dl>

<a name="module_GitHubUser"></a>

## GitHubUser
GitHub user profile web component

**Summary**: Native web component which shows a GitHub user's profile content. Can use local data, 
 fetch data from the GitHub rest API, or use a combination of both.  
**Element**: github-user  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| login | <code>string</code> | User's GitHub login |
| avatar_url | <code>string</code> | URL to user's avatar |
| name | <code>string</code> | User's name |
| [fetch] | <code>boolean</code> | when true, fetches user from the [GitHub api](https://docs.github.com/en/rest/users/users#get-a-user) |
| [username] | <code>string</code> | alias for `login` |
| [bio] | <code>string</code> | User's biography content |
| [following] | <code>string</code> | number of people user is following |
| [followers] | <code>string</code> | number of followers |
| [repos] | <code>string</code> | JSON stringified array of repositories |
| [theme] | <code>string</code> | color theme for the component |

**Example**  
```js
<!-- import the web component -->
<script type="module" src="https://unpkg.com/profile-components/dist/github-user.js"></script>

<!-- use the custom element -->
<github-user login="scottnath" fetch="true"></github-user>
```
<a name="module_GitHubRepository"></a>

## GitHubRepository
GitHub repository web component

**Summary**: Native web component which shows a GitHub repository's content. Can use local data, 
 fetch data from the GitHub rest API, or use a combination of both.  
**Element**: github-repository  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| full_name | <code>string</code> | repository org and name, as in `scottnath/profile-components` |
| [fetch] | <code>boolean</code> | when true, fetches repo from the [GitHub api](https://docs.github.com/en/rest/repos/repos#get-a-repository) |
| [name] | <code>string</code> | repo name |
| [org] | <code>string</code> | repo owner organization's login, found at `<REST_RESPONSE>.organization.login` |
| [description] | <code>string</code> | repo description |
| [language] | <code>string</code> | programming language used in repo |
| [stargazers_count] | <code>string</code> | number of stars |
| [forks_count] | <code>string</code> | number of forks |
| [subscribers_count] | <code>string</code> | number of watchers |
| [itemprop] | <code>string</code> | Itemprop content to go with a containing component's itemscope |
| [no_org] | <code>string</code> | Do not include the repo owner or organization |
| [theme] | <code>string</code> | color theme for the component |

**Example**  
```js
<!-- import the web component -->
<script type="module" src="https://unpkg.com/profile-components/dist/github-repository.js"></script>

<!-- use the custom element -->
<github-repository full_name="scottnath/profile-components" fetch="true"></github-repository>
```
<a name="module_DevtoUser"></a>

## DevtoUser
dev.to user profile web component

**Summary**: Native web component which shows a dev.to user's profile content. 
 Can use local data, or fetch data from the dev.to API, or use a combination of both.  
**Element**: devto-user  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | User's dev.to username |
| [fetch] | <code>boolean</code> | when true, fetches user and posts from the [Forem API](https://developers.forem.com/api/v0#tag/users/operation/getUser) |
| [name] | <code>string</code> | The name of the user |
| [summary] | <code>string</code> | The user's bio |
| [joined_at] | <code>string</code> | The date the user joined |
| [profile_image] | <code>string</code> | The URL of the user's profile image |
| [post_count] | <code>number</code> | The number of posts the user has published |
| [latest_post] | <code>string</code> | User's latest post content, JSON stringified |
| [popular_post] | <code>string</code> | User's most popular post content, JSON stringified |
| [theme] | <code>string</code> | color theme for the component |

**Example**  
```js
<!-- import the web component -->
<script type="module" src="https://unpkg.com/profile-components/dist/devto-user.js"></script>

<!-- use the custom element -->
<devto-user username="scottnath" fetch="true"></devto-user>
```
<a name="module_DevtoPost"></a>

## DevtoPost
dev.to post web component

**Summary**: Native web component which shows a dev.to (or forem.dev) post. Can use local data,
 fetch data from the dev.to API, or use a combination of both.  
**Element**: devto-post  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Post ID |
| title | <code>string</code> | Post title |
| url | <code>string</code> | Post URL |
| cover_image | <code>string</code> | Post cover image URL |
| social_image | <code>string</code> | Post social image URL |
| [fetch] | <code>boolean</code> | when true, fetches post from the [Forem API](https://developers.forem.com/api/v0#tag/articles/operation/getArticleById) |

**Example**  
```js
<!-- import the web component -->
<script type="module" src="https://unpkg.com/profile-components/dist/devto-post.js"></script>

<!-- use the custom element -->
<devto-post id="123456" fetch="true"></devto-post>
```
