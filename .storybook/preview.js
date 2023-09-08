import { setCustomElementsManifest } from '@storybook/web-components';
import customElements from '../custom-elements.json';
import { globalTypesPrimer, decoratorsPrimer } from './primer-preview';

setCustomElementsManifest(customElements);

export const globalTypes = globalTypesPrimer;
export const decorators = decoratorsPrimer;

/** @type { import('@storybook/web-components').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
