/**
 * @fileoverview Primer design system utilities for GitHub web components
 */

import { outputFile } from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse as parseYaml } from 'yaml';
import border from '@primer/primitives/tokens/functional/size/border.json' assert { type: "json" };
import typography from '@primer/primitives/tokens/functional/typography/typography.json' assert { type: "json" };
import typographyBase from '@primer/primitives/tokens/base/typography/typography.json' assert { type: "json" };
import colors from '@primer/primitives/dist/js/colors/index.js';
import octicons from '@primer/octicons';

import { primerThemes } from '../../../.storybook/primer-preview.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Fetches and processes statistical data from GitHut's tool. Reduces the
 *  data to the top 30 languages with the most pull requests in the last quarter
 * @see https://madnight.github.io/githut
 * @param {string} filename 
 * @returns set of strings which are the names of the top 30 languages
 */
export const getGithubData = async (filename = 'gh-pull-request.json') => {
  const ghDataRawSource = `https://raw.githubusercontent.com/madnight/githut/master/src/data/${filename}`;
  try {
    const ghData = await fetch(ghDataRawSource);
    const data = await ghData.json();
    const m = data.filter(d => {
      return d.year === '2023' && d.quarter === '2';
    }).map((d) => d.name).splice(0, 30);
    return m;
  } catch (err) {
    console.log('GitHut data fetch error', err);
  }
}

/**
 * Fetches the source file for GitHub's language colors and parses it into an object
 * @see https://github.com/github-linguist/linguist
 * @returns an object of Linguist language data
 */
export const getLangColorsSource = async () => {
  const langColorsSource = 'https://raw.githubusercontent.com/github-linguist/linguist/master/lib/linguist/languages.yml';
  try {
    const langFile = await fetch(langColorsSource);
    const textData = await langFile.text();
    return parseYaml(textData);
  } catch (err) {
    console.log('linguist fetch error', err);
  }
};

/**
 * Generates CSS for GitHub language colors
 * @returns CSS for GitHub language colors
 */
const getLangCss = async () => {
  const defaultColor = '#f1e05a';
  let css = `
/* GitHub language colors */
[data-detail="language"] {
  background-color: ${defaultColor};
`;
  const langObj = await getLangColorsSource();
  const langNames = await getGithubData();
  for (const lang of langNames) {
    if (langObj[lang]) {
      css += `  &[data-language="${lang}"] { background-color: ${langObj[lang].color}; }\n`;
    }
  }
  css += '}\n';
  return css;
}

/**
 * List of octicon names for SVGs needed for the primer CSS
 */
const svgs = [
  'repo-forked',
  'repo',
  'star',
  'eye',
  'mark-github',
  'people'
];

/**
 * Circle SVG for language color
 */
const svgCircle = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8"></circle></svg>';

/**
 * Generates a CSS variable for an svg
 * @param {string} name - svg name
 * @param {string} svg - svg element string
 * @returns CSS variable for svg
 */
const svgUrlCss = (name, svg) => `--svg-${name}: url('data:image/svg+xml, ${svg}');`;

/**
 * Get CSS variable for an octicon svg
 * @param {string} name - octicon name
 * @returns a CSS variable for an octicon svg
 */
const octiconSvg = (name) => {
  const options = { class: '', xmlns: 'http://www.w3.org/2000/svg'};
  // octicat logo should be 32x32
  if (name === 'mark-github') {
    options.width = 32;
    options.height = 32;
  }
  const svg = octicons[name]
    .toSVG(options)
    .replace(' class=""', '')
    .replace(' aria-hidden="true"', '')
    .replace(' version="1.1"', '');
  if (name === 'mark-github') {
    console.log(svg);
  }

  return svgUrlCss(name, svg)
}

/**
 * Generates CSS for SVGs
 * @returns CSS for SVGs
 */
const getSvgCss = () => {
  let css = `
  /* SVG & Octicon styles */\n`;
  // add circle svg
  css += `  ${svgUrlCss('circle', svgCircle)}\n`;
  // add octicon svgs
  svgs.forEach((svg) => {
    css += `  ${octiconSvg(svg)}\n`;
  });
  return css;
}


/**
 * Get global primer styles needed for GitHub web components
 * @returns {string} global primer style variables
 */
const globalStyles = async () => {
  const variables = {};
  variables['--fontStack-system'] = typography['<namespace>'].fontStack.system.value;
  variables['--base-text-weight-light'] = typographyBase.base.text.weight.light.value;
  variables['--base-text-weight-normal'] = typographyBase.base.text.weight.normal.value;
  variables['--base-text-weight-medium'] = typographyBase.base.text.weight.medium.value;
  variables['--base-text-weight-semibold'] = typographyBase.base.text.weight.semibold.value;
  variables['--borderWidth-thin'] = border['<namespace>'].borderWidth.thin.value;
  variables['--borderWidth-thick'] = border['<namespace>'].borderWidth.thick.value;
  variables['--borderRadius-small'] = border['<namespace>'].borderRadius.small.value;
  variables['--borderRadius-medium'] = border['<namespace>'].borderRadius.medium.value;

  let css = `
/* Global primer styles */
:host {
`;
  Object.keys(variables).forEach((key) => {
    css += `  ${key}: ${variables[key]};\n`;
  });
  css += getSvgCss();
  css += `}\n`;
  css += await getLangCss();

  return css;
}

/**
 * Get theme colors of a primer theme
 * @param {object} colors primer theme colors
 * @returns {string} primer theme colors
 */
const getThemeColors = (colors) => {
  const variables = {};
  variables['--color-avatar-border'] = colors.avatar.border;
  variables['--color-border-default'] = colors.border.default;
  variables['--color-canvas-default'] = colors.canvas.default;
  variables['--color-canvas-subtle'] = colors.canvas.subtle;
  variables['--color-fg-default'] = colors.fg.default;
  variables['--color-fg-muted'] = colors.fg.muted;
  variables['--color-fg-subtle'] = colors.fg.subtle;
  variables['--color-fg-onemphasis'] = colors.fg.onEmphasis;
  variables['--color-fg-accent'] = colors.accent.fg;
  variables['--color-fg-danger'] = colors.danger.fg;
  let css = '';
  Object.keys(variables).forEach((key) => {
    css += `  ${key}: ${variables[key]};\n`;
  });

  return css;
}

/**
 * Generate CSS for one primer theme
 * @param {string} theme - name of primer theme
 * @returns {string} primer theme color variables
 */
const getTheme = (theme, isDefault = false) => {
  const dataTheme = `[data-theme="${theme.value}"]`;
  const title = isDefault ? `Default Theme (${theme.title})` : `${theme.title} Theme`;
  let output = `\n/* ${title} */`
  output += isDefault ? ':host {' : `:host(${dataTheme}) {\n`;
  output += getThemeColors(colors.default[theme.value]);
  output += '}';
  return output;
}

/**
 * Get global and theme-specific primer styles needed for GitHub web components
 * @returns {string} primer theme color variables
 */
export const getPrimerCss = async () => {
  let css = '/** This file is auto-generated, do not edit **/\n';
  
  css += await globalStyles();
  css += getTheme(primerThemes.find(t => t.value === 'dark'), true);
  primerThemes.forEach((theme) => {
    css += getTheme(theme);
  });
  return css;
}

/**
 * Write primer css file to styles directory
 */
export const writePrimerCssFile = async () => {
  const filename = 'vars-primer.css';
  const css = await getPrimerCss();
  
  try {
    await outputFile(path.join(__dirname, '../styles', filename), css);
  } catch (err) {
    console.error(err)
  }
}
