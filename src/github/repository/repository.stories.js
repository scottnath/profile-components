import { generateMockResponse } from '../helpers/testing';
import { parseFetchedRepo } from './content';
import { getElements, ensureElements, ensureScreenRead } from './repository.shared-spec';
import { repoProfileComponents, repoFreeCodeCamp } from '../fixtures';
import { primerThemes } from '../../../.storybook/primer-preview.js';

import './index.js';

export default {
  title: 'GitHub/github-repository',
  component: 'github-repository',
  tags: ['autodocs'],
  render: (args) => {
    const attributes = attrGen(args);
  
    return `
      <github-repository ${attributes}></github-repository>
    `;
  }
};

export const Repository = {
  args: {
    ...parseFetchedRepo(repoFreeCodeCamp),
  },
  play: async ({ args, canvasElement, step }) => {
    const elements = await getElements(canvasElement);
    await ensureElements(elements, args);
    await ensureScreenRead(elements, args);
  }
}

export const FullNameOnly = {
  args: {
    full_name: repoProfileComponents.full_name,
    stargazers_count: '0'
  },
  play: Repository.play,
}

export const OrgIsUser = {
  args: {
    full_name: repoProfileComponents.full_name,
    no_org: true,
  },
  play: Repository.play,
}
export const WithOrgName = {
  args: {
    full_name: repoProfileComponents.full_name,
    org: 'different-org-name'
  },
  play: Repository.play,
}
export const LanguageCircle = {
  args: {
    full_name: 'just-another/c-plus-plus-repo',
    language: 'C++',
    stargazers_count: '123',
    forks_count: '456',
    subscribers_count: '789',
    description: 'This is meow meow.'
  },
  play: Repository.play,
}

export const Theme = {
  args: {
    ...parseFetchedRepo(repoFreeCodeCamp),
    theme: 'dark',
  },
  play: Repository.play,
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
    const elements = await getElements(canvasElement);
    const argsAfterFetch = {
      ...parseFetchedRepo(repoProfileComponents),
      ...args,
    };
    await ensureElements(elements, argsAfterFetch);
    await ensureScreenRead(elements, argsAfterFetch);
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
    const elements = await getElements(canvasElement);
    const argsAfterFetch = {
      ...args,
      error: `Fetch Error: Repo "${args.full_name}" not found`,
    };
    await ensureElements(elements, argsAfterFetch);
    await ensureScreenRead(elements, argsAfterFetch);
  }
}

export const NoRepo = {
  play: async ({ args, canvasElement, step }) => {
    const elements = await getElements(canvasElement);
    const argsAfterFetch = {
      ...args,
      error: 'Missing repo attribute: `full_name`',
    };
    await ensureElements(elements, argsAfterFetch);
    await ensureScreenRead(elements, argsAfterFetch);
  }
};

const themesRender = (args) => {
  const attributes = attrGen(args);

  return `
    <div style="display: flex; flex-wrap: wrap; width: 1000px; margin: 1em;">
      ${primerThemes.map((theme) => {
        return `
        <github-repository ${attributes} theme="${theme.value}" style="flex: 1 1 200px;"></github-repository>
        `;
      }).join('')}
      ${primerThemes.map((theme) => {
        return `
        <github-repository ${attributes} theme="${theme.value}" style="flex: 1 1 300px;"></github-repository>
        `;
      }).join('')}
      ${primerThemes.map((theme) => {
        return `
        <github-repository ${attributes} theme="${theme.value}" style="flex: 1 1 400px;"></github-repository>
        `;
      }).join('')}
    </div>
  `;
}

export const Themes = {
  args: {
    ...Repository.args,
  },
  render: themesRender,
}

export const ThemesWithOverrides = {
  args: {
    ...LanguageCircle.args,
  },
  render: themesRender,
}