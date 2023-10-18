/**
 * @fileoverview Storybook modes used for testing in Chromatic
 * @see https://www.chromatic.com/docs/modes
 */

import { customViewports } from './viewports';
import { primerThemes } from './primer-preview';

const defaultThemes = ['light', 'dark'];

export const defaultModes = {};
export const defaultModesDisabled = {};
export const githubModes = {};

for (const key of Object.keys(customViewports)) {
  defaultModes[key] = {
    viewport: key,
  };
  defaultModesDisabled[key] = {
    disabled: true,
  };
  githubModes[key] = {
    viewport: key,
  };
  for (const theme of defaultThemes) {
    defaultModes[`${theme} ${key}`] = {
      viewport: key,
      theme: theme,
    };
    defaultModesDisabled[`${theme} ${key}`] = {
      disabled: true,
    };
  };
  for (const theme of primerThemes) {
    githubModes[`primer ${theme.value} ${key}`] = {
      viewport: key,
      theme: theme.value,
    };
  };
};

export const allModes = {
  mobile: {
    viewport: 'small',
  },
  desktop: {
    viewport: 'large',
  },
  dark: {
    backgrounds: 'dark',
    theme: 'dark',
  },
  light: {
    backgrounds: 'light',
    theme: 'light',
  },
  'dark desktop': {
    backgrounds: 'dark',
    theme: 'dark',
    viewport: 'large',
  },
  'light mobile': {
    backgrounds: 'light',
    theme: 'light',
    viewport: 'small',
  },
};

export const basicModes = {
  dark: {
    backgrounds: 'dark',
    theme: 'dark',
  },
  light: {
    backgrounds: 'light',
    theme: 'light',
  },
}