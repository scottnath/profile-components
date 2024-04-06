import path from 'path';
/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
  stories: ['../src/github/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-interactions',
    '@storybook/addon-coverage',
    // 'storybook-addon-mock',
    '@chromaui/addon-visual-tests',
  ],
  core: {
    builder: '@storybook/builder-vite'
  },
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};
export default config;
