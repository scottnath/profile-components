/**
 * @fileoverview Primer design system utilities for GitHub web components
 */

import { outputFile } from 'fs-extra';
import path from 'node:path';
import { fileURLToPath } from 'url';
import border from '@primer/primitives/tokens/functional/size/border.json' assert { type: "json" };
import typography from '@primer/primitives/tokens/functional/typography/typography.json' assert { type: "json" };
import typographyBase from '@primer/primitives/tokens/base/typography/typography.json' assert { type: "json" };
import colors from '@primer/primitives/dist/js/colors/index.js';

import { primerThemes } from '../../../.storybook/primer-preview.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Get global primer styles needed for GitHub web components
 * @returns {string} global primer style variables
 */
const globalStyles = () => {
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
:host {`;
  Object.keys(variables).forEach((key) => {
    css += `  ${key}: ${variables[key]};`;
  });
  css += `}\n`;

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
    css += `  ${key}: ${variables[key]};`;
  });

  return css;
}

/**
 * Get primer theme colors for on theme
 * @param {string} theme - name of primer theme
 * @returns {string} primer theme color variables
 */
const getTheme = (theme, isDefault = false) => {
  const dataTheme = `[data-theme="${theme.value}"]`;
  const title = isDefault ? `Default Theme (${theme.title})` : `${theme.title} Theme`;
  let output = `\n/* ${title} */`
  output += isDefault ? ':host {' : `:host(${dataTheme}) {`;
  output += getThemeColors(colors.default[theme.value]);
  output += '}';
  return output;
}

/**
 * Get global and theme-specific primer styles needed for GitHub web components
 * @returns {string} primer theme color variables
 */
export const getPrimerCss = () => {
  let css = '/** This file is auto-generated, do not edit **/\n';
  
  css += globalStyles();
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
  const css = getPrimerCss();

  try {
    await outputFile(path.join(__dirname, '../styles', filename), css);
  } catch (err) {
    console.error(err)
  }
}
