import path from 'path';
/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
  stories: ['../src/github/*.mdx', '../src/github/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-interactions',
    '@storybook/addon-coverage',
    'storybook-addon-mock',
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config, options) {
    // Ensures that the cache directory is inside the project directory
    config.cacheDir = path.join(__dirname, '../node_modules/.vite');
    return config;
  },
};
export default config;
