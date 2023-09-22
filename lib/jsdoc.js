import { pathFromRoot } from './utils.js';
import jsdoc2md from 'jsdoc-to-markdown';
import { outputFile } from 'fs-extra';

/**
 * 
 * @param {string} title - README title
 * @param {string} dir - Directory to read files from, relative from root
 * @returns jsdoc2md config object
 */
const generateJsdoc2Config = (title, dir) => {
  const template = `# ${title}\n\n{{>main}}`;
  return {
    files: pathFromRoot(`${dir}/*.js`),
    'member-index-format': 'list',
    outputFile: pathFromRoot(`${dir}/README.md`),
    template,
  }
}

/**
 * Generate README.md files from JSDoc comments
 * @todo set up for other directories
 */
export const generateDocs = async () => {
  const githubUtils = generateJsdoc2Config(`GitHub profile components' utilities`, 'src/github/utils');
  const res = await jsdoc2md.render(githubUtils);
  await outputFile(githubUtils.outputFile, res);
}
