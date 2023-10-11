import { repoProfileComponents, repoStorydocker, userScottnath, userSindresorhus } from '../fixtures';
import { generateMockResponse } from '../utils/testing';
import { parseFetchedUser } from './content';
import { parseFetchedRepo } from '../repository/content.js';
import { getElements, ensureElements } from './user.shared-spec';
import { primerThemes } from '../../../.storybook/primer-preview.js';
import { defaultModesDisabled } from '../../../.storybook/modes.js';

import '.';

const stringify = (obj) => JSON.stringify(obj).replace(/"/g, "&quot;");

const attrs = (args) => Object.entries(args)
.filter(([key, value]) => value)
.map(([key, value]) => `${key}="${value}"`)
.join(' ');

export default {
  title: 'GitHub/github-user',
  component: 'github-user',
  tags: ['autodocs'],
  render: (args) => {
    const attributes = attrs(args);
  
    return `
      <github-user ${attributes}></github-user>
    `;
  }
};

export const User  = {
  args: parseFetchedUser(userScottnath),
  play: async ({ args, canvasElement, step }) => {
    const elements = await getElements(canvasElement);
    await ensureElements(elements, args);
  }
}

export const UserRepos = {
  args: {
    ...User.args,
    repos: stringify([{ ...parseFetchedRepo(repoProfileComponents), user_login: userScottnath.login }, parseFetchedRepo(repoStorydocker)]),
  },
  play: User.play,
}

export const PopularUser  = {
  args: parseFetchedUser(userSindresorhus),
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
  play: async ({ args, canvasElement, step }) => {
    const elements = await getElements(canvasElement);
    const argsAfterFetch = {
      ...parseFetchedUser(userScottnath),
      ...args,
    };
    await ensureElements(elements, argsAfterFetch);
  }
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
    repos: stringify([{"full_name":"scottnath/profile-components","description":"Cool thing, does stuff","language":"HTML"}])
  },
  parameters: {
    mockData: [
      generateMockResponse(userScottnath, 'users'),
    ]
  },
  play: async ({ args, canvasElement, step }) => {
    const elements = await getElements(canvasElement);
    const argsAfterFetch = {
      ...parseFetchedUser(userScottnath),
      ...args,
    };
    await ensureElements(elements, argsAfterFetch);
  }
}

export const ReposFetch = {
  args: {
    login: userScottnath.login,
    fetch: true,
    repos: stringify([repoProfileComponents.name, repoStorydocker.full_name]),
  },
  parameters: {
    mockData: [
      generateMockResponse(userScottnath, 'users'),
    ]
  },
  play: async ({ args, canvasElement, step }) => {
    const elements = await getElements(canvasElement);
    const argsAfterFetch = {
      ...parseFetchedUser(userScottnath),
      ...args,
    };
    await ensureElements(elements, argsAfterFetch);
  }
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
  play: async ({ args, canvasElement, step }) => {
    const elements = await getElements(canvasElement);
    const argsAfterFetch = {
      ...args,
      error: `User "${args.login}" not found`,
    };
    await ensureElements(elements, argsAfterFetch);
  }
};

export const ContainerCheck = {
  args: {
    ...FetchOverides.args,
    theme: 'light_high_contrast'
  },
  render: (args) => {
    const attributes = attrs(args);
  
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
  const attributes = attrs(args);

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
  parameters: {
    chromatic: {
      modes: {
        ...defaultModesDisabled
      }
    },
  },
}

export const ThemesWithOverrides = {
  args: {
    ...FetchOverides.args,
  },
  render: themesRender,
  parameters: {
    chromatic: {
      modes: {
        ...defaultModesDisabled
      }
    },
  },
}