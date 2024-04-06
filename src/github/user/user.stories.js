import { repoProfileComponents, repoFreeCodeCamp, repoStorydocker, userScottnath, userSindresorhus } from '../fixtures';
import { generateMockResponse } from '../helpers/testing';
import { parseFetchedUser } from './content';
import { parseFetchedRepo } from '../repository/content.js';
import { getElements, ensureElements, ensureScreenRead } from './user.shared-spec';
import { primerThemes } from '../../../.storybook/primer-preview.js';
import { within as shadowWithin } from 'shadow-dom-testing-library';

import './index.js';

export default {
  title: 'GitHub/github-user',
  component: 'github-user',
  tags: ['autodocs'],
  render: (args) => {
    const attributes = attrGen({...args});
  
    return `
      <github-user ${attributes}></github-user>
    `;
  },
};

export const User  = {
  args: parseFetchedUser(userScottnath),
  play: async ({ args, canvasElement, step }) => {
    const elements = await getElements(canvasElement);
    await ensureElements(elements, args);
    await ensureScreenRead(elements, args);
  }
}

export const UserRepos = {
  args: {
    ...parseFetchedUser(userScottnath),
    repos: stringinator([parseFetchedRepo(repoProfileComponents), parseFetchedRepo(repoStorydocker)]),
  },
  play: async ({ args, canvasElement, step }) => {
    const elements = await getElements(canvasElement);
    await ensureElements(elements, args);
    await ensureScreenRead(elements, args);
  }
}

export const Schema = {
  args: {
    ...parseFetchedUser(userScottnath),
    schema_itemprop: 'owns',
    repos: stringinator([parseFetchedRepo(repoProfileComponents), parseFetchedRepo(repoStorydocker)]),
  },
  play: async ({ args, canvasElement, step }) => {
    const elements = await getElements(canvasElement);
    await ensureElements(elements, args);
    await ensureScreenRead(elements, args);
  }
}

export const PopularUser  = {
  args: {
    ...parseFetchedUser(userSindresorhus),
    repos: stringinator([parseFetchedRepo(repoFreeCodeCamp)]),
  },
  play: User.play,
}

export const OnlyRequired = {
  args: {
    login: userScottnath.login,
    name: userScottnath.name,
  },
  play: User.play,
}

export const Fetch = {
  args: {
    login: userScottnath.login,
    fetch: true,
  },
  parameters: {
    mockData: [
      generateMockResponse(userScottnath, 'users'),
    ]
  },
  // check mocking library
  // play: async ({ args, canvasElement, step }) => {
  //   const elements = await getElements(canvasElement);
  //   const argsAfterFetch = {
  //     ...parseFetchedUser({...userScottnath}),
  //     ...args,
  //   };
  //   await ensureElements(elements, argsAfterFetch);
  //   await ensureScreenRead(elements, argsAfterFetch);
  // }
};

export const FetchOverides = {
  args: {
    login: userScottnath.login,
    fetch: true,
    name: "Meowy McMeowerstein",
    bio: "Spending time purring and sleepin",
    avatar_url: 'cat-square.jpeg',
    followers: "500000",
    following: "2980",
    repos: stringinator([{"full_name":"scottnath/profile-components","description":"Cool thing, does stuff","language":"HTML"}])
  },
  parameters: {
    mockData: [
      generateMockResponse(userScottnath, 'users'),
    ]
  },
  // check mocking library
  // play: async ({ args, canvasElement, step }) => {
  //   const elements = await getElements(canvasElement);
  //   const argsAfterFetch = {
  //     ...parseFetchedUser({...userScottnath}),
  //     ...args,
  //   };
  //   await ensureElements(elements, argsAfterFetch);
  //   await ensureScreenRead(elements, argsAfterFetch);
  // }
}

export const ReposFetch = {
  args: {
    login: userScottnath.login,
    fetch: true,
    repos: stringinator([repoProfileComponents.name, repoStorydocker.full_name]),
  },
  parameters: {
    mockData: [
      generateMockResponse(userScottnath, 'users'),
      generateMockResponse(repoProfileComponents, 'repos'),
      generateMockResponse(repoStorydocker, 'repos'),
    ]
  },
  // check mocking library
  // play: async ({ args, canvasElement, step }) => {
  //   const elements = await getElements(canvasElement);
  //   const argsAfterFetch = {
  //     ...parseFetchedUser({...userScottnath}),
  //     ...args,
  //     repositories: [parseFetchedRepo(repoProfileComponents), parseFetchedRepo(repoStorydocker)]
  //   };
  //   await ensureElements(elements, argsAfterFetch);
  //   await ensureScreenRead(elements, argsAfterFetch);
  // }
}

export const FetchError = {
  args: {
    login: 'not-a-real-user',
    fetch: true,
  },
  parameters: {
    mockData: [
      generateMockResponse({login: 'not-a-real-user'}, 'users', 404),
    ]
  },
  // check mocking library
  // play: async ({ args, canvasElement, step }) => {
  //   const elements = await getElements(canvasElement);
  //   const argsAfterFetch = {
  //     ...args,
  //     error: `User "${args.login}" not found`,
  //   };
  //   await ensureElements(elements, argsAfterFetch);
  // }
};

export const ContainerCheck = {
  args: {
    ...FetchOverides.args,
    theme: 'light_high_contrast'
  },
  render: (args) => {
    const attributes = attrGen(args);
  
    return `
      <div style="display: flex; width: 1000px; margin: 1em;">
        <github-user ${attributes} style="flex: 1 1 200px;"></github-user>
        <github-user ${attributes} style="flex: 1 1 300px;"></github-user>
        <github-user ${attributes} style="flex: 1 1 400px;"></github-user>
      </div>
    `;
  }
}

const themesRender = (args) => {
  const attributes = attrGen(args);

  return `
    <div style="display: flex; flex-wrap: wrap; width: 1000px; margin: 1em;">
      ${primerThemes.map((theme) => {
        return `
        <github-user ${attributes} theme="${theme.value}" style="flex: 1 1 200px;"></github-user>
        `;
      }).join('')}
      ${primerThemes.map((theme) => {
        return `
        <github-user ${attributes} theme="${theme.value}" style="flex: 1 1 300px;"></github-user>
        `;
      }).join('')}
      ${primerThemes.map((theme) => {
        return `
        <github-user ${attributes} theme="${theme.value}" style="flex: 1 1 400px;"></github-user>
        `;
      }).join('')}
    </div>
  `;
}

export const Themes = {
  args: {
    ...ReposFetch.args,
  },
  render: themesRender,
}

export const ThemesWithOverrides = {
  args: {
    ...FetchOverides.args,
  },
  render: themesRender,
}