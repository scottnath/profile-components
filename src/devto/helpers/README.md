# DEV profile components' helpers

## Modules

<dl>
<dt><a href="#module_Forem-Utilities">Forem-Utilities</a></dt>
<dd><p>Forem utilities to generate assets for dev.to web components</p>
</dd>
<dt><a href="#module_Testing">Testing</a></dt>
<dd><p>Utility functions used for testing and prototyping components</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#getApiUrl">getApiUrl(api)</a> ⇒ <code>string</code></dt>
<dd><p>Get the API url, whether dev.to or forem.dev</p>
</dd>
<dt><a href="#formatDate">formatDate(dt)</a> ⇒ <code>string</code></dt>
<dd><p>Format a date for machine-readability</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ForemError">ForemError</a> : <code>Object</code></dt>
<dd><p>Content in an error response from the dev.to (or Forem) API</p>
</dd>
</dl>

<a name="module_Forem-Utilities"></a>

## Forem-Utilities
Forem utilities to generate assets for dev.to web components

**Author**: @scottnath  

* [Forem-Utilities](#module_Forem-Utilities)
    * [.getForemCSS](#module_Forem-Utilities.getForemCSS) ⇒ <code>string</code>
    * [.getOneVarStyle](#module_Forem-Utilities.getOneVarStyle) ⇒
    * [.getOneStyle](#module_Forem-Utilities.getOneStyle) ⇒
    * [.getDevStyleVariables](#module_Forem-Utilities.getDevStyleVariables) ⇒ <code>Array.&lt;Array.&lt;string&gt;&gt;</code>
    * [.getDevCss](#module_Forem-Utilities.getDevCss) ⇒ <code>string</code>
    * [.writeDevCssFile](#module_Forem-Utilities.writeDevCssFile)
    * [~generatedFile](#module_Forem-Utilities..generatedFile)
    * [~foremRawSource](#module_Forem-Utilities..foremRawSource)
    * [~copiedStyles](#module_Forem-Utilities..copiedStyles) : <code>Array.&lt;string&gt;</code>

<a name="module_Forem-Utilities.getForemCSS"></a>

### foremUtils.getForemCSS ⇒ <code>string</code>
Get Forem CSS file's contents

**Kind**: static constant of [<code>Forem-Utilities</code>](#module_Forem-Utilities)  
**Returns**: <code>string</code> - contents of css file from Forem repo  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>string</code> | css file name |

<a name="module_Forem-Utilities.getOneVarStyle"></a>

### foremUtils.getOneVarStyle ⇒
Get one CSS variable's dependent variable

**Kind**: static constant of [<code>Forem-Utilities</code>](#module_Forem-Utilities)  
**Returns**: a css variable and its value as a string  

| Param | Type | Description |
| --- | --- | --- |
| style | <code>string</code> | a CSS variable |
| css | <code>string</code> | a css file converted to a string |

<a name="module_Forem-Utilities.getOneStyle"></a>

### foremUtils.getOneStyle ⇒
Get one CSS variable

**Kind**: static constant of [<code>Forem-Utilities</code>](#module_Forem-Utilities)  
**Returns**: a css variable and its value as a string  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | a CSS variable name |
| css | <code>string</code> | a css file converted to a string |

<a name="module_Forem-Utilities.getDevStyleVariables"></a>

### foremUtils.getDevStyleVariables ⇒ <code>Array.&lt;Array.&lt;string&gt;&gt;</code>
Generates a set of dev.to/forem style variables

**Kind**: static constant of [<code>Forem-Utilities</code>](#module_Forem-Utilities)  
**Returns**: <code>Array.&lt;Array.&lt;string&gt;&gt;</code> - a set of arrays of CSS variables  
<a name="module_Forem-Utilities.getDevCss"></a>

### foremUtils.getDevCss ⇒ <code>string</code>
Get global and theme-specific styles needed for DEV web components

**Kind**: static constant of [<code>Forem-Utilities</code>](#module_Forem-Utilities)  
**Returns**: <code>string</code> - DEV css variables as one string  
<a name="module_Forem-Utilities.writeDevCssFile"></a>

### foremUtils.writeDevCssFile
Write DEV css file to repo directory

**Kind**: static constant of [<code>Forem-Utilities</code>](#module_Forem-Utilities)  
<a name="module_Forem-Utilities..generatedFile"></a>

### Forem-Utilities~generatedFile
Output file

**Kind**: inner constant of [<code>Forem-Utilities</code>](#module_Forem-Utilities)  
<a name="module_Forem-Utilities..foremRawSource"></a>

### Forem-Utilities~foremRawSource
Forem CSS file source directory

**Kind**: inner constant of [<code>Forem-Utilities</code>](#module_Forem-Utilities)  
<a name="module_Forem-Utilities..copiedStyles"></a>

### Forem-Utilities~copiedStyles : <code>Array.&lt;string&gt;</code>
Styles that are hard to regex and SVGs

**Kind**: inner constant of [<code>Forem-Utilities</code>](#module_Forem-Utilities)  
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
| content | <code>ForemPost</code> \| <code>ForemUser</code> | mock return data |
| type | <code>string</code> | 'users' or 'article' |
| status | <code>number</code> | 200 or 404 |

<a name="getApiUrl"></a>

## getApiUrl(api) ⇒ <code>string</code>
Get the API url, whether dev.to or forem.dev

**Kind**: global function  
**Returns**: <code>string</code> - - url root for the API  

| Param | Type | Description |
| --- | --- | --- |
| api | <code>string</code> | 'devto' or 'forem' |

<a name="formatDate"></a>

## formatDate(dt) ⇒ <code>string</code>
Format a date for machine-readability

**Kind**: global function  
**Returns**: <code>string</code> - - the machine-readable value of the date  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>string</code> | a date string |

<a name="ForemError"></a>

## ForemError : <code>Object</code>
Content in an error response from the dev.to (or Forem) API

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| status | <code>number</code> | response status code |
| error | <code>string</code> | error message |

