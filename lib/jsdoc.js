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
      // @todo automate changing `Modules` to `Components`
    },
    {
      title: `GitHub profile components' helpers`,
      dir: pathFromRoot('src/github/helpers'),
      files: pathFromRoot('src/github/helpers/*.js'),
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
    },
    {
      title: `DEV profile components' helpers`,
      dir: pathFromRoot('src/devto/helpers'),
      files: pathFromRoot('src/devto/helpers/*.js'),
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
    },
  ]
  for (const toDoc of toDocs) {
    const githubComp = await generateJsdoc2Config(toDoc.title, toDoc.dir, toDoc.files, toDoc.filename);
    const res = await jsdoc2md.render(githubComp);
    await outputFile(githubComp.outputFile, res);
  }
}
