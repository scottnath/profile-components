import { setCustomElementsManifest } from '@storybook/web-components';
import customElements from '../custom-elements.json';
import { globalTypesPrimer, decoratorsPrimer } from './primer-preview';
import { viewports } from './viewports';
import { defaultModes } from './modes';
import "./storybook.css";

setCustomElementsManifest(customElements);

export const globalTypes = globalTypesPrimer;
export const decorators = decoratorsPrimer;

/** @type { import('@storybook/web-components').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    chromatic: {
      modes: {
        ...defaultModes,
      },
    },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'none',
    viewport: {
      viewports,
    },
  },
};

export default preview;
