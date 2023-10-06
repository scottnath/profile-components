import { pathFromRoot } from './utils.js';
import jsdoc2md from 'jsdoc-to-markdown';
import { outputFile } from 'fs-extra';

/**
 * 
 * @param {string} title - README title
 * @param {string} dir - Directory to read files from, relative from root
 * @returns jsdoc2md config object
 */
const generateJsdoc2Config = (title, dir, files=[]) => {
  const template = `# ${title}\n\n{{>main}}`;
  return {
    files,
    'member-index-format': 'list',
    outputFile: `${dir}/README.md`,
    exampleLang: 'js',
    template,
  }
}

/**
 * Generate README.md files from JSDoc comments
 * @todo set up for other directories
 */
export const generateDocs = async () => {
  // const githubUtils = generateJsdoc2Config(`GitHub profile components' utilities`, 'src/github/utils');
  // const res = await jsdoc2md.render(githubUtils);
  const toDocs = [
    {
      title: `GitHub profile components' utilities`,
      dir: pathFromRoot('src/github/utils'),
      files: pathFromRoot('src/github/utils/*.js'),
    },
    {
      title: 'GitHub user profile component',
      dir: pathFromRoot('src/github/user'),
      files: [
        pathFromRoot('src/github/user/index.js'),
        pathFromRoot('src/github/user/content.js'),
        pathFromRoot('src/github/user/html.js'),
      ],
    },
    {
      title: 'GitHub repository details component',
      dir: pathFromRoot('src/github/repository'),
      files: [
        pathFromRoot('src/github/repository/index.js'),
        pathFromRoot('src/github/repository/content.js'),
        pathFromRoot('src/github/repository/html.js'),
      ],
    },
    {
      title: `DEV profile components' utilities`,
      dir: pathFromRoot('src/devto/utils'),
      files: pathFromRoot('src/devto/utils/*.js'),
    },
    {
      title: 'Dev user profile component',
      dir: pathFromRoot('src/devto/user'),
      files: [
        pathFromRoot('src/devto/user/index.js'),
        pathFromRoot('src/devto/user/content.js'),
        pathFromRoot('src/devto/user/html.js'),
      ],
    },
    {
      title: 'Dev post component',
      dir: pathFromRoot('src/devto/post'),
      files: [
        pathFromRoot('src/devto/post/index.js'),
        pathFromRoot('src/devto/post/content.js'),
        pathFromRoot('src/devto/post/html.js'),
      ],
    },
  ]
  for (const toDoc of toDocs) {
    const githubComp = generateJsdoc2Config(toDoc.title, toDoc.dir, toDoc.files);
    const res = await jsdoc2md.render(githubComp);
    await outputFile(githubComp.outputFile, res);
  }
}
