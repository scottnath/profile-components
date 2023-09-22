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
<script type="module" src="https://unpkg.com/profile-components/dist/github-user.js"></script>
```

#### use the component
```html
<github-user username="scottnath" fetch="true"></github-user>
```

## Repository

### Usage

#### import the component from unpkg
```html
<script type="module" src="https://unpkg.com/@scottnath/profile-components/dist/github-repository.js"></script>
```

#### use the component
```html
<github-repository full_name="scottnath/profile-components" fetch="true"></github-repository>
```

## Style Source

The best way to have the look n feel of an external site is to integrate their design language as much as possible. 

### Primer Design System

https://primer.style/design/

"`Primer is a set of guidelines, principles, and patterns for designing and building UI at GitHub.`"

Primer is the source for all of GitHub's root UI foundations (color text, and border-styles), iconography and basic UI patterns.

### Color themes

GitHub (from Primer) has two sets of light themes and two sets of dark themes. Check out [Primer's Storybook docs for colors](https://primer.style/design/foundations/css-utilities/colors) to play around with the colors and see the different themes.

* light: 'Light'
* light_colorblind: 'Light Protanopia & Deuteranopia'
* light_tritanopia: 'Light Tritanopia'
* light_high_contrast: 'Light High Contrast'
* dark: 'Dark'
* dark_dimmed: 'Dark Dimmed'
* dark_colorblind: 'Dark Protanopia & Deuteranopia'
* dark_tritanopia: 'Dark Tritanopia'
* dark_high_contrast: 'Dark High Contrast'

#### Primatives and iconography
These components are styled with variables generated from Primer's npm packages.

* [primer/primatives](https://github.com/primer/primitives) for colors, borders, and typography
* [primer/octicons](https://github.com/primer/octicons) is the source for all icons used on GitHub. [storybook docs for Octicons](https://primer.style/design/foundations/icons)

#### Auto-generated styles

CSS variables and svg icons are pulled from Primer's npm packages. The generated variables are used to style the components.