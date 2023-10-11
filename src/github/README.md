# GitHub profile components

Includes two web components:

* `<github-repository>` - displays information about a GitHub repository
* `<github-user>` - displays information about a GitHub user, includes `<github-repository>`

see README at root of repo for usage details

## @todo

- [ ] add process.env option to include github token for local development
  * REST api has a 60-calls-per-hour limit for unauthenticated requests
  * adding a local-dev token option would make development easier
- [ ] css styles method which outputs a css string for primer vars
  * for local roll-ur-own vars-primer.css
  * could be used to create alternative smaller dist versions
- [ ] add long names and matching stories

---

<a name="GitHubUtils"></a>

## GitHubUtils : <code>object</code>
Utility functions for fetching and parsing GitHub api data, getting
 styles and generating HTML for GitHub profile UIs

**Kind**: global namespace  
**Author**: @scottnath  

* [GitHubUtils](#GitHubUtils) : <code>object</code>
    * [.repo](#GitHubUtils.repo) : <code>object</code>
        * [.styles](#GitHubUtils.repo.styles)
        * [.html(content)](#GitHubUtils.repo.html) ⇒ <code>string</code>
        * [.generateContent(content, [fetch], [no_org])](#GitHubUtils.repo.generateContent) ⇒ <code>GitHubRepositoryHTML</code>
        * [.GitHubRepositoryHTML](#GitHubUtils.repo.GitHubRepositoryHTML) : <code>Object</code>
    * [.user](#GitHubUtils.user) : <code>object</code>
        * [.styles](#GitHubUtils.user.styles)
        * [.html(content)](#GitHubUtils.user.html) ⇒ <code>string</code>
        * [.generateContent(content, [fetch])](#GitHubUtils.user.generateContent) ⇒ <code>GitHubUserHTML</code>
        * [.GitHubUserHTML](#GitHubUtils.user.GitHubUserHTML) : <code>Object</code>

<a name="GitHubUtils.repo"></a>

### githubUtils.repo : <code>object</code>
Utility functions for a repository

**Kind**: static namespace of [<code>GitHubUtils</code>](#GitHubUtils)  
**Example** *(Server side rendering trick)*  
```js
<github-repository>
 <template id="github-repo" shadowrootmode="open"></template>
</github-repository>

<script type="module">
import {repo} from 'profile-components/github-utils';
const content = repo.generateContent({full_name: 'scottnath/profile-components'}, true);
const html = repo.html(content);
document.querySelector('#github-repo').innerHTML = `<style>${repo.style}</style>${html}`;
</script>
```

* [.repo](#GitHubUtils.repo) : <code>object</code>
    * [.styles](#GitHubUtils.repo.styles)
    * [.html(content)](#GitHubUtils.repo.html) ⇒ <code>string</code>
    * [.generateContent(content, [fetch], [no_org])](#GitHubUtils.repo.generateContent) ⇒ <code>GitHubRepositoryHTML</code>
    * [.GitHubRepositoryHTML](#GitHubUtils.repo.GitHubRepositoryHTML) : <code>Object</code>

<a name="GitHubUtils.repo.styles"></a>

#### repo.styles
GitHub repository styles

**Kind**: static property of [<code>repo</code>](#GitHubUtils.repo)  
<a name="GitHubUtils.repo.html"></a>

#### repo.html(content) ⇒ <code>string</code>
GitHub repository HTML generation

**Kind**: static method of [<code>repo</code>](#GitHubUtils.repo)  
**Returns**: <code>string</code> - HTML which represents a GitHub repository  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>GitHubRepositoryHTML</code> | content needed to render a GitHub repository |

<a name="GitHubUtils.repo.generateContent"></a>

#### repo.generateContent(content, [fetch], [no_org]) ⇒ <code>GitHubRepositoryHTML</code>
Generates an object of content for the repository HTML

**Kind**: static method of [<code>repo</code>](#GitHubUtils.repo)  
**Returns**: <code>GitHubRepositoryHTML</code> - content ready for HTML, possibly includes fetched content  

| Param | Type |
| --- | --- |
| content | <code>GitHubRepositoryHTML</code> | 
| [fetch] | <code>boolean</code> | 
| [no_org] | <code>boolean</code> | 

<a name="GitHubUtils.repo.GitHubRepositoryHTML"></a>

#### repo.GitHubRepositoryHTML : <code>Object</code>
Content needed to render a GitHub repository. This is a subset of the `repos` endpoint response

**Kind**: static typedef of [<code>repo</code>](#GitHubUtils.repo)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| full_name | <code>string</code> | repository org and name, as in `scottnath/profile-components` |
| name | <code>string</code> | repo name |
| [org] | <code>string</code> | repo owner organization's login, found at `<REST_RESPONSE>.organization.login` |
| [description] | <code>string</code> | repo description |
| [language] | <code>string</code> | programming language used in repo |
| [stargazers_count] | <code>string</code> | number of stars |
| [forks_count] | <code>string</code> | number of forks |
| [subscribers_count] | <code>string</code> | number of watchers |
| [error] | <code>string</code> | error message, if any |

<a name="GitHubUtils.user"></a>

### githubUtils.user : <code>object</code>
Utility functions for a user

**Kind**: static namespace of [<code>GitHubUtils</code>](#GitHubUtils)  
**Example** *(Server side rendering trick)*  
```js
<github-user>
 <template id="github-user" shadowrootmode="open"></template>
</github-user>

<script type="module">
import {user} from 'profile-components/github-utils';
const content = user.generateContent({login: 'scottnath'}, true);
const html = user.html(content);
document.querySelector('#github-user').innerHTML = `<style>${user.style}</style>${html}`;
</script>
```

* [.user](#GitHubUtils.user) : <code>object</code>
    * [.styles](#GitHubUtils.user.styles)
    * [.html(content)](#GitHubUtils.user.html) ⇒ <code>string</code>
    * [.generateContent(content, [fetch])](#GitHubUtils.user.generateContent) ⇒ <code>GitHubUserHTML</code>
    * [.GitHubUserHTML](#GitHubUtils.user.GitHubUserHTML) : <code>Object</code>

<a name="GitHubUtils.user.styles"></a>

#### user.styles
GitHub user styles

**Kind**: static property of [<code>user</code>](#GitHubUtils.user)  
<a name="GitHubUtils.user.html"></a>

#### user.html(content) ⇒ <code>string</code>
Generates an HTML string for a GitHub user profile.

**Kind**: static method of [<code>user</code>](#GitHubUtils.user)  
**Returns**: <code>string</code> - HTML string  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>GitHubUserHTML</code> | a content object representing a GitHub user |

<a name="GitHubUtils.user.generateContent"></a>

#### user.generateContent(content, [fetch]) ⇒ <code>GitHubUserHTML</code>
Generates an object of content for the repository HTML

**Kind**: static method of [<code>user</code>](#GitHubUtils.user)  
**Returns**: <code>GitHubUserHTML</code> - content ready for HTML, possibly includes fetched content  

| Param | Type |
| --- | --- |
| content | <code>GitHubUserHTML</code> | 
| [fetch] | <code>boolean</code> | 

<a name="GitHubUtils.user.GitHubUserHTML"></a>

#### user.GitHubUserHTML : <code>Object</code>
Content needed to render a GitHub user. This is a subset of the `users` endpoint response

**Kind**: static typedef of [<code>user</code>](#GitHubUtils.user)  
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

