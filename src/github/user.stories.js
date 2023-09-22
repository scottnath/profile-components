import { repoScottnathdotcom, repoStorydocker, userScottnath, userSindresorhus } from './fixtures';
import { generateMockResponse, parseFetchedRepo, parseFetchedUser } from './utils/github';
import { getElements, ensureElements } from './user.shared-spec';
import { repoProfileComponents, repoFreeCodeCamp } from './fixtures';

import './user';

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
      <github-user ${attributes} class="meow"></github-user>
    `;
  }
};

export const OnlyRequired = {
  args: {
    login: userScottnath.login,
    name: userScottnath.name,
  },
  play: async ({ args, canvasElement, step }) => {
    const elements = await getElements(canvasElement);
    await ensureElements(elements, args);
  }
}

export const User  = {
  args: parseFetchedUser(userScottnath),
  play: OnlyRequired.play,
}

export const PopularUser  = {
  args: parseFetchedUser(userSindresorhus),
  play: OnlyRequired.play,
}

export const UserRepos = {
  args: {
    ...User.args,
    repos: JSON.stringify([parseFetchedRepo(repoStorydocker), { ...parseFetchedRepo(repoScottnathdotcom), user_login: userScottnath.login }]).replace(/"/g, "&quot;"),
  },
  play: OnlyRequired.play,
}

export const ReposFetch = {
  args: {
    ...User.args,
    repos: JSON.stringify([repoScottnathdotcom.name, repoStorydocker.full_name]).replace(/"/g, "&quot;"),
  },
  play: OnlyRequired.play,
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
    /** wait for fetch to complete */
    await new Promise(resolve => setTimeout(resolve, 0));
    const elements = await getElements(canvasElement);
    const argsAfterFetch = {
      ...parseFetchedUser(userScottnath),
      ...args,
    };
    await ensureElements(elements, argsAfterFetch);
  }
};

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
    /** wait for fetch to complete */
    await new Promise(resolve => setTimeout(resolve, 0));
    const elements = await getElements(canvasElement);
    const argsAfterFetch = {
      ...args,
      error: `User "${args.login}" not found`,
    };
    await ensureElements(elements, argsAfterFetch);
  }
};