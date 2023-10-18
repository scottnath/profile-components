// .storybook/preview.js

import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

export const customViewports = {
  containerMin1: {
    name: 'ContainerMin1: 200px',
    styles: {
      width: '200px',
      height: '100%',
    },
  },
  containerMin2: {
    name: 'ContainerMin2: 300px',
    styles: {
      width: '300px',
      height: '100%',
    },
  },
  containerMin3: {
    name: 'ContainerMin3: 400px',
    styles: {
      width: '400px',
      height: '100%',
    },
  },
  containerMin4: {
    name: 'ContainerMin4: 600px',
    styles: {
      width: '600px',
      height: '100%',
    },
  },
};

export const viewports ={
  ...MINIMAL_VIEWPORTS,
  ...customViewports,
};