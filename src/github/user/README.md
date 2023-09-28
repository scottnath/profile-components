# GitHub user profile component

## Modules

<dl>
<dt><a href="#module_GitHub-User-Utilities">GitHub-User-Utilities</a></dt>
<dd><p>Utility functions for fetching and parsing GitHub User data</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#GitHubUser">GitHubUser</a></dt>
<dd><p>GitHub user profile web component</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#componentStyles">componentStyles</a></dt>
<dd><p>Styles for the component, imported during development, inlined during build</p>
</dd>
</dl>

<a name="module_GitHub-User-Utilities"></a>

## GitHub-User-Utilities
Utility functions for fetching and parsing GitHub User data

**Author**: @scottnath  

* [GitHub-User-Utilities](#module_GitHub-User-Utilities)
    * [.fetchUser(username)](#module_GitHub-User-Utilities.fetchUser) ⇒ <code>Object</code>
    * [.parseFetchedUser(user)](#module_GitHub-User-Utilities.parseFetchedUser) ⇒ <code>GitHubUserHTML</code>
    * [.parseReposString(reposStr, [owner])](#module_GitHub-User-Utilities.parseReposString) ⇒
    * [.cleanUserContent(content)](#module_GitHub-User-Utilities.cleanUserContent) ⇒ <code>GitHubUserHTML</code>
    * [.generateUserContent(content, [fetch])](#module_GitHub-User-Utilities.generateUserContent) ⇒ <code>GitHubUserHTML</code>
    * [~blankPng](#module_GitHub-User-Utilities..blankPng)
    * [~GitHubUserHTML](#module_GitHub-User-Utilities..GitHubUserHTML) : <code>Object</code>

<a name="module_GitHub-User-Utilities.fetchUser"></a>

### githubUserUtils.fetchUser(username) ⇒ <code>Object</code>
Fetch a user from

**Kind**: static method of [<code>GitHub-User-Utilities</code>](#module_GitHub-User-Utilities)  
**Returns**: <code>Object</code> - response status 200:  user; else {Object} error  
**See**: https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-a-user  

| Param | Type |
| --- | --- |
| username | <code>string</code> | 

<a name="module_GitHub-User-Utilities.parseFetchedUser"></a>

### githubUserUtils.parseFetchedUser(user) ⇒ <code>GitHubUserHTML</code>
Parse a GitHub user from the `user` endpoint response down to 
 only the data required for the user component

**Kind**: static method of [<code>GitHub-User-Utilities</code>](#module_GitHub-User-Utilities)  
**Returns**: <code>GitHubUserHTML</code> - component-ready user object  

| Param | Type |
| --- | --- |
| user | <code>Object</code> | 

<a name="module_GitHub-User-Utilities.parseReposString"></a>

### githubUserUtils.parseReposString(reposStr, [owner]) ⇒
Parses a string, which should be a JSON stringified array of GitHubRepository 
 objects or JSON stringified array of strings. If an array of string, 
 each string should be the `full_name` of a repository.

**Kind**: static method of [<code>GitHub-User-Utilities</code>](#module_GitHub-User-Utilities)  
**Returns**: array of strings of attributes for each repository  

| Param | Type | Description |
| --- | --- | --- |
| reposStr | <code>string</code> | String of GitHubRepository data |
| [owner] | <code>string</code> | GitHub user login, repository strings are not `full_name`s |

<a name="module_GitHub-User-Utilities.cleanUserContent"></a>

### githubUserUtils.cleanUserContent(content) ⇒ <code>GitHubUserHTML</code>
Parses and cleans user content to match what is expected by the user HTML

**Kind**: static method of [<code>GitHub-User-Utilities</code>](#module_GitHub-User-Utilities)  
**Returns**: <code>GitHubUserHTML</code> - ready for HTML content  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>GitHubUserHTML</code> | a content object representing a GitHub user |

<a name="module_GitHub-User-Utilities.generateUserContent"></a>

### githubUserUtils.generateUserContent(content, [fetch]) ⇒ <code>GitHubUserHTML</code>
Generates an object of content for the repository HTML

**Kind**: static method of [<code>GitHub-User-Utilities</code>](#module_GitHub-User-Utilities)  
**Returns**: <code>GitHubUserHTML</code> - content ready for HTML, possibly includes fetched content  

| Param | Type |
| --- | --- |
| content | <code>GitHubUserHTML</code> | 
| [fetch] | <code>boolean</code> | 

<a name="module_GitHub-User-Utilities..blankPng"></a>

### GitHub-User-Utilities~blankPng
Blank base64-encoded png

**Kind**: inner constant of [<code>GitHub-User-Utilities</code>](#module_GitHub-User-Utilities)  
**See**: https://png-pixel.com/  
<a name="module_GitHub-User-Utilities..GitHubUserHTML"></a>

### GitHub-User-Utilities~GitHubUserHTML : <code>Object</code>
Content needed to render a GitHub user. This is a subset of the `users` endpoint response

**Kind**: inner typedef of [<code>GitHub-User-Utilities</code>](#module_GitHub-User-Utilities)  
**See**: https://docs.github.com/en/rest/users/users#get-a-user  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| login | <code>string</code> | User's GitHub login |
| name | <code>string</code> | User's name |
| [username] | <code>string</code> | alias for `login` |
| [avatar_url] | <code>string</code> | URL to user's avatar |
| [bio] | <code>string</code> | User's biography content |
| [following] | <code>string</code> | number of people user is following |
| [followers] | <code>string</code> | number of followers |
| [error] | <code>string</code> | error message, if any |
| [repositories] | <code>Array.&lt;GitHubRepositoryHTML&gt;</code> | array of repositories |

<a name="GitHubUser"></a>

## GitHubUser
GitHub user profile web component

**Kind**: global variable  
**Summary**: Native web component which shows a GitHub user's profile content. Can use local data, 
 fetch data from the GitHub rest API, or use a combination of both.  
**Element**: github-user  
**See**: https://docs.github.com/en/rest/repos/repos#get-a-repository  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| login | <code>string</code> | User's GitHub login |
| avatar_url | <code>string</code> | URL to user's avatar |
| name | <code>string</code> | User's name |
| [fetch] | <code>boolean</code> | when true, fetches user from GitHub api |
| [username] | <code>string</code> | alias for `login` |
| [bio] | <code>string</code> | User's biography content |
| [following] | <code>string</code> | number of people user is following |
| [followers] | <code>string</code> | number of followers |
| [repos] | <code>string</code> | JSON stringified array of repositories |

**Example**  
```js
<github-user login="scottnath" fetch="true"></github-user>
```
<a name="componentStyles"></a>

## componentStyles
Styles for the component, imported during development, inlined during build

**Kind**: global constant  
