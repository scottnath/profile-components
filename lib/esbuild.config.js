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

const componentUtils = [
  {
    name: 'github-utils',
    entry: './src/github/index.js',
  },
  {
    name: 'devto-utils',
    entry: './src/devto/index.js',
  }
]

/**
 * Entrypoints for esbuild generated from custom elements manifest
 *  which _must_ be generated before this script is triggered
 */

cem.modules.forEach(elm => {
  const name = elm.exports.find(elm => elm.kind === 'custom-element-definition').name;

  esbuild.build({
    entryPoints: [pathFromRoot(elm.path)],
    bundle: true,
    format: 'esm',
    entryNames: name,
    outbase: src,
    outdir: dist,
    plugins: [
      inlineImportPlugin({
        filter: /\?inline$/,
      }),
    ],
  });
});

/**
 * Entrypoints for esbuild generated from component utils
 */
componentUtils.forEach(elm => {
  esbuild.build({
    entryPoints: [pathFromRoot(elm.entry)],
    bundle: true,
    format: 'esm',
    entryNames: elm.name,
    outbase: src,
    outdir: dist,
    plugins: [
      inlineImportPlugin({
        filter: /\?inline$/,
      }),
    ],
  });
});
