import { setCustomElementsManifest } from '@storybook/web-components';
import customElements from '../custom-elements.json';
import { globalTypesPrimer, decoratorsPrimer } from './primer-preview';
import { viewports } from './viewports';
import { stringify, parseify } from '../src/utils';
import "./storybook.css";

setCustomElementsManifest(customElements);

export const globalTypes = globalTypesPrimer;
export const decorators = decoratorsPrimer;

global.attrGen = (args) => Object.entries(args)
.filter(([key, value]) => value)
.map(([key, value]) => `\n  ${key}="${value}"`)
.join(' ');

global.stringify = stringify;
global.parseify = parseify;

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
    layout: 'none',
    viewport: {
      viewports,
    },
    docs: {
      source: {
        transform: (code) => {
          return code.replaceAll('&gt;', ">").replaceAll('&lt;', "<")
        }
      }
    },
    fetchMock: {
      mocks: []
    }
  },
};

export default preview;
