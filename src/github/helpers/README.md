# GitHub profile components' helpers

## Modules

<dl>
<dt><a href="#module_Fixtures">Fixtures</a></dt>
<dd><p>Utility functions for generating fixtures for GitHub data</p>
</dd>
<dt><a href="#module_Primer-Utilities">Primer-Utilities</a></dt>
<dd><p>Primer design system utilities to generate assets for GitHub web components</p>
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
<a name="module_Primer-Utilities"></a>

## Primer-Utilities
Primer design system utilities to generate assets for GitHub web components

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

### testing.generateMockResponse(content, type, status) ⇒
Generate a mock github api response

**Kind**: static method of [<code>Testing</code>](#module_Testing)  
**Returns**: mock response object  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>GitHubRepository</code> \| <code>GitHubUser</code> | mock return data |
| type | <code>string</code> | 'users' or 'repos' |
| status | <code>number</code> | 200 or 404 |

