
import { generateMockResponse } from '../helpers/testing';
import { parseFetchedUser } from './content';
import { parseFetchedPost } from '../post/content';
import { default as userScottnath } from '../fixtures/generated/user--scottnath.json';
import { default as postDependabot } from '../fixtures/generated/post--dependabot.json';
import { default as postBugfix } from '../fixtures/generated/post--bugfix-multi-vite.json';
import { getElements, ensureElements, ensureScreenRead } from './user.shared-spec';

import './index.js';

export default {
  title: 'DevTo/devto-user',
  component: 'devto-user',
  tags: ['autodocs'],
  render: (args) => {
    const attributes = attrGen(args);
  
    return `
      <devto-user ${attributes}></devto-user>
    `;
  },
};

export const User = {
  args: {
    ...parseFetchedUser(userScottnath),
  },
  play: async ({ args, canvasElement }) => {
    const elements = await getElements(canvasElement);
    await ensureElements(elements, args);
    await ensureScreenRead(elements, args);
  }
}

// export const UserPosts = {
//   args: {
//     ...User.args,
//     post_count: 222,
//     latest_post: stringify(parseFetchedPost(postDependabot)),
//     popular_post: stringify(parseFetchedPost(postBugfix)),
//   },
//   // breaks in github-actions CI, unknown why
//   play: async ({ args, canvasElement }) => {
//     const elements = await getElements(canvasElement);

//     const argsAfterFetch = {
//       ...args,
//       latest_post: parseFetchedPost(postDependabot),
//       popular_post: parseFetchedPost(postBugfix),
//     };
//     await ensureElements(elements, argsAfterFetch);
//     await ensureScreenRead(elements, argsAfterFetch);
//   }
// }

// export const OnlyRequired = {
//   args: {
//     username: userScottnath.username,
//     name: userScottnath.name,
//   },
//   play: User.play,
// }

// export const Fetch = {
//   args: {
//     username: userScottnath.username,
//     fetch: true,
//   },
// }

// export const FetchMocked = {
//   args: {
//     username: userScottnath.username,
//     fetch: true,
//   },
//   parameters: {
//     mockData: [
//       generateMockResponse(userScottnath, 'users'),
//       generateMockResponse([postDependabot, postBugfix], 'articles'),
//     ]
//   },
//   play: async ({ args, canvasElement }) => {
//     const elements = await getElements(canvasElement);
//     const argsAfterFetch = {
//       ...parseFetchedUser(userScottnath),
//       ...args,
//       post_count: 2,
//       latest_post: parseFetchedPost(postDependabot),
//       popular_post: parseFetchedPost(postBugfix),
//     };
//     await ensureElements(elements, argsAfterFetch);
//     await ensureScreenRead(elements, argsAfterFetch);
//   }
// }


// export const FetchWithoutPosts = {
//   args: {
//     username: userScottnath.username,
//     fetch: 'no-posts',
//   },
//   parameters: {
//     mockData: [
//       generateMockResponse(userScottnath, 'users'),
//       generateMockResponse([postDependabot, postBugfix], 'articles'),
//     ]
//   },
//   play: async ({ args, canvasElement }) => {
//     const elements = await getElements(canvasElement);
//     const argsAfterFetch = {
//       ...parseFetchedUser(userScottnath),
//       ...args,
//       post_count: 2,
//       latest_post: null,
//       popular_post: null,
//     };
//     await ensureElements(elements, argsAfterFetch);
//     await ensureScreenRead(elements, argsAfterFetch);
//   }
// }

// export const FetchOverides = {
//   args: {
//     username: userScottnath.username,
//     fetch: 'true',
//     name: "Meowy McMeowerstein",
//     summary: "Spending time purring and sleepin",
//     profile_image: 'cat-square.jpeg',
//     joined_at: 'Jan 1, 1979',
//     post_count: 1000000,
//     popular_post: stringify({
//       title: 'Meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow',
//       cover_image: 'cat-1000-420.jpeg',
//     }),
//     latest_post: stringify({
//       title: 'Mess? Make your human blame the dog',
//       cover_image: 'cat-glasses-1000-420.jpeg'
//     }),
//   },
//   parameters: {
//     mockData: [
//       generateMockResponse(userScottnath, 'users'),
//       generateMockResponse([postDependabot, postBugfix], 'articles'),
//     ]
//   },
//   play: async ({ args, canvasElement }) => {
//     const elements = await getElements(canvasElement);

//     const argsAfterFetch = {
//       ...parseFetchedUser(userScottnath),
//       ...args,
//       latest_post: {
//         ...parseFetchedPost(postDependabot),
//         ...parseify(args.latest_post),
//       },
//       popular_post: {
//         ...parseFetchedPost(postBugfix),
//         ...parseify(args.popular_post),
//       },
//     };
//     await ensureElements(elements, argsAfterFetch);
//     await ensureScreenRead(elements, argsAfterFetch);
//   }
// }

// export const FetchError = {
//   args: {
//     username: 'not-a-real-user',
//     fetch: true,
//   },
//   parameters: {
//     mockData: [
//       generateMockResponse({username: 'not-a-real-user'}, 'users', 404),
//     ]
//   },
//   play: async ({ args, canvasElement }) => {
//     const elements = await getElements(canvasElement);
//     const argsAfterFetch = {
//       ...args,
//       error: 'Fetch Error: User "not-a-real-user" not found'
//     };
//     await ensureElements(elements, argsAfterFetch);
//     await ensureScreenRead(elements, argsAfterFetch);
//   }
// }

// export const ContainerCheck = {
//   args: {
//     ...FetchOverides.args,
//     fetch: false,
//   },

//   render: (args) => {
//     const attributes = attrGen(args);
  
//     return `
//       <div style="display: flex; flex-wrap: wrap; width: 1000px; margin: 1em;">
//         <devto-user ${attributes} theme="dark" style="flex: 0 0 200px;"></devto-user>
//         <devto-user ${attributes} theme="light" style="flex: 0 0 200px;"></devto-user>
//         <devto-user ${attributes} theme="dark" style="flex: 0 0 300px;"></devto-user>
//         <devto-user ${attributes} theme="light" style="flex: 0 0 300px;"></devto-user>
//         <devto-user ${attributes} theme="dark" style="flex: 0 0 400px;"></devto-user>
//         <devto-user ${attributes} theme="light" style="flex: 0 0 400px;"></devto-user>
//       </div>
//     `;
//   }
// }
