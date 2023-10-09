import { repoScottnathdotcom, repoStorydocker, userScottnath, userSindresorhus } from '../fixtures';
import { generateMockResponse } from '../utils/testing';
import { parseFetchedUser } from './content';
import { parseFetchedRepo } from '../repository/content.js';
import { getElements, ensureElements } from './user.shared-spec';

import '.';

const stringify = (obj) => JSON.stringify(obj).replace(/"/g, "&quot;");

export default {
  title: 'GitHub/github-user',
  component: 'github-user',
  tags: ['autodocs'],
  render: (args) => {
    const attributes = Object.entries(args)
      .filter(([key, value]) => value)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');
  
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
    repos: stringify([parseFetchedRepo(repoStorydocker), { ...parseFetchedRepo(repoScottnathdotcom), user_login: userScottnath.login }]),
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
    avatar_url: 'multi-face-image.jpeg',
    followers: "500000",
    following: "2980",
    repos: stringify([{"full_name":"scottnath/profile-components","description":"Cool thing, does stuff","language":"HTML"}])
  },
}

export const ReposFetch = {
  args: {
    login: userScottnath.login,
    fetch: true,
    repos: stringify([repoScottnathdotcom.name, repoStorydocker.full_name]),
  },
  play: async ({ args, canvasElement, step }) => {
    const elements = await getElements(canvasElement);
    const argsAfterFetch = {
      ...parseFetchedUser(userScottnath),
      ...args,
    };
    await ensureElements(elements, args);
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