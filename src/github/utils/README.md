# GitHub profile components' utilities

## Modules

<dl>
<dt><a href="#module_Fixtures">Fixtures</a></dt>
<dd><p>Utility functions for generating fixtures for GitHub data</p>
</dd>
<dt><a href="#module_GitHub-Utilities">GitHub-Utilities</a></dt>
<dd><p>Utility functions for fetching and parsing GitHub data</p>
</dd>
<dt><a href="#module_Primer-Utilities">Primer-Utilities</a></dt>
<dd><p>Primer design system utilities for GitHub web components</p>
</dd>
<dt><a href="#module_Testing">Testing</a></dt>
<dd><p>Utility functions used for testing and prototyping components</p>
</dd>
</dl>

<a name="module_Fixtures"></a>

## Fixtures
Utility functions for generating fixtures for GitHub data

**Author**: @scottnath  

* [Fixtures](#module_Fixtures)
    * [.generateFixtureRepo](#module_Fixtures.generateFixtureRepo)
    * [.generateFixtureUser](#module_Fixtures.generateFixtureUser)
    * [.generateFixtures](#module_Fixtures.generateFixtures)

<a name="module_Fixtures.generateFixtureRepo"></a>

### fixtures.generateFixtureRepo
Generate a fixture for a GitHub repository and write it to a JSON file

**Kind**: static constant of [<code>Fixtures</code>](#module_Fixtures)  

| Param | Type | Description |
| --- | --- | --- |
| full_name | <code>string</code> | repo full name, as in `scottnath/profile-components` |

<a name="module_Fixtures.generateFixtureUser"></a>

### fixtures.generateFixtureUser
Generate a fixture for a GitHub user and write it to a JSON file

**Kind**: static constant of [<code>Fixtures</code>](#module_Fixtures)  

| Param | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | GitHub user login |

<a name="module_Fixtures.generateFixtures"></a>

### fixtures.generateFixtures
Generate fixtures for a set of GitHub repositories and users

**Kind**: static constant of [<code>Fixtures</code>](#module_Fixtures)  
<a name="module_GitHub-Utilities"></a>

## GitHub-Utilities
Utility functions for fetching and parsing GitHub data

**Author**: @scottnath  

* [GitHub-Utilities](#module_GitHub-Utilities)
    * [.fetchUser(username)](#module_GitHub-Utilities.fetchUser) ⇒ <code>Object</code>
    * [.parseFetchedUser(user)](#module_GitHub-Utilities.parseFetchedUser) ⇒ <code>GitHubUser</code>
    * [.fetchRepo(full_name)](#module_GitHub-Utilities.fetchRepo) ⇒ <code>Object</code>
    * [.parseFetchedRepo(repo)](#module_GitHub-Utilities.parseFetchedRepo) ⇒ <code>GitHubRepository</code>
    * [~GitHubUser](#module_GitHub-Utilities..GitHubUser) : <code>Object</code>
    * [~GitHubRepository](#module_GitHub-Utilities..GitHubRepository) : <code>Object</code>

<a name="module_GitHub-Utilities.fetchUser"></a>

### githubUtils.fetchUser(username) ⇒ <code>Object</code>
Fetch a user from

**Kind**: static method of [<code>GitHub-Utilities</code>](#module_GitHub-Utilities)  
**Returns**: <code>Object</code> - response status 200:  user; else {Object} error  
**See**: https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-a-user  

| Param | Type |
| --- | --- |
| username | <code>string</code> | 

<a name="module_GitHub-Utilities.parseFetchedUser"></a>

### githubUtils.parseFetchedUser(user) ⇒ <code>GitHubUser</code>
Parse a GitHub user from the `user` endpoint response down to 
 only the data required for the user component

**Kind**: static method of [<code>GitHub-Utilities</code>](#module_GitHub-Utilities)  
**Returns**: <code>GitHubUser</code> - component-ready user object  

| Param | Type |
| --- | --- |
| user | <code>Object</code> | 

<a name="module_GitHub-Utilities.fetchRepo"></a>

### githubUtils.fetchRepo(full_name) ⇒ <code>Object</code>
Fetch a GitHub repository's content from the GitHub api

**Kind**: static method of [<code>GitHub-Utilities</code>](#module_GitHub-Utilities)  
**Returns**: <code>Object</code> - response status 200:  repo; else {Object} error  
**See**: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#get-a-repository  

| Param | Type |
| --- | --- |
| full_name | <code>string</code> | 

<a name="module_GitHub-Utilities.parseFetchedRepo"></a>

### githubUtils.parseFetchedRepo(repo) ⇒ <code>GitHubRepository</code>
Parse a GitHub repository from the `repos` endpoint response down to 
 only the data required for the repository component

**Kind**: static method of [<code>GitHub-Utilities</code>](#module_GitHub-Utilities)  

| Param | Type |
| --- | --- |
| repo | <code>Object</code> | 

<a name="module_GitHub-Utilities..GitHubUser"></a>

### GitHub-Utilities~GitHubUser : <code>Object</code>
Content needed to render a GitHub user. This is a subset of the `users` endpoint response

**Kind**: inner typedef of [<code>GitHub-Utilities</code>](#module_GitHub-Utilities)  
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

<a name="module_GitHub-Utilities..GitHubRepository"></a>

### GitHub-Utilities~GitHubRepository : <code>Object</code>
Content needed to render a GitHub repository. This is a subset of the `repos` endpoint response

**Kind**: inner typedef of [<code>GitHub-Utilities</code>](#module_GitHub-Utilities)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| itemprop | <code>string</code> | Itemprop content to go on itemscope |
| full_name | <code>string</code> | repository org and name, as in `scottnath/profile-components` |
| [name] | <code>string</code> | repo name |
| [org] | <code>string</code> | repo owner organization's login, found at `<REST_RESPONSE>.organization.login` |
| [description] | <code>string</code> | repo description |
| [language] | <code>string</code> | programming language used in repo |
| [stargazers_count] | <code>string</code> | number of stars |
| [forks_count] | <code>string</code> | number of forks |
| [subscribers_count] | <code>string</code> | number of watchers |

<a name="module_Primer-Utilities"></a>

## Primer-Utilities
Primer design system utilities for GitHub web components

**Author**: @scottnath  

* [Primer-Utilities](#module_Primer-Utilities)
    * [.getGithubData](#module_Primer-Utilities.getGithubData) ⇒
    * [.getLangColorsSource](#module_Primer-Utilities.getLangColorsSource) ⇒
    * [.getPrimerCss](#module_Primer-Utilities.getPrimerCss) ⇒ <code>string</code>
    * [.writePrimerCssFile](#module_Primer-Utilities.writePrimerCssFile)
    * [~svgs](#module_Primer-Utilities..svgs)
    * [~svgCircle](#module_Primer-Utilities..svgCircle)
    * [~getLangCss()](#module_Primer-Utilities..getLangCss) ⇒
    * [~svgUrlCss(name, svg)](#module_Primer-Utilities..svgUrlCss) ⇒
    * [~octiconSvg(name)](#module_Primer-Utilities..octiconSvg) ⇒
    * [~getSvgCss()](#module_Primer-Utilities..getSvgCss) ⇒
    * [~globalStyles()](#module_Primer-Utilities..globalStyles) ⇒ <code>string</code>
    * [~getThemeColors(colors)](#module_Primer-Utilities..getThemeColors) ⇒ <code>string</code>
    * [~getTheme(theme)](#module_Primer-Utilities..getTheme) ⇒ <code>string</code>

<a name="module_Primer-Utilities.getGithubData"></a>

### primerUtils.getGithubData ⇒
Fetches and processes statistical data from GitHut's tool. Reduces the
 data to the top 30 languages with the most pull requests in the last quarter

**Kind**: static constant of [<code>Primer-Utilities</code>](#module_Primer-Utilities)  
**Returns**: set of strings which are the names of the top 30 languages  
**See**: https://madnight.github.io/githut  

| Param | Type |
| --- | --- |
| filename | <code>string</code> | 

<a name="module_Primer-Utilities.getLangColorsSource"></a>

### primerUtils.getLangColorsSource ⇒
Fetches the source file for GitHub's language colors and parses it into an object

**Kind**: static constant of [<code>Primer-Utilities</code>](#module_Primer-Utilities)  
**Returns**: an object of Linguist language data  
**See**: https://github.com/github-linguist/linguist  
<a name="module_Primer-Utilities.getPrimerCss"></a>

### primerUtils.getPrimerCss ⇒ <code>string</code>
Get global and theme-specific primer styles needed for GitHub web components

**Kind**: static constant of [<code>Primer-Utilities</code>](#module_Primer-Utilities)  
**Returns**: <code>string</code> - primer theme color variables  
<a name="module_Primer-Utilities.writePrimerCssFile"></a>

### primerUtils.writePrimerCssFile
Write primer css file to styles directory

**Kind**: static constant of [<code>Primer-Utilities</code>](#module_Primer-Utilities)  
<a name="module_Primer-Utilities..svgs"></a>

### Primer-Utilities~svgs
List of octicon names for SVGs needed for the primer CSS

**Kind**: inner constant of [<code>Primer-Utilities</code>](#module_Primer-Utilities)  
<a name="module_Primer-Utilities..svgCircle"></a>

### Primer-Utilities~svgCircle
Circle SVG for language color

**Kind**: inner constant of [<code>Primer-Utilities</code>](#module_Primer-Utilities)  
<a name="module_Primer-Utilities..getLangCss"></a>

### Primer-Utilities~getLangCss() ⇒
Generates CSS for GitHub language colors

**Kind**: inner method of [<code>Primer-Utilities</code>](#module_Primer-Utilities)  
**Returns**: CSS for GitHub language colors  
<a name="module_Primer-Utilities..svgUrlCss"></a>

### Primer-Utilities~svgUrlCss(name, svg) ⇒
Generates a CSS variable for an svg

**Kind**: inner method of [<code>Primer-Utilities</code>](#module_Primer-Utilities)  
**Returns**: CSS variable for svg  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | svg name |
| svg | <code>string</code> | svg element string |

<a name="module_Primer-Utilities..octiconSvg"></a>

### Primer-Utilities~octiconSvg(name) ⇒
Get CSS variable for an octicon svg

**Kind**: inner method of [<code>Primer-Utilities</code>](#module_Primer-Utilities)  
**Returns**: a CSS variable for an octicon svg  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | octicon name |

<a name="module_Primer-Utilities..getSvgCss"></a>

### Primer-Utilities~getSvgCss() ⇒
Generates CSS for SVGs

**Kind**: inner method of [<code>Primer-Utilities</code>](#module_Primer-Utilities)  
**Returns**: CSS for SVGs  
<a name="module_Primer-Utilities..globalStyles"></a>

### Primer-Utilities~globalStyles() ⇒ <code>string</code>
Get global primer styles needed for GitHub web components

**Kind**: inner method of [<code>Primer-Utilities</code>](#module_Primer-Utilities)  
**Returns**: <code>string</code> - global primer style variables  
<a name="module_Primer-Utilities..getThemeColors"></a>

### Primer-Utilities~getThemeColors(colors) ⇒ <code>string</code>
Get theme colors of a primer theme

**Kind**: inner method of [<code>Primer-Utilities</code>](#module_Primer-Utilities)  
**Returns**: <code>string</code> - primer theme colors  

| Param | Type | Description |
| --- | --- | --- |
| colors | <code>object</code> | primer theme colors |

<a name="module_Primer-Utilities..getTheme"></a>

### Primer-Utilities~getTheme(theme) ⇒ <code>string</code>
Generate CSS for one primer theme

**Kind**: inner method of [<code>Primer-Utilities</code>](#module_Primer-Utilities)  
**Returns**: <code>string</code> - primer theme color variables  

| Param | Type | Description |
| --- | --- | --- |
| theme | <code>string</code> | name of primer theme |

<a name="module_Testing"></a>

## Testing
Utility functions used for testing and prototyping components

**Author**: @scottnath  
<a name="module_Testing.generateMockResponse"></a>

### testing.generateMockResponse ⇒
Generate a mock github api response

**Kind**: static constant of [<code>Testing</code>](#module_Testing)  
**Returns**: mock response object  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>GitHubRepository</code> \| <code>GitHubUser</code> | mock return data |
| type | <code>string</code> | 'users' or 'repos' |
| status | <code>number</code> | 200 or 404 |

