# Dev post component

## Modules

<dl>
<dt><a href="#module_DevTo-Post-Utilities">DevTo-Post-Utilities</a></dt>
<dd><p>Utility functions for fetching and parsing post data</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#DevtoPost">DevtoPost</a></dt>
<dd><p>dev.to (or forem.dev) post web component</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#post">post(content)</a> ⇒ <code>string</code></dt>
<dd><p>dev.to (or forem.dev) post HTML generation</p>
</dd>
</dl>

<a name="module_DevTo-Post-Utilities"></a>

## DevTo-Post-Utilities
Utility functions for fetching and parsing post data

**Author**: @scottnath  

* [DevTo-Post-Utilities](#module_DevTo-Post-Utilities)
    * [.findPost](#module_DevTo-Post-Utilities.findPost) ⇒ <code>ForemPost</code>
    * [.cleanPostContent](#module_DevTo-Post-Utilities.cleanPostContent) ⇒ <code>ForemPost</code> \| <code>ForemError</code>
    * [.fetchPost(id)](#module_DevTo-Post-Utilities.fetchPost) ⇒ <code>Object</code>
    * [.parseFetchedPost(post)](#module_DevTo-Post-Utilities.parseFetchedPost) ⇒ <code>ForemPost</code>
    * [.generatePostContent(content, [fetch])](#module_DevTo-Post-Utilities.generatePostContent) ⇒ <code>ForemPost</code> \| <code>ForemError</code>
    * [~Fetch a users posts from the Forem API(username)](#module_DevTo-Post-Utilities..Fetch a users posts from the Forem API) ⇒ <code>Array.&lt;ForemPost&gt;</code>
    * [~ForemPost](#module_DevTo-Post-Utilities..ForemPost) : <code>Object</code>
    * [~ForemPostHTML](#module_DevTo-Post-Utilities..ForemPostHTML) : <code>ForemPost</code>

<a name="module_DevTo-Post-Utilities.findPost"></a>

### devtoPostUtils.findPost ⇒ <code>ForemPost</code>
Find a post in an array of posts

**Kind**: static constant of [<code>DevTo-Post-Utilities</code>](#module_DevTo-Post-Utilities)  
**Returns**: <code>ForemPost</code> - - post  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| posts | <code>Array.&lt;ForemPost&gt;</code> |  | array of posts |
| [type] | <code>string</code> | <code>&quot;&#x27;popular&#x27;&quot;</code> | type of post to find |

<a name="module_DevTo-Post-Utilities.cleanPostContent"></a>

### devtoPostUtils.cleanPostContent ⇒ <code>ForemPost</code> \| <code>ForemError</code>
Parses and confirms post content to match what is expected by the post HTML

**Kind**: static constant of [<code>DevTo-Post-Utilities</code>](#module_DevTo-Post-Utilities)  

| Param | Type |
| --- | --- |
| content | <code>ForemPost</code> | 

<a name="module_DevTo-Post-Utilities.fetchPost"></a>

### devtoPostUtils.fetchPost(id) ⇒ <code>Object</code>
Fetch a post from the dev.to (or Forem) API

**Kind**: static method of [<code>DevTo-Post-Utilities</code>](#module_DevTo-Post-Utilities)  
**Returns**: <code>Object</code> - response status 200: article; else status 404: error  
**See**: https://developers.forem.com/api/v0#tag/articles/operation/getArticleById  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | unique post identifier |

<a name="module_DevTo-Post-Utilities.parseFetchedPost"></a>

### devtoPostUtils.parseFetchedPost(post) ⇒ <code>ForemPost</code>
Parse a dev.to (or Forem) post's content. This is a reducer on the endpoint response, 
 but generally reduces any object to just the data required for the post component HTML

**Kind**: static method of [<code>DevTo-Post-Utilities</code>](#module_DevTo-Post-Utilities)  

| Param | Type | Description |
| --- | --- | --- |
| post | <code>Object</code> | post object |

<a name="module_DevTo-Post-Utilities.generatePostContent"></a>

### devtoPostUtils.generatePostContent(content, [fetch]) ⇒ <code>ForemPost</code> \| <code>ForemError</code>
Generates an object of content for the post HTML

**Kind**: static method of [<code>DevTo-Post-Utilities</code>](#module_DevTo-Post-Utilities)  
**Returns**: <code>ForemPost</code> \| <code>ForemError</code> - content ready for HTML, possibly includes fetched content  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>ForemPost</code> |  |
| [fetch] | <code>boolean</code> | whether to fetch post content from the API |

<a name="module_DevTo-Post-Utilities..Fetch a users posts from the Forem API"></a>

### DevTo-Post-Utilities~Fetch a users posts from the Forem API(username) ⇒ <code>Array.&lt;ForemPost&gt;</code>
**Kind**: inner method of [<code>DevTo-Post-Utilities</code>](#module_DevTo-Post-Utilities)  
**Returns**: <code>Array.&lt;ForemPost&gt;</code> - - An array of posts  

| Param | Type |
| --- | --- |
| username | <code>string</code> | 

<a name="module_DevTo-Post-Utilities..ForemPost"></a>

### DevTo-Post-Utilities~ForemPost : <code>Object</code>
Content about one post by dev.to (or Forem) user, sourced from a Forem API.

**Kind**: inner typedef of [<code>DevTo-Post-Utilities</code>](#module_DevTo-Post-Utilities)  
**See**: https://developers.forem.com/api/v1#tag/articles/operation/getLatestArticles  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| title | <code>string</code> | The title of the post |
| url | <code>string</code> | The URL of the post |
| cover_image | <code>string</code> | The URL of the post's full-size cover image |
| social_image | <code>string</code> | The URL of the post's social image |

<a name="module_DevTo-Post-Utilities..ForemPostHTML"></a>

### DevTo-Post-Utilities~ForemPostHTML : <code>ForemPost</code>
Forem post content, ready for HTML

**Kind**: inner typedef of [<code>DevTo-Post-Utilities</code>](#module_DevTo-Post-Utilities)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [error] | <code>string</code> | An error message |

<a name="DevtoPost"></a>

## DevtoPost
dev.to (or forem.dev) post web component

**Kind**: global variable  
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
| [fetch] | <code>boolean</code> | when true, fetches post from api |

**Example**  
```js
<devto-post id="123456" fetch="true"></devto-post>
```
<a name="post"></a>

## post(content) ⇒ <code>string</code>
dev.to (or forem.dev) post HTML generation

**Kind**: global function  
**Returns**: <code>string</code> - HTML string with added content  

| Param | Type |
| --- | --- |
| content | <code>ForemPostHTML</code> | 

