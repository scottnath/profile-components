/**
 * @fileoverview Content from Primer's storybook preview.js
 * @see https://github.com/primer/css/blob/main/docs/.storybook/preview.js
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
]

export const globalTypesPrimer = {
  theme: {
    name: 'Theme',
    description: 'Switch themes',
    defaultValue: 'light',
    toolbar: {
      icon: 'contrast',
      items: [...primerThemes, {value: 'all', left: '', title: 'All'}],
      showName: true,
      dynamicTitle: true,
    },
  },
}


export const decoratorsPrimer = [
  (Story, context) => {
    document.body.setAttribute('data-color-mode', context.globals.theme.startsWith('light') ? 'light' : 'dark')
    document.body.setAttribute(
      'data-light-theme',
      context.globals.theme.startsWith('light') ? context.globals.theme : undefined,
    )
    document.body.setAttribute(
      'data-dark-theme',
      context.globals.theme.startsWith('dark') ? context.globals.theme : undefined,
    )
    return Story();
  },
]