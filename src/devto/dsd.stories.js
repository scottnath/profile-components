
import { parseFetchedPost } from './post/content.js';
import { parseFetchedUser } from './user/content.js';
import { default as userScottnath } from './fixtures/generated/user--scottnath.json';
import { default as postProfileComponents } from './fixtures/generated/post--profile-components.json';
import { default as postDependabot } from './fixtures/generated/post--dependabot.json';
import { default as postBugfix } from './fixtures/generated/post--bugfix-multi-vite.json';
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
    latest_post: stringify(parseFetchedPost(postDependabot)),
    popular_post: stringify(parseFetchedPost(postBugfix)),
  },
}
