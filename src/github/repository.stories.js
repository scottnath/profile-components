
import { generateMockResponse, parseFetchedRepo } from './utils/github';
import { getElements, ensureElements } from './repository.shared-spec';
import { repoProfileComponents, repoFreeCodeCamp } from './fixtures';

import './repository';

export default {
  title: 'GitHub Repository',
  component: 'github-repository',
  tags: ['autodocs'],
  render: (args) => {
    const attributes = Object.entries(args)
      .filter(([key, value]) => value)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');
  
    return `
      <github-repository ${attributes}></github-repository>
    `;
  }
};


export const FullNameOnly = {
  args: {
    full_name: repoProfileComponents.full_name,
    stargazers_count: '0'
  },
  play: async ({ args, canvasElement, step }) => {
    const elements = await getElements(canvasElement);
    await ensureElements(elements, args);
  }
}

export const OrgIsUser = {
  args: {
    full_name: repoProfileComponents.full_name,
    user_login: repoProfileComponents.owner?.login,
  },
  play: FullNameOnly.play,
}
export const WithOrgName = {
  args: {
    full_name: repoProfileComponents.full_name,
    org: 'different-org-name'
  },
  play: FullNameOnly.play,
}

export const AllRepoContent = {
  args: {
    ...parseFetchedRepo(repoFreeCodeCamp),
  },
  play: FullNameOnly.play,
}

export const Fetch = {
  args: {
    full_name: repoProfileComponents.full_name,
    fetch: true,
  },
  parameters: {
    mockData: [
      generateMockResponse(repoProfileComponents, 'repos'),
    ]
  },
  play: async ({ args, canvasElement, step }) => {
    /** wait for fetch to complete */
    await new Promise(resolve => setTimeout(resolve, 0));
    const elements = await getElements(canvasElement);
    const argsAfterFetch = {
      ...parseFetchedRepo(repoProfileComponents),
      ...args,
    };
    await ensureElements(elements, argsAfterFetch);
  }
}

export const FetchOverides = {
  args: {
    ...Fetch.args,
    description: 'Overridden description instead of `fetch`ed result',
  },
  parameters: Fetch.parameters,
  play: Fetch.play,
}

export const FetchError = {
  args: {
    full_name: '_/_',
    fetch: true,
  },
  parameters: {
    mockData: [
      generateMockResponse({full_name: '_/_'}, 'repos', 404),
    ]
  },
  play: async ({ args, canvasElement, step }) => {
    /** wait for fetch to complete */
    await new Promise(resolve => setTimeout(resolve, 0));
    const elements = await getElements(canvasElement);
    const argsAfterFetch = {
      ...args,
      error: `Repo "${args.full_name}" not found`,
    };
    await ensureElements(elements, argsAfterFetch);
  }
}

export const NoRepo = {
  play: FullNameOnly.play,
};