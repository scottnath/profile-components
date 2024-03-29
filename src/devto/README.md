<center><img src="./devto-unofficial-logo.png" alt="Unofficial DEV component" /></center>

# DEV profile components

Includes two web components:

* `<devto-user>` - displays information about a DEV user, includes `<devto-post>`
* `<devto-post>` - displays information about a DEV post

see README at root of repo for usage details

## api

* https://developers.forem.com/api/v0#tag/articles

## @todo

- [ ] re-do `parts`, removing parts that are just for style-sharing
- [ ] interaction tests
- [ ] a11y testing
- [ ] test in plain HTML page
- [ ] conform to https://dev.to/brand

---

<a name="DEVUtils"></a>

## DEVUtils : <code>object</code>
Utility functions for fetching and parsing dev.to api data, getting
 styles and generating HTML for dev.to profile UIs

**Kind**: global namespace  
**Author**: @scottnath  

* [DEVUtils](#DEVUtils) : <code>object</code>
    * [.post](#DEVUtils.post) : <code>object</code>
        * [.dsd](#DEVUtils.post.dsd) ⇒ <code>string</code>
        * [.html(content)](#DEVUtils.post.html) ⇒ <code>string</code>
        * [.generateContent(content, [fetch])](#DEVUtils.post.generateContent) ⇒ <code>ForemPost</code> \| <code>ForemError</code>
        * [.ForemPost](#DEVUtils.post.ForemPost) : <code>Object</code>
        * [.ForemPostHTML](#DEVUtils.post.ForemPostHTML) : <code>ForemPost</code>
    * [.user](#DEVUtils.user) : <code>object</code>
        * [.styles](#DEVUtils.user.styles)
        * [.html(content)](#DEVUtils.user.html) ⇒ <code>string</code>
        * [.generateContent(content, [fetch])](#DEVUtils.user.generateContent) ⇒ <code>ForemUserHTML</code>
        * [.dsd(content, fetch)](#DEVUtils.user.dsd) ⇒ <code>string</code>
        * [.ForemUser](#DEVUtils.user.ForemUser) : <code>Object</code>
        * [.ForemUserHTML](#DEVUtils.user.ForemUserHTML) : <code>ForemUser</code>

<a name="DEVUtils.post"></a>

### devUtils.post : <code>object</code>
Utility functions for a post

**Kind**: static namespace of [<code>DEVUtils</code>](#DEVUtils)  

* [.post](#DEVUtils.post) : <code>object</code>
    * [.dsd](#DEVUtils.post.dsd) ⇒ <code>string</code>
    * [.html(content)](#DEVUtils.post.html) ⇒ <code>string</code>
    * [.generateContent(content, [fetch])](#DEVUtils.post.generateContent) ⇒ <code>ForemPost</code> \| <code>ForemError</code>
    * [.ForemPost](#DEVUtils.post.ForemPost) : <code>Object</code>
    * [.ForemPostHTML](#DEVUtils.post.ForemPostHTML) : <code>ForemPost</code>

<a name="DEVUtils.post.dsd"></a>

#### post.dsd ⇒ <code>string</code>
Generate a `template` element with a shadowdom with a Post in it

**Kind**: static namespace of [<code>post</code>](#DEVUtils.post)  
**Returns**: <code>string</code> - DEV post HTML wrapped in a `template`  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>ForemPostHTML</code> | Content about one post by dev.to (or Forem) user |
| fetch | <code>boolean</code> |  |

**Example** *(Server side rendering a post with Declarative Shadow Dom)*  
```js
<devto-post></devto-post>

<script type="module">
import {post} from 'profile-components/devto-utils';
const dsdHTML = post.dsd({id: '12345'}, true);
document.querySelector('devto-post').innerHTML = dsdHTML;
</script>
```
<a name="DEVUtils.post.html"></a>

#### post.html(content) ⇒ <code>string</code>
dev.to (or forem.dev) post HTML generation

**Kind**: static method of [<code>post</code>](#DEVUtils.post)  
**Returns**: <code>string</code> - HTML string with added content  

| Param | Type |
| --- | --- |
| content | <code>ForemPostHTML</code> | 

<a name="DEVUtils.post.generateContent"></a>

#### post.generateContent(content, [fetch]) ⇒ <code>ForemPost</code> \| <code>ForemError</code>
Generates an object of content for the post HTML

**Kind**: static method of [<code>post</code>](#DEVUtils.post)  
**Returns**: <code>ForemPost</code> \| <code>ForemError</code> - content ready for HTML, possibly includes fetched content  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>ForemPost</code> |  |
| [fetch] | <code>boolean</code> | whether to fetch post content from the API |

<a name="DEVUtils.post.ForemPost"></a>

#### post.ForemPost : <code>Object</code>
Content about one post by dev.to (or Forem) user, sourced from a Forem API.

**Kind**: static typedef of [<code>post</code>](#DEVUtils.post)  
**See**: https://developers.forem.com/api/v1#tag/articles/operation/getLatestArticles  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| title | <code>string</code> | The title of the post |
| url | <code>string</code> | The URL of the post |
| cover_image | <code>string</code> | The URL of the post's full-size cover image |
| social_image | <code>string</code> | The URL of the post's social image |
| id | <code>number</code> | The ID of the post |

<a name="DEVUtils.post.ForemPostHTML"></a>

#### post.ForemPostHTML : <code>ForemPost</code>
Forem post content, ready for HTML

**Kind**: static typedef of [<code>post</code>](#DEVUtils.post)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [error] | <code>string</code> | An error message |

<a name="DEVUtils.user"></a>

### devUtils.user : <code>object</code>
Utility functions for a user

**Kind**: static namespace of [<code>DEVUtils</code>](#DEVUtils)  

* [.user](#DEVUtils.user) : <code>object</code>
    * [.styles](#DEVUtils.user.styles)
    * [.html(content)](#DEVUtils.user.html) ⇒ <code>string</code>
    * [.generateContent(content, [fetch])](#DEVUtils.user.generateContent) ⇒ <code>ForemUserHTML</code>
    * [.dsd(content, fetch)](#DEVUtils.user.dsd) ⇒ <code>string</code>
    * [.ForemUser](#DEVUtils.user.ForemUser) : <code>Object</code>
    * [.ForemUserHTML](#DEVUtils.user.ForemUserHTML) : <code>ForemUser</code>

<a name="DEVUtils.user.styles"></a>

#### user.styles
DEV UI styles

**Kind**: static property of [<code>user</code>](#DEVUtils.user)  
<a name="DEVUtils.user.html"></a>

#### user.html(content) ⇒ <code>string</code>
dev.to (or forem.dev) user HTML generation

**Kind**: static method of [<code>user</code>](#DEVUtils.user)  
**Returns**: <code>string</code> - HTML string with added content  

| Param | Type |
| --- | --- |
| content | <code>ForemUser</code> | 

<a name="DEVUtils.user.generateContent"></a>

#### user.generateContent(content, [fetch]) ⇒ <code>ForemUserHTML</code>
Generates an object of content for the user HTML

**Kind**: static method of [<code>user</code>](#DEVUtils.user)  
**Returns**: <code>ForemUserHTML</code> - content ready for HTML, possibly includes fetched content  

| Param | Type |
| --- | --- |
| content | <code>ForemUserHTML</code> | 
| [fetch] | <code>boolean</code> | 

<a name="DEVUtils.user.dsd"></a>

#### user.dsd(content, fetch) ⇒ <code>string</code>
Generate a `template` element with shadowrootmode with a User in it

**Kind**: static method of [<code>user</code>](#DEVUtils.user)  
**Returns**: <code>string</code> - DEV HTML wrapped in a `template`  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>ForemUserHTML</code> | a content object representing a DEV user |
| fetch | <code>boolean</code> |  |

**Example** *(Server side rendering with Declarative Shadow Dom)*  
```js
<devto-user></devto-user>

<script type="module">
import {dsd} from 'profile-components/devto-utils';
const dsdHTML = dsd({username: 'scottnath'}, true);
document.querySelector('devto-user').innerHTML = dsdHTML;
</script>
```
<a name="DEVUtils.user.ForemUser"></a>

#### user.ForemUser : <code>Object</code>
Content about a dev.to (or Forem) user, sourced from the Forem API and combined with post data.
Only required properties from the api are defined.

**Kind**: static typedef of [<code>user</code>](#DEVUtils.user)  
**See**: https://developers.forem.com/api/v0#tag/users/operation/getUser  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | The username of the user |
| name | <code>string</code> | The name of the user |
| summary | <code>string</code> | The user's bio |
| joined_at | <code>string</code> | The date the user joined |
| profile_image | <code>string</code> | The URL of the user's profile image |

<a name="DEVUtils.user.ForemUserHTML"></a>

#### user.ForemUserHTML : <code>ForemUser</code>
**Kind**: static typedef of [<code>user</code>](#DEVUtils.user)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [error] | <code>string</code> | An error message |
| [post_count] | <code>number</code> | The number of posts the user has published |
| [latest_post] | <code>ForemPostHTML</code> | User's latest post |
| [popular_post] | <code>ForemPostHTML</code> | User's most popular post |




## Inspriation

- https://dev.to/asheeshh/devembed-embed-your-devto-profile-anywhere-using-widgets-linode-hacakathon-4659
- https://dev.to/saurabhdaware/i-made-dev-to-widget-for-websites-blogs-40p2