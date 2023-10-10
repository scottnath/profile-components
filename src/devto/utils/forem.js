/**
 * @name Forem-Utilities
 * @module
 * @typicalname foremUtils
 * @description Forem utilities to generate assets for dev.to web components
 * @author @scottnath
 */

import { outputFile } from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** Output file */
const generatedFile = path.join(__dirname, '../styles', 'vars-devto.css');

/**
 * Forem CSS file source directory
 */
const foremRawSource = 'https://raw.githubusercontent.com/forem/forem/main/app/assets/stylesheets/';

/**
 * Get Forem CSS file's contents
 * @param {string} filename - css file name
 * @returns {string} contents of css file from Forem repo
 */
export const getForemCSS = async (filename = '_variables.scss', dir='config') => {
  const foremCSSRawSource = `${foremRawSource}${dir}/${filename}`;
  try {
    const foremCSS = await fetch(foremCSSRawSource);
    const css = await foremCSS.text();
    return css;
  } catch (err) {
    console.log('Forem CSS fetch error', err);
  }
}

/**
 * Styles that are hard to regex and SVGs
 * @type {string[]}
 */
const copiedStyles = [
  `--ff-sans-serif: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';`,
  /**
   * dev.to logo
   * @see https://dev.to/brand
   */
  `--svg-dev-logo: url('data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" width="28" height="32" viewBox="0 0 448 512"><path d="M120.12 208.29c-3.88-2.9-7.77-4.35-11.65-4.35H91.03v104.47h17.45c3.88 0 7.77-1.45 11.65-4.35 3.88-2.9 5.82-7.25 5.82-13.06v-69.65c-.01-5.8-1.96-10.16-5.83-13.06zM404.1 32H43.9C19.7 32 .06 51.59 0 75.8v360.4C.06 460.41 19.7 480 43.9 480h360.2c24.21 0 43.84-19.59 43.9-43.8V75.8c-.06-24.21-19.7-43.8-43.9-43.8zM154.2 291.19c0 18.81-11.61 47.31-48.36 47.25h-46.4V172.98h47.38c35.44 0 47.36 28.46 47.37 47.28l.01 70.93zm100.68-88.66H201.6v38.42h32.57v29.57H201.6v38.41h53.29v29.57h-62.18c-11.16.29-20.44-8.53-20.72-19.69V193.7c-.27-11.15 8.56-20.41 19.71-20.69h63.19l-.01 29.52zm103.64 115.29c-13.2 30.75-36.85 24.63-47.44 0l-38.53-144.8h32.57l29.71 113.72 29.57-113.72h32.58l-38.46 144.8z"/></svg>');`,
  /**
   * Forem icon for a cake (used with "Joined" date)
   * @see https://github.com/forem/forem/blob/main/app/assets/images/cake.svg?short_path=e3c7d41
   */
  `--svg-cake-icon: url('data:image/svg+xml, <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8 6v3.999h3V6h2v3.999h3V6h2v3.999L19 10a3 3 0 012.995 2.824L22 13v1c0 1.014-.377 1.94-.999 2.645L21 21a1 1 0 01-1 1H4a1 1 0 01-1-1v-4.36a4.025 4.025 0 01-.972-2.182l-.022-.253L2 14v-1a3 3 0 012.824-2.995L5 10l1-.001V6h2zm11 6H5a1 1 0 00-.993.883L4 13v.971l.003.147a2 2 0 003.303 1.4c.363-.312.602-.744.674-1.218l.015-.153.005-.176c.036-1.248 1.827-1.293 1.989-.134l.01.134.004.147a2 2 0 003.992.031l.012-.282c.124-1.156 1.862-1.156 1.986 0l.012.282a2 2 0 003.99 0L20 14v-1a1 1 0 00-.883-.993L19 12zM7 1c1.32.871 1.663 2.088 1.449 2.888a1.5 1.5 0 11-2.898-.776C5.85 2.002 7 2.5 7 1zm5 0c1.32.871 1.663 2.088 1.449 2.888a1.5 1.5 0 01-2.898-.776C10.85 2.002 12 2.5 12 1zm5 0c1.32.871 1.663 2.088 1.449 2.888a1.5 1.5 0 01-2.898-.776C15.85 2.002 17 2.5 17 1z"/></svg>');`,
  /**
   * Forem icon for a post
   * @see https://github.com/forem/forem/blob/main/app/assets/images/post.svg?short_path=b79fa43
   */
  `--svg-post-icon: url('data:image/svg+xml, <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 22H5a3 3 0 01-3-3V3a1 1 0 011-1h14a1 1 0 011 1v12h4v4a3 3 0 01-3 3zm-1-5v2a1 1 0 002 0v-2h-2zm-2 3V4H4v15a1 1 0 001 1h11zM6 7h8v2H6V7zm0 4h8v2H6v-2zm0 4h5v2H6v-2z"/></svg>');`,

  `--base: #090909;`
]

/**
 * Get one CSS variable's dependent variable
 * @param {string} style - a CSS variable
 * @param {string} css - a css file converted to a string
 * @returns a css variable and its value as a string
 */
export const getOneVarStyle = (style, css) => {
  const v = style.match(/var\((--.+?)\)/);
  if (!v) return null;
  const reg = new RegExp(`(${v[1]}.+);`, 'g');
  const styl = css.match(reg);
  return styl && styl.length ? styl[0] : null;
}

/**
 * Get one CSS variable
 * @param {string} name - a CSS variable name
 * @param {string} css - a css file converted to a string
 * @returns a css variable and its value as a string
 */
export const getOneStyle = (name, css) => {
  const reg = new RegExp(`(${name}.+);`);
  const style = css.match(reg)[0];
  return style;
}

/**
 * Generates a set of dev.to/forem style variables
 * @returns {string[][]} a set of arrays of CSS variables
 */
export const getDevStyleVariables = async () => {
  const topVars = [];
  const topVarsDark = [];
  const vars = [];
  const dark = [];
  const styles = [
    '--profile-brand-color: rgb(var(--black));'
  ];

  const duplicateCheck = (style) => {
    const all = [...topVars, ...vars, ...styles];
    return all.includes(style);
  }

  const css = await getForemCSS('_colors.css');
  const cssVars = await getForemCSS('_variables.scss');
  const cssDark = await getForemCSS('dark.css', 'themes');

  const topStyleVars = [
    '--white',
    '--black',
    '--radius',
  ]
  topStyleVars.forEach((s) => {
    const style = getOneStyle(s, cssVars);
    if (!style) return;
    topVars.push(style);
  });

  const baseVars = css.match(/(--base.+:.+);/g);
  baseVars.forEach((b) => topVars.push(b));
  const baseVarsDark = cssDark.match(/(--base.+:.+);/g);
  baseVarsDark.forEach((b) => topVarsDark.push(b));

  const accentVars = cssVars.match(/(--accent-.+);/g);
  accentVars.forEach((b) => {
    vars.push(b);
    const style = getOneVarStyle(b, cssVars);
    (style && !duplicateCheck(style)) ? topVars.push(style) : null;
  });

  const accentColors = css.match(/( --accent-brand.+);/g);
  accentColors.forEach(s => vars.push(s.trim()));
  const accentColorsDark = cssDark.match(/( --accent-brand.+);/g);
  accentColorsDark.forEach(s => {
    dark.push(s.trim());
    const style = getOneVarStyle(s, cssVars);
    (style && !duplicateCheck(style)) ? topVars.push(style) : null;
  });

  const linkColors = css.match(/( --link-color.+);/g);
  linkColors.forEach((b) => {
    vars.push(b.trim());
    let style = getOneVarStyle(b, cssVars);
    (style && !duplicateCheck(style)) ? topVars.push(style) : null;
  });

  const linkColorsDark = cssDark.match(/( --link-color.+);/g);
  linkColorsDark.forEach((b) => {
    dark.push(b.trim());
    let style = getOneVarStyle(b, cssVars);
    (style && !duplicateCheck(style)) ? topVarsDark.push(style) : null;
  });
  
  const weights = cssVars.match(/(--fw-.+);/g);
  weights.forEach((w) => vars.push(w));
  
  const specificStylesCss = [
    '--card-bg',
    '--card-border',
  ]
  specificStylesCss.forEach((s) => {
    const style = getOneStyle(s, css);
    if (!style) return;
    if(style.includes('var(--')) {
      const subStyle = getOneVarStyle(style, cssVars);
      (subStyle && !duplicateCheck(subStyle)) ? topVars.push(subStyle) : null;
    }
    styles.push(style);
  });
  specificStylesCss.forEach((s) => {
    const style = getOneStyle(s, cssDark);
    if (!style) return;
    if(style.includes('var(--')) {
      const subStyle = getOneVarStyle(style, cssVars);
      (subStyle && !duplicateCheck(subStyle)) ? topVarsDark.push(subStyle) : null;
    }
    dark.push(style);
  });

  const body = css.match(/(  --body-.+);/g);
  body.forEach((b) => {
    vars.push(b);
    const style = getOneVarStyle(b, cssVars);
    style ? topVars.push(style) : null;
  })
  const bodyDark = cssDark.match(/(  --body-.+);/g);
  bodyDark.forEach((b) => {
    dark.push(b);
    const style = getOneVarStyle(b, cssVars);
    style ? topVarsDark.push(style) : null;
  })

  const ctas = css.match(/(  --cta-branded.+);/g);
  ctas.forEach((b) => {
    vars.push(b);
    const style = getOneVarStyle(b, cssVars);
    (style && !duplicateCheck(style)) ? topVars.push(style) : null;
  })
  const ctasDark = cssDark.match(/(  --cta-branded.+);/g);
  ctasDark.forEach((b) => {
    dark.push(b);
    const style = getOneVarStyle(b, cssVars);
    (style && !duplicateCheck(style)) ? topVarsDark.push(style) : null;
  })

  const sections = [copiedStyles];
  sections.push(topVars);
  sections.push(vars);
  sections.push(styles);
  const darkSections = [topVarsDark, dark];
  return {
    all: sections,
    dark: darkSections,
  };
}

/**
 * Get global and theme-specific styles needed for DEV web components
 * @returns {string} DEV css variables as one string
 */
export const getDevCss = async () => {
  let css = '/** This file is auto-generated, do not edit **/\n';
  css += `
/* Imported DEV variables */
:host {
`;
  const sections = await getDevStyleVariables();
  sections.all.forEach(globals => {
    globals
      .filter((item, index) => globals.indexOf(item) === index)
      .forEach(s => {
        css += s.startsWith('  ') ? s : `  ${s}`;
        css += '\n';
      });
    css += '\n';
  })
  css += `}\n`;
  css += `
/* dark variables */
:host([data-theme="dark"]) {
`;
  sections.dark.forEach(globals => {
    globals
      .filter((item, index) => globals.indexOf(item) === index)
      .forEach(s => {
        css += s.startsWith('  ') ? s : `  ${s}`;
        css += '\n';
      });
    css += '\n';
  })
  css += `}\n`;
  return css;
}

/**
 * Write DEV css file to repo directory
 */
export const writeDevCssFile = async () => {
  const css = await getDevCss();
  
  try {
    await outputFile(generatedFile, css);
  } catch (err) {
    console.error(err)
  }
}
