
import { generateMockResponse } from '../utils/testing';
import { parseFetchedUser } from './content';
import { default as userScottnath } from '../fixtures/generated/user--scottnath.json';

import './index.js';

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
  },
  // play: async ({ args, canvasElement, step }) => {
  //   const elements = await getElements(canvasElement);
  //   await ensureElements(elements, args);
  // }
}

export const UserFetch = {
  args: {
    username: userScottnath.username,
    fetch: true,
  },
}