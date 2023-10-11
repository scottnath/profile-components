
import { generateMockResponse } from '../helpers/testing';
import { parseFetchedPost } from './content';
import { default as postDependabot } from '../fixtures/generated/post--dependabot.json';

import './index.js';

export default {
  title: 'DevTo/devto-post',
  component: 'devto-post',
  tags: ['autodocs'],
  render: (args) => {
    const attributes = Object.entries(args)
      .filter(([key, value]) => value)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');
  
    return `
      <devto-post ${attributes}></devto-post>
    `;
  }
};


export const Post = {
  args: {
    ...parseFetchedPost(postDependabot),
  },
  // play: async ({ args, canvasElement, step }) => {
  //   const elements = await getElements(canvasElement);
  //   await ensureElements(elements, args);
  // }
}

export const PostFetch = {
  args: {
    id: postDependabot.id,
    fetch: true,
  },
}