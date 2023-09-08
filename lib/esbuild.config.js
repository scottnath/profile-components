/**
 * @fileoverview esbuild configuration for custom elements
 * @see https://esbuild.github.io/api
 * @see https://github.com/esbuild/community-plugins
 */
import esbuild from 'esbuild';
import inlineImportPlugin from 'esbuild-plugin-inline-import';

import { getModulePaths, pathFromRoot } from './utils.js';
import cem from '../custom-elements.json' assert { type: 'json' };

const { src, dist } = getModulePaths();

/**
 * Entrypoints for esbuild generated from custom elements manifest
 *  which _must_ be generated before this script is triggered
 * @type {string[]}
 */
const entryPoints = cem.modules.map(elm => pathFromRoot(elm.path));

esbuild.build({
  entryPoints,
  bundle: true,
  format: 'esm',
  entryNames: '[dir]-[name]',
  outbase: src,
  outdir: dist,
  plugins: [
    inlineImportPlugin({
      filter: /\?inline$/,
    }),
  ],
});