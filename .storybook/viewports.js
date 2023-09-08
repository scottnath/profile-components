// .storybook/preview.js

import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

export const customViewports = {
  container200: {
    name: 'Container 200px',
    styles: {
      width: '200px',
      height: '100%',
    },
  },
  container300: {
    name: 'Container 300px',
    styles: {
      width: '300px',
      height: '100%',
    },
  },
};

export const viewports ={
  ...MINIMAL_VIEWPORTS,
  ...customViewports,
};