import { repoProfileComponents, repoStorydocker, userScottnath, userSindresorhus } from '../fixtures';
import { generateMockResponse } from '../helpers/testing';
import { parseFetchedUser } from './content';
import { parseFetchedRepo } from '../repository/content.js';
import { getElements, ensureElements, ensureScreenRead } from './user.shared-spec';
import { primerThemes } from '../../../.storybook/primer-preview.js';
import { within as shadowWithin } from 'shadow-dom-testing-library';
import { stringinator } from '../../utils/index.js';
import './index.js';

export default {
  title: 'GitHub/github-user',
  component: 'github-user',
  tags: ['autodocs'],
  render: (args) => {
    console.log('args1', {...args})
    let repos;
    console.log('args2!', JSON.stringify([parseFetchedRepo(repoProfileComponents), parseFetchedRepo(repoStorydocker)]).replace(/"/g, "||||"))
    if (args.repos2) {
      repos = args.repos2;
      delete args.repos2;
    }
    let attributes = attrGen({...args});
    console.log('attributes', attributes)
    args.repos = repos;
    if (repos) {
      console.log('repos', repos)
      console.log('typeofrepos', typeof repos)
      if (typeof repos !== 'string') repos = stringinator(repos);
      console.log('repos>>2', repos)
      attributes += `\nrepos="${repos}"`;
    }
    console.log('ATTRIBUTES', attributes)
  
    return `
      <github-user ${attributes}></github-user>
    `;
  },
};

// export const User  = {
//   args: parseFetchedUser(userScottnath),
//   play: async ({ args, canvasElement, step }) => {
//     console.log('USER = elms', canvasElement.closest('body').innerHTML)
//     const elements = await getElements(canvasElement);
//     await ensureElements(elements, args);
//     await ensureScreenRead(elements, args);
//   }
// }

export const UserRepos = {
  args: {
    ...parseFetchedUser(userScottnath),
    name: 'Scoot Nerth',
    repos2: stringinator([parseFetchedRepo(repoProfileComponents), parseFetchedRepo(repoStorydocker)]),
  },
  play: async ({ args, canvasElement, step }) => {
    console.log('UserRepos = canva', canvasElement.closest('body').innerHTML)
    const elements = await getElements(canvasElement);
    await ensureElements(elements, args);
    await ensureScreenRead(elements, args);
  }
}

// export const PopularUser  = {
//   args: parseFetchedUser(userSindresorhus),
//   play: User.play,
// }

// export const OnlyRequired = {
//   args: {
//     login: userScottnath.login,
//     name: userScottnath.name,
//   },
//   play: User.play,
// }

// export const Fetch = {
//   args: {
//     login: userScottnath.login,
//     fetch: true,
//   },
//   parameters: {
//     fetchMock: {
//       mocks: [
//         {
//           response: generateMockResponse(userScottnath, 'users'),
//         }
//       ]
//     }
//   },
//   play: async ({ args, canvasElement, step }) => {
//     const elements = await getElements(canvasElement);
//     const argsAfterFetch = {
//       ...parseFetchedUser({...userScottnath}),
//       ...args,
//     };
//     await ensureElements(elements, argsAfterFetch);
//     await ensureScreenRead(elements, argsAfterFetch);
//   }
// };

// export const FetchOverides = {
//   args: {
//     login: userScottnath.login,
//     fetch: true,
//     name: "Meowy McMeowerstein",
//     bio: "Spending time purring and sleepin",
//     avatar_url: 'cat-square.jpeg',
//     followers: "500000",
//     following: "2980",
//     repos: stringify([{"full_name":"scottnath/profile-components","description":"Cool thing, does stuff","language":"HTML"}])
//   },
//   parameters: {
//     mockData: [
//       generateMockResponse(userScottnath, 'users'),
//     ]
//   },
//   play: async ({ args, canvasElement, step }) => {
//     const elements = await getElements(canvasElement);
//     const argsAfterFetch = {
//       ...parseFetchedUser({...userScottnath}),
//       ...args,
//     };
//     await ensureElements(elements, argsAfterFetch);
//     await ensureScreenRead(elements, argsAfterFetch);
//   }
// }

// export const ReposFetch = {
//   args: {
//     login: userScottnath.login,
//     fetch: true,
//     repos: stringify([repoProfileComponents.name, repoStorydocker.full_name]),
//   },
//   parameters: {
//     fetchMock: {
//       mocks: [
//         {
//           response: generateMockResponse(userScottnath, 'users'),
//         },
//         {
//           response: generateMockResponse(repoProfileComponents, 'repos'),
//         },
//         {
//           response: generateMockResponse(repoStorydocker, 'repos'),
//         }
//       ]
//     }
//     // mockData: [
//     //   generateMockResponse(userScottnath, 'users'),
//     //   generateMockResponse(repoProfileComponents, 'repos'),
//     //   generateMockResponse(repoStorydocker, 'repos'),
//     // ]
//   },
//   play: async ({ args, canvasElement, step }) => {
//     const elements = await getElements(canvasElement);
//     console.log('ReposFetchReposFetch = elms', elements.container.innerHTML)
//     const argsAfterFetch = {
//       ...parseFetchedUser({...userScottnath}),
//       ...args,
//       repos: stringify([repoProfileComponents, repoStorydocker]),
//       repositories: [parseFetchedRepo(repoProfileComponents), parseFetchedRepo(repoStorydocker)]
//     };
//     console.log('argsAfterFetch', argsAfterFetch)
//     await ensureElements(elements, argsAfterFetch);
//     await ensureScreenRead(elements, argsAfterFetch);
//   }
// }

// // export const FetchError = {
// //   args: {
// //     login: 'not-a-real-user',
// //     fetch: true,
// //   },
// //   parameters: {
// //     mockData: [
// //       generateMockResponse({login: 'not-a-real-user'}, 'users', 404),
// //     ]
// //   },
// //   play: async ({ args, canvasElement, step }) => {
// //     const elements = await getElements(canvasElement);
// //     const argsAfterFetch = {
// //       ...args,
// //       error: `User "${args.login}" not found`,
// //     };
// //     await ensureElements(elements, argsAfterFetch);
// //   }
// // };

// // export const ContainerCheck = {
// //   args: {
// //     ...FetchOverides.args,
// //     theme: 'light_high_contrast'
// //   },
// //   render: (args) => {
// //     const attributes = attrGen(args);
  
// //     return `
// //       <div style="display: flex; width: 1000px; margin: 1em;">
// //         <github-user ${attributes} style="flex: 1 1 200px;"></github-user>
// //         <github-user ${attributes} style="flex: 1 1 300px;"></github-user>
// //         <github-user ${attributes} style="flex: 1 1 400px;"></github-user>
// //       </div>
// //     `;
// //   }
// // }

// // const themesRender = (args) => {
// //   const attributes = attrGen(args);

// //   return `
// //     <div style="display: flex; flex-wrap: wrap; width: 1000px; margin: 1em;">
// //       ${primerThemes.map((theme) => {
// //         return `
// //         <github-user ${attributes} theme="${theme.value}" style="flex: 1 1 200px;"></github-user>
// //         `;
// //       }).join('')}
// //       ${primerThemes.map((theme) => {
// //         return `
// //         <github-user ${attributes} theme="${theme.value}" style="flex: 1 1 300px;"></github-user>
// //         `;
// //       }).join('')}
// //       ${primerThemes.map((theme) => {
// //         return `
// //         <github-user ${attributes} theme="${theme.value}" style="flex: 1 1 400px;"></github-user>
// //         `;
// //       }).join('')}
// //     </div>
// //   `;
// // }

// // export const Themes = {
// //   args: {
// //     ...ReposFetch.args,
// //   },
// //   render: themesRender,
// // }

// // export const ThemesWithOverrides = {
// //   args: {
// //     ...FetchOverides.args,
// //   },
// //   render: themesRender,
// // }