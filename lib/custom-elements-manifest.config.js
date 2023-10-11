/**
 * @fileoverview Custom Elements Manifest configuration
 * @see https://custom-elements-manifest.open-wc.org/
 */
import { readmePlugin } from "./cem-readme-plugin.js"
import { getModulePaths } from './utils.js';

export default {
  globs: [
    'src/github/repository/index.js',
    'src/github/user/index.js',
    'src/devto/user/index.js',
    'src/devto/post/index.js',
  ], 
  exclude: [],
  dependencies: false,
  dev: false,
  packagejson: true,
}