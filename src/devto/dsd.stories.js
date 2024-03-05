
import { parseFetchedPost } from './post/content.js';
import { parseFetchedUser } from './user/content.js';
import { default as userScottnath } from './fixtures/generated/user--scottnath.json';
import { default as postProfileComponents } from './fixtures/generated/post--profile-components.json';
import { default as postDependabot } from './fixtures/generated/post--dependabot.json';
import { default as postBugfix } from './fixtures/generated/post--bugfix-multi-vite.json';
import { getElements, ensureElements, ensureScreenRead } from './post/post.shared-spec';
import { 
  getElements as getElementsUser,
  ensureElements as ensureElementsUser,
  ensureScreenRead as ensureScreenReadUser
} from './user/user.shared-spec';
import { post, dsd } from './index.js';
import docs from './dsd.docs.mdx';


export default {
  title: 'DevTo/Declarative Shadow DOM',
  parameters: {
    docs: {
      page: docs
    },
  },
  tags: ['autodocs'],
  decorators: [(story) => `${story()}
    <script>

      (function attachShadowRoots(root) {
        root.querySelectorAll("template[shadowrootmode]").forEach(template => {
          const mode = template.getAttribute("shadowrootmode");
          const shadowRoot = template.parentNode.attachShadow({ mode });
          shadowRoot.appendChild(template.content);
          template.remove();
          attachShadowRoots(shadowRoot);
        });
      })(document);
    </script>
  `],
};

export const Post = {
  loaders: [
    async ({args}) => ({
      dsdOutput: await (await post.dsd(args)),
    }),
  ],
  render: (args, { loaded: { dsdOutput } }) => {
    return `
      <devto-post-dsd>${dsdOutput}</devto-post-dsd>
  
    `;
  },
  args: {
    ...parseFetchedPost(postProfileComponents)
  },
  play: async ({ args, canvasElement, step }) => {
    const elements = await getElements(canvasElement);
    await ensureElements(elements, args);
    await ensureScreenRead(elements, args);
  }
}

export const User = {
  loaders: [
    async ({args}) => ({
      dsdOutput: await (await dsd(args)),
    }),
  ],
  render: (args, { loaded: { dsdOutput } }) => {
    return `
      <devto-user-dsd data-theme="dark">${dsdOutput}</devto-user-dsd>
  
    `;
  },
  args: {
    ...parseFetchedUser(userScottnath),
    latest_post: stringinator(parseFetchedPost(postDependabot)),
    popular_post: stringinator(parseFetchedPost(postBugfix)),
  },
  play: async ({ args, canvasElement, step }) => {
    const elements = await getElementsUser(canvasElement);
    const argsAfterFetch = {
      ...args,
      latest_post: {
        ...parseFetchedPost(postDependabot),
      },
      popular_post: {
        ...parseFetchedPost(postBugfix),
      },
    };
    await ensureElementsUser(elements, argsAfterFetch);
    await ensureScreenReadUser(elements, argsAfterFetch);
  }
}
