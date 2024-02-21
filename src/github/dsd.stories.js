
import { parseFetchedRepo } from './repository/content.js';
import { parseFetchedUser } from './user/content.js';
import { repoProfileComponents, repoStorydocker, userScottnath, repoFreeCodeCamp } from './fixtures';
import { repo, dsd } from './index.js';
import docs from './dsd.docs.mdx';


export default {
  title: 'GitHub/Declarative Shadow DOM',
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

export const Repository = {
  loaders: [
    async ({args}) => ({
      dsdOutput: await (await repo.dsd(args)),
    }),
  ],
  render: (args, { loaded: { dsdOutput } }) => {
    return `
      <github-repository-dsd>${dsdOutput}</github-repository-dsd>
  
    `;
  },
  args: {
    ...parseFetchedRepo(repoFreeCodeCamp),
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
      <github-user-dsd>${dsdOutput}</github-user-dsd>
  
    `;
  },
  args: {
    ...parseFetchedUser(userScottnath),
    repos: stringify([
      {
        ...parseFetchedRepo(repoProfileComponents),
        user_login: userScottnath.login
      }, 
      parseFetchedRepo(repoStorydocker)]),
  },
}
