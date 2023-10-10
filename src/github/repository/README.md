# GitHub repository details component

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
| [name] | <code>string</code> | repo name |
| [org] | <code>string</code> | repo owner organization's login, found at `<REST_RESPONSE>.organization.login` |
| [description] | <code>string</code> | repo description |
| [language] | <code>string</code> | programming language used in repo |
| [stargazers_count] | <code>string</code> | number of stars |
| [forks_count] | <code>string</code> | number of forks |
| [subscribers_count] | <code>string</code> | number of watchers |
| [fetch] | <code>boolean</code> | when true, fetches repo from [GitHub api](https://docs.github.com/en/rest/repos/repos#get-a-repository) |
| [itemprop] | <code>string</code> | Itemprop content to go with a containing component's itemscope |
| [no_org] | <code>string</code> | Do not include the repo owner or organization |

**Example**  
```js
<!-- import the web component -->
<script type="module" src="https://unpkg.com/profile-components/dist/github-repository.js"></script>

<!-- use the custom element -->
<github-repository full_name="scottnath/profile-components" fetch="true"></github-repository>
```
