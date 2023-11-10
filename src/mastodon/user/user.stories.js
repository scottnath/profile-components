// import { generateMockResponse } from '../helpers/testing';
import { parseFetchedUser } from './content';
// import { getElements, ensureElements } from './user.shared-spec';
import { default as userFixture} from '../fixtures/generated/account--scottnath.json';
import { default as searchScottnathAccounts } from '../fixtures/generated/search--scottnath--accounts.json';

import './index.js';

export default {
  title: 'Mastodon/mastodon-user',
  component: 'mastodon-user',
  tags: ['autodocs'],
  render: (args) => {
    const attributes = Object.entries(args).map(([key, value]) => `${key}="${value}"`).join(' ');
    return `<mastodon-user ${attributes}></mastodon-user>`;
  }
};

export const User = {
  args: parseFetchedUser(userFixture),
  // play: async ({ args, canvasElement }) => {
  //   const elements = await getElements(canvasElement);
  //   await ensureElements(elements, args);
  // }
}

export const OnlyRequired = {
  args: {
    id: userFixture.id,
    username: userFixture.username,
  },
  // play: User.play,
}

// export const Fetch = {
//   args: {
//     id: userMastodonMock.id,
//     fetch: true,
//   },
//   parameters: {
//     mockData: [
//       generateMockResponse(userMastodonMock, 'accounts'),
//     ]
//   },
//   play: async ({ args, canvasElement }) => {
//     const elements = await getElements(canvasElement);
//     const argsAfterFetch = {
//       ...parseFetchedUser(userMastodonMock),
//       ...args,
//     };
//     await ensureElements(elements, argsAfterFetch);
//   }
// }

// export const FetchError = {
//   args: {
//     id: 'not-a-real-user-id',
//     fetch: true,
//   },
//   parameters: {
//     mockData: [
//       generateMockResponse({ id: 'not-a-real-user-id' }, 'accounts', 404),
//     ]
//   },
//   play: async ({ args, canvasElement }) => {
//     const elements = await getElements(canvasElement);
//     const argsAfterFetch = {
//       ...args,
//       error: `User with ID "${args.id}" not found`,
//     };
//     await ensureElements(elements, argsAfterFetch);
//   }
// }

// export const ContainerCheck = {
//   args: {
//     ...Fetch.args,
//   },
//   render: (args) => {
//     const attributes = Object.entries(args).map(([key, value]) => `${key}="${value}"`).join(' ');
//     return `
//       <div style="display: flex; width: 1000px; margin: 1em;">
//         <mastodon-user ${attributes} style="flex: 1 1 200px;"></mastodon-user>
//         <mastodon-user ${attributes} style="flex: 1 1 300px;"></mastodon-user>
//         <mastodon-user ${attributes} style="flex: 1 1 400px;"></mastodon-user>
//       </div>
//     `;
//   }
// }
