import fs from 'fs';
import path from 'path';
import { pathFromRoot } from './utils.js';
import jsdoc2md from 'jsdoc-to-markdown';
import { outputFile } from 'fs-extra';

/**
 * 
 * @param {string} title - README title
 * @param {string} dir - Directory to read files from, relative from root
 * @returns jsdoc2md config object
 */
const generateJsdoc2Config = async (title, dir, files=[], filename="README.md") => {
  let template = `# ${title}\n\n{{>main}}`;
  if (fs.existsSync(path.join(dir, 'README.hbs'))) {
    template = fs.readFileSync(path.join(dir, 'README.hbs'), 'utf8');
  }
  return {
    files,
    'member-index-format': 'list',
    outputFile: `${dir}/${filename}`,
    exampleLang: 'js',
    template,
  }
}

/**
 * Generate README.md files from JSDoc comments
 * @todo set up for other directories
 */
export const generateDocs = async () => {
  const toDocs = [
    {
      title: 'profile-components',
      dir: pathFromRoot(),
      files: [
        pathFromRoot('src/github/user/index.js'),
        pathFromRoot('src/github/repository/index.js'),
        pathFromRoot('src/devto/user/index.js'),
        pathFromRoot('src/devto/post/index.js'),
      ],
    },
    {
      title: `GitHub profile components' utilities`,
      dir: pathFromRoot('src/github/utils'),
      files: pathFromRoot('src/github/utils/*.js'),
    },
    {
      title: 'GitHub utilities',
      dir: pathFromRoot('src/github'),
      files: [
        pathFromRoot('src/github/styles/index.js'),
        pathFromRoot('src/github/user/html.js'),
        pathFromRoot('src/github/user/content.js'),
        pathFromRoot('src/github/repository/html.js'),
        pathFromRoot('src/github/repository/content.js'),
        pathFromRoot('src/github/index.js'),
      ],
      filename: 'UTILITIES.md',
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
      title: 'DEV post component',
      dir: pathFromRoot('src/devto/post'),
      files: [
        pathFromRoot('src/devto/post/index.js'),
        pathFromRoot('src/devto/post/content.js'),
        pathFromRoot('src/devto/post/html.js'),
      ],
    },
    {
      title: 'DEV utilities',
      dir: pathFromRoot('src/devto'),
      files: [
        pathFromRoot('src/devto/styles/index.js'),
        pathFromRoot('src/devto/user/html.js'),
        pathFromRoot('src/devto/user/content.js'),
        pathFromRoot('src/devto/post/html.js'),
        pathFromRoot('src/devto/post/content.js'),
        pathFromRoot('src/devto/index.js'),
      ],
      filename: 'UTILITIES.md',
    },
  ]
  for (const toDoc of toDocs) {
    const githubComp = await generateJsdoc2Config(toDoc.title, toDoc.dir, toDoc.files, toDoc.filename);
    const res = await jsdoc2md.render(githubComp);
    await outputFile(githubComp.outputFile, res);
  }
}
