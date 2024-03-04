
import { generateMockResponse } from '../helpers/testing';
import { parseFetchedPost } from './content';
import { default as postDependabot } from '../fixtures/generated/post--dependabot.json';
import { default as postProfileComponents } from '../fixtures/generated/post--profile-components.json';
import { getElements, ensureElements, ensureScreenRead } from './post.shared-spec';

import './index.js';

export default {
  title: 'DevTo/devto-post',
  component: 'devto-post',
  tags: ['autodocs'],
  render: (args) => {
    const attributes = attrGen(args);
  
    return `
      <devto-post ${attributes}></devto-post>
    `;
  },
};


export const Post = {
  args: {
    ...parseFetchedPost(postDependabot),
  },
  play: async ({ args, canvasElement, step }) => {
    const elements = await getElements(canvasElement);
    await ensureElements(elements, args);
    await ensureScreenRead(elements, args);
  }
}

export const Fetch = {
  args: {
    id: postProfileComponents.id,
    fetch: true,
  },
  parameters: {
    mockData: [
      generateMockResponse(postProfileComponents, 'article'),
    ]
  },
  play: async ({ args, canvasElement, step }) => {
    const elements = await getElements(canvasElement);
    const argsAfterFetch = {
      ...parseFetchedPost(postProfileComponents),
      ...args,
    };
    await ensureElements(elements, argsAfterFetch);
    await ensureScreenRead(elements, argsAfterFetch);
  }
}

export const FetchOverides = {
  args: {
    ...Fetch.args,
      title: 'Mess? Make your human blame the dog',
      cover_image: 'cat-glasses-1000-420.jpeg'
  },
  parameters: {
    mockData: [
      generateMockResponse(postProfileComponents, 'article'),
    ]
  },
  play: async ({ args, canvasElement, step }) => {
    const elements = await getElements(canvasElement);
    const argsAfterFetch = {
      ...parseFetchedPost(postProfileComponents),
      ...args,
    };
    await ensureElements(elements, argsAfterFetch);
    await ensureScreenRead(elements, argsAfterFetch);
  }
}

export const FetchError = {
  args: {
    id: 'not-a-real-id',
    fetch: true,
  },
  parameters: {
    mockData: [
      generateMockResponse({id: 'not-a-real-id'}, 'article', 404),
    ]
  },
  play: async ({ args, canvasElement, step }) => {
    const elements = await getElements(canvasElement);
    const argsAfterFetch = {
      ...args,
      error: `Fetch Error: Post "${args.id}" not found`,
    };
    await ensureElements(elements, argsAfterFetch);
    await ensureScreenRead(elements, argsAfterFetch);
  }
}
