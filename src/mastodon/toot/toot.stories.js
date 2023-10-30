// import { generateMockResponse } from '../helpers/testing';
import { parseFetchedToot, fetchTootByUsername } from './content';
// import { getElements, ensureElements } from './toot.shared-spec';
import { default as tootClown } from '../fixtures/generated/toot--clown-toot.json';

import './index.js';

export default {
  title: 'Mastodon/mastodon-toot',
  component: 'mastodon-toot',
  tags: ['autodocs'],
  render: (args) => {
    const attributes = attrGen(args);
    console.log('tootClownattributes', attributes);
    return `<mastodon-toot ${attributes}></mastodon-toot>`;
  }
};
console.log('tootClown', parseFetchedToot(tootClown));
export const Toot = {
  args: {
    ...parseFetchedToot({
      ...tootClown,
    }),
  },
//   play: async ({ args, canvasElement, step }) => {
//     const elements = await getElements(canvasElement);
//     await ensureElements(elements, args);
//   }
}

export const Fetch = {
  args: {
    id: '111213146929010808',
    fetch: true,
  },
  // parameters: {
  //   mockData: [
  //     generateMockResponse(sampleToot, 'statuses'),
  //   ]
  // },
  // play: async ({ args, canvasElement, step }) => {
  //   const elements = await getElements(canvasElement);
  //   const argsAfterFetch = {
  //     ...parseFetchedToot(sampleToot),
  //     ...args,
  //   };
  //   await ensureElements(elements, argsAfterFetch);
  // }
}

// export const FetchError = {
//   args: {
//     username: 'nonexistent-user',
//     fetch: true,
//   },
//   parameters: {
//     mockData: [
//       generateMockResponse({ username: 'nonexistent-user' }, 'statuses', 404),
//     ]
//   },
//   play: async ({ args, canvasElement, step }) => {
//     const elements = await getElements(canvasElement);
//     const argsAfterFetch = {
//       ...args,
//       error: `Fetch Error: Toot for "${args.username}" not found`,
//     };
//     await ensureElements(elements, argsAfterFetch);
//   }
// }
