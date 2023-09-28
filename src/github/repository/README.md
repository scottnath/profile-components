# GitHub repository details component

## Modules

<dl>
<dt><a href="#module_GitHub-Repo-Utilities">GitHub-Repo-Utilities</a></dt>
<dd><p>Utility functions for fetching and parsing GitHub Repository data</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#GitHubRepository">GitHubRepository</a></dt>
<dd><p>GitHub repository web component</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#componentStyles">componentStyles</a></dt>
<dd><p>Styles for the component, imported during development, inlined during build</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#repository">repository(content)</a> ⇒ <code>string</code></dt>
<dd><p>GitHub repository HTML generation</p>
</dd>
</dl>

<a name="module_GitHub-Repo-Utilities"></a>

## GitHub-Repo-Utilities
Utility functions for fetching and parsing GitHub Repository data

**Author**: @scottnath  

* [GitHub-Repo-Utilities](#module_GitHub-Repo-Utilities)
    * [.fetchRepo(full_name)](#module_GitHub-Repo-Utilities.fetchRepo) ⇒ <code>Object</code>
    * [.parseFetchedRepo(repo)](#module_GitHub-Repo-Utilities.parseFetchedRepo) ⇒ <code>GitHubRepositoryHTML</code>
    * [.cleanRepoContent(content, [no_org])](#module_GitHub-Repo-Utilities.cleanRepoContent) ⇒ <code>GitHubRepositoryHTML</code>
    * [.generateRepoContent(content, [fetch], [no_org])](#module_GitHub-Repo-Utilities.generateRepoContent) ⇒ <code>GitHubRepositoryHTML</code>
    * [~GitHubRepositoryHTML](#module_GitHub-Repo-Utilities..GitHubRepositoryHTML) : <code>Object</code>

<a name="module_GitHub-Repo-Utilities.fetchRepo"></a>

### githubRepoUtils.fetchRepo(full_name) ⇒ <code>Object</code>
Fetch a GitHub repository's content from the GitHub api

**Kind**: static method of [<code>GitHub-Repo-Utilities</code>](#module_GitHub-Repo-Utilities)  
**Returns**: <code>Object</code> - response status 200:  repo; else {Object} error  
**See**: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#get-a-repository  

| Param | Type |
| --- | --- |
| full_name | <code>string</code> | 

<a name="module_GitHub-Repo-Utilities.parseFetchedRepo"></a>

### githubRepoUtils.parseFetchedRepo(repo) ⇒ <code>GitHubRepositoryHTML</code>
Parse a GitHub repository's content. This is a reducer on the endpoint response, 
 but generally reduces any object to just the data required for the repo component HTML

**Kind**: static method of [<code>GitHub-Repo-Utilities</code>](#module_GitHub-Repo-Utilities)  

| Param | Type | Description |
| --- | --- | --- |
| repo | <code>Object</code> | GitHub repository object |

<a name="module_GitHub-Repo-Utilities.cleanRepoContent"></a>

### githubRepoUtils.cleanRepoContent(content, [no_org]) ⇒ <code>GitHubRepositoryHTML</code>
Parses and cleans repository content to match what is expected by the repository HTML

**Kind**: static method of [<code>GitHub-Repo-Utilities</code>](#module_GitHub-Repo-Utilities)  
**Returns**: <code>GitHubRepositoryHTML</code> - ready for HTML content  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>GitHubRepositoryHTML</code> | a content object either from component or GitHub API |
| [no_org] | <code>boolean</code> | if true, remove the `org` attribute from the returned object |

<a name="module_GitHub-Repo-Utilities.generateRepoContent"></a>

### githubRepoUtils.generateRepoContent(content, [fetch], [no_org]) ⇒ <code>GitHubRepositoryHTML</code>
Generates an object of content for the repository HTML

**Kind**: static method of [<code>GitHub-Repo-Utilities</code>](#module_GitHub-Repo-Utilities)  
**Returns**: <code>GitHubRepositoryHTML</code> - content ready for HTML, possibly includes fetched content  

| Param | Type |
| --- | --- |
| content | <code>GitHubRepositoryHTML</code> | 
| [fetch] | <code>boolean</code> | 
| [no_org] | <code>boolean</code> | 

<a name="module_GitHub-Repo-Utilities..GitHubRepositoryHTML"></a>

### GitHub-Repo-Utilities~GitHubRepositoryHTML : <code>Object</code>
Content needed to render a GitHub repository. This is a subset of the `repos` endpoint response

**Kind**: inner typedef of [<code>GitHub-Repo-Utilities</code>](#module_GitHub-Repo-Utilities)  
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

<a name="GitHubRepository"></a>

## GitHubRepository
GitHub repository web component

**Kind**: global variable  
**Summary**: Native web component which shows a GitHub repository's content. Can use local data, 
 fetch data from the GitHub rest API, or use a combination of both.  
**Element**: github-repository  
**See**: https://docs.github.com/en/rest/repos/repos#get-a-repository  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| full_name | <code>string</code> | repository org and name, as in `scottnath/profile-components` |
| [name] | <code>string</code> | repo name |
| [org] | <code>string</code> | repo owner organization's login, found at `<REST_RESPONSE>.organization.login` |
| [description] | <code>string</code> | repo description |
| [language] | <code>string</code> | programming language used in repo |
| [stargazers_count] | <code>string</code> | number of stars |
| [forks_count] | <code>string</code> | number of forks |
| [subscribers_count] | <code>string</code> | number of watchers |
| [fetch] | <code>boolean</code> | when true, fetches repo from GitHub api |
| [itemprop] | <code>string</code> | Itemprop content to go with a containing component's itemscope |
| [no_org] | <code>string</code> | Do not include the repo owner or organization |

**Example**  
```js
<github-repository full_name="scottnath/profile-components" fetch="true"></github-repository>
```
<a name="componentStyles"></a>

## componentStyles
Styles for the component, imported during development, inlined during build

**Kind**: global constant  
<a name="repository"></a>

## repository(content) ⇒ <code>string</code>
GitHub repository HTML generation

**Kind**: global function  
**Returns**: <code>string</code> - HTML which represents a GitHub repository  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>GitHubRepositoryHTML</code> | content needed to render a GitHub repository |

