
import { generateMockResponse } from '../helpers/testing';
import { parseFetchedUser } from './content';
import { parseFetchedPost } from '../post/content';
import { default as userScottnath } from '../fixtures/generated/user--scottnath.json';
import { default as postDependabot } from '../fixtures/generated/post--dependabot.json';
import { default as postBugfix } from '../fixtures/generated/post--bugfix-multi-vite.json';

import './index.js';

export default {
  title: 'DevTo/devto-user',
  component: 'devto-user',
  tags: ['autodocs'],
  render: (args) => {
    const attributes = attrGen(args);
  
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

export const UserPosts = {
  args: {
    ...User.args,
    latest_post: stringify(parseFetchedPost(postDependabot)),
    popular_post: stringify(parseFetchedPost(postBugfix)),
  }
}

export const OnlyRequired = {
  args: {
    username: userScottnath.username,
    name: userScottnath.name,
  },
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
    popular_post: stringify({
      title: 'Meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow',
      url: 'http://example.com',
      cover_image: 'cat-1000-420.jpeg'
    }),
    latest_post: stringify({
      title: 'Mess? Make your human blame the dog',
      url: 'http://example.com',
      cover_image: 'cat-glasses-1000-420.jpeg'
    }),
  },
}

export const FetchError = {
  args: {
    username: 'not-a-real-user',
    fetch: true,
  },
  parameters: {
    mockData: [
      generateMockResponse({username: 'not-a-real-user'}, 'users', 404),
    ]
  },
}

export const ContainerCheck = {
  args: {
    ...FetchOverides.args,
  },

  render: (args) => {
    const attributes = attrGen(args);
  
    return `
      <div style="display: flex; flex-wrap: wrap; width: 1000px; margin: 1em;">
        <devto-user ${attributes} theme="dark" style="flex: 0 0 200px;"></devto-user>
        <devto-user ${attributes} theme="light" style="flex: 0 0 200px;"></devto-user>
        <devto-user ${attributes} theme="dark" style="flex: 0 0 300px;"></devto-user>
        <devto-user ${attributes} theme="light" style="flex: 0 0 300px;"></devto-user>
        <devto-user ${attributes} theme="dark" style="flex: 0 0 400px;"></devto-user>
        <devto-user ${attributes} theme="light" style="flex: 0 0 400px;"></devto-user>
      </div>
    `;
  }
}
