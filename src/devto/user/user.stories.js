
import { generateMockResponse } from '../utils/testing';
import { parseFetchedUser } from './content';
import { parseFetchedPost } from '../post/content';
import { default as userScottnath } from '../fixtures/generated/user--scottnath.json';
import { default as postDependabot } from '../fixtures/generated/post--dependabot.json';

import './index.js';

const stringify = (obj) => JSON.stringify(obj).replace(/"/g, "&quot;");

export default {
  title: 'DevTo/devto-user',
  component: 'devto-user',
  tags: ['autodocs'],
  render: (args) => {
    const attributes = Object.entries(args)
      .filter(([key, value]) => value)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');
  
    return `
      <devto-user ${attributes}></devto-user>
    `;
  }
};


export const User = {
  args: {
    ...parseFetchedUser(userScottnath),
    post_count: 123456,
  },
  // play: async ({ args, canvasElement, step }) => {
  //   const elements = await getElements(canvasElement);
  //   await ensureElements(elements, args);
  // }
}

export const UserPosts = {
  args: {
    ...User.args,
    latest_post: stringify(parseFetchedPost(postDependabot)),
  }
}

export const Fetch = {
  args: {
    username: userScottnath.username,
    fetch: true,
  },
}

export const FetchWithoutPosts = {
  args: {
    username: userScottnath.username,
    fetch: 'no-posts',
  },
}

export const FetchOverides = {
  args: {
    username: userScottnath.username,
    fetch: 'true',
    name: "Meowy McMeowerstein",
    summary: "Spending time purring and sleepin",
    profile_image: 'cat-square.jpeg',
    joined_at: 'Jan 1, 1979',
    post_count: 1000000,
    latest_post: stringify({
      title: 'Meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow',
      url: 'http://example.com',
      cover_image: 'cat-1000-420.jpeg'
    }),
  },
}
