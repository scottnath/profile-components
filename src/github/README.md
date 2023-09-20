# GitHub profile components

Includes two web components:

* `<github-repository>` - displays information about a GitHub repository
* `<github-user>` - displays information about a GitHub user, includes `<github-repository>`

## @todo

- [ ] add process.env option to include github token for local development

## User

### Demo

https://stackblitz.com/edit/profile-components

### Usage

#### import the component from unpkg
```html
<script type="module" src="https://unpkg.com/@scottnath/profile-components"></script>
```

#### use the component
```html
<github-user username="scottnath" fetch="true"></github-user>
```

## Repository

### @todo

- [ ] repo language colors 
  - need to expand on the `getCircle` function to include the top X languages on GH
  - need a way to expand the available colors
  - @see https://github.com/github/personal-website/blob/ec99147d789ea3332274857d38aba8c3b5063ae5/_data/colors.json#L1199
- octicons 
  - create script to generate local svgs with aria-label
  - should be added into .js by esbuild
  - @see https://github.com/primer/octicons/blob/main/package.json

## @futureFeatures

### GitHub contribution graph

Might could incorporate into `<github-user>` component

- [ ] graph contrib: https://github.com/enpitsuLin/wc-github-graph/blob/master/src/github-graph.ts