/**
 * @fileoverview Content from Primer's storybook preview.js
 * @see https://github.com/primer/css/blob/main/docs/.storybook/preview.js
 */

/**
 * Primer themes
 * 
 */
export const primerThemes = [
  {value: 'light', left: '☀️', title: 'Light'},
  {value: 'light_colorblind', left: '☀️', title: 'Light Protanopia & Deuteranopia'},
  {value: 'light_tritanopia', left: '☀️', title: 'Light Tritanopia'},
  {value: 'light_high_contrast', left: '☀️', title: 'Light High Contrast'},
  {value: 'dark', left: '🌗', title: 'Dark'},
  {value: 'dark_dimmed', left: '🌗', title: 'Dark Dimmed'},
  {value: 'dark_colorblind', left: '🌗', title: 'Dark Protanopia & Deuteranopia'},
  {value: 'dark_tritanopia', left: '🌗', title: 'Dark Tritanopia'},
  {value: 'dark_high_contrast', left: '🌗', title: 'Dark High Contrast'},
];

/**
 * Toolbar configuration to add Primer themes to Storybook
 */
export const globalTypesPrimer = {
  theme: {
    name: 'Theme',
    description: 'Switch themes',
    defaultValue: 'light',
    toolbar: {
      icon: 'contrast',
      items: [{value: '', left: '', title: 'None'}, ...primerThemes],
      showName: true,
      dynamicTitle: true,
    },
  },
}

/**
 * Adds current theme to the `args` in Storybook
 */
export const decoratorsPrimer = [
  (Story, context) => {
    const theme = context.globals.theme;
    context.args['data-theme'] = theme;
    return Story();
  },
]