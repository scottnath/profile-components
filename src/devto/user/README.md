# Dev user profile component

## Modules

<dl>
<dt><a href="#module_DEV-User-Utilities">DEV-User-Utilities</a></dt>
<dd><p>Utility functions for fetching and parsing user data</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#DevtoUser">DevtoUser</a></dt>
<dd><p>dev.to user profile web component</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#post">post(content)</a> ⇒ <code>string</code></dt>
<dd><p>dev.to (or forem.dev) user HTML generation</p>
</dd>
</dl>

<a name="module_DEV-User-Utilities"></a>

## DEV-User-Utilities
Utility functions for fetching and parsing user data

**Author**: @scottnath  

* [DEV-User-Utilities](#module_DEV-User-Utilities)
    * [.fetchUser(username, id)](#module_DEV-User-Utilities.fetchUser) ⇒ <code>ForemUser</code> \| <code>ForemError</code>
    * [.parseFetchedUser(user)](#module_DEV-User-Utilities.parseFetchedUser) ⇒ <code>ForemUserHTML</code>
    * [.cleanUserContent(content)](#module_DEV-User-Utilities.cleanUserContent) ⇒ <code>ForemUserHTML</code>
    * [.generateUserContent(content, [fetch])](#module_DEV-User-Utilities.generateUserContent) ⇒ <code>ForemUserHTML</code>
    * [~blankPng](#module_DEV-User-Utilities..blankPng)
    * [~ForemUser](#module_DEV-User-Utilities..ForemUser) : <code>Object</code>
    * [~ForemUserHTML](#module_DEV-User-Utilities..ForemUserHTML) : <code>ForemUser</code>

<a name="module_DEV-User-Utilities.fetchUser"></a>

### devUserUtils.fetchUser(username, id) ⇒ <code>ForemUser</code> \| <code>ForemError</code>
Fetch a user's data from the Forem API

**Kind**: static method of [<code>DEV-User-Utilities</code>](#module_DEV-User-Utilities)  
**Returns**: <code>ForemUser</code> \| <code>ForemError</code> - response status 200: article; else status 404: error  

| Param | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | The username of the user |
| id | <code>string</code> | the id of the user |

<a name="module_DEV-User-Utilities.parseFetchedUser"></a>

### devUserUtils.parseFetchedUser(user) ⇒ <code>ForemUserHTML</code>
Parse a dev.to (or Forem) user's content. This is a reducer on the endpoint response, 
 but generally reduces any object to just the data required for the user component HTML

**Kind**: static method of [<code>DEV-User-Utilities</code>](#module_DEV-User-Utilities)  

| Param | Type | Description |
| --- | --- | --- |
| user | <code>ForemUser</code> | user object |

<a name="module_DEV-User-Utilities.cleanUserContent"></a>

### devUserUtils.cleanUserContent(content) ⇒ <code>ForemUserHTML</code>
Parses and cleans user content to match what is expected by the user HTML

**Kind**: static method of [<code>DEV-User-Utilities</code>](#module_DEV-User-Utilities)  
**Returns**: <code>ForemUserHTML</code> - ready for HTML content  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>ForemUserHTML</code> | a content object representing a dev.to user |

<a name="module_DEV-User-Utilities.generateUserContent"></a>

### devUserUtils.generateUserContent(content, [fetch]) ⇒ <code>ForemUserHTML</code>
Generates an object of content for the user HTML

**Kind**: static method of [<code>DEV-User-Utilities</code>](#module_DEV-User-Utilities)  
**Returns**: <code>ForemUserHTML</code> - content ready for HTML, possibly includes fetched content  

| Param | Type |
| --- | --- |
| content | <code>ForemUserHTML</code> | 
| [fetch] | <code>boolean</code> | 

<a name="module_DEV-User-Utilities..blankPng"></a>

### DEV-User-Utilities~blankPng
Blank base64-encoded png

**Kind**: inner constant of [<code>DEV-User-Utilities</code>](#module_DEV-User-Utilities)  
**See**: https://png-pixel.com/  
<a name="module_DEV-User-Utilities..ForemUser"></a>

### DEV-User-Utilities~ForemUser : <code>Object</code>
Content about a dev.to (or Forem) user, sourced from the Forem API and combined with post data.
Only required properties from the api are defined.

**Kind**: inner typedef of [<code>DEV-User-Utilities</code>](#module_DEV-User-Utilities)  
**See**: https://developers.forem.com/api/v0#tag/users/operation/getUser  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | The username of the user |
| name | <code>string</code> | The name of the user |
| summary | <code>string</code> | The user's bio |
| joined_at | <code>string</code> | The date the user joined |
| profile_image | <code>string</code> | The URL of the user's profile image |

<a name="module_DEV-User-Utilities..ForemUserHTML"></a>

### DEV-User-Utilities~ForemUserHTML : <code>ForemUser</code>
**Kind**: inner typedef of [<code>DEV-User-Utilities</code>](#module_DEV-User-Utilities)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [error] | <code>string</code> | An error message |
| [post_count] | <code>number</code> | The number of posts the user has published |
| [latest_post] | <code>ForemPostHTML</code> | User's latest post |
| [popular_post] | <code>ForemPostHTML</code> | User's most popular post |

<a name="DevtoUser"></a>

## DevtoUser
dev.to user profile web component

**Kind**: global variable  
**Summary**: Native web component which shows a dev.to user's profile content. 
 Can use local data, or fetch data from the dev.to API, or use a combination of both.  
**Element**: devto-user  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | User's dev.to username |
| [name] | <code>string</code> | The name of the user |
| [summary] | <code>string</code> | The user's bio |
| [joined_at] | <code>string</code> | The date the user joined |
| [profile_image] | <code>string</code> | The URL of the user's profile image |
| [fetch] | <code>boolean</code> | when true, fetches user and posts from api |
| [post_count] | <code>number</code> | The number of posts the user has published |
| [latest_post] | <code>string</code> | User's latest post content, JSON stringified |
| [popular_post] | <code>string</code> | User's most popular post content, JSON stringified |

**Example**  
```js
<devto-user username="scottnath" fetch="true"></devto-user>
```
<a name="post"></a>

## post(content) ⇒ <code>string</code>
dev.to (or forem.dev) user HTML generation

**Kind**: global function  
**Returns**: <code>string</code> - HTML string with added content  

| Param | Type |
| --- | --- |
| content | <code>ForemUser</code> | 

