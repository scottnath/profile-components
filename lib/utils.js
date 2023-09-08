import path from 'path'
import { fileURLToPath } from 'url'

/**
 * Helper to replace losing `__dirname` in ES Modules
 * @param {string} moduleUrl - the import.meta.url of file which needs the dirname
 * @returns 
 */
export const getDirName = function (moduleUrl) {
  const filename = fileURLToPath(moduleUrl)
  return path.dirname(filename)
}

/**
 * Helper to get commonly used directory paths
 * @returns object of directory paths
 */
export const getModulePaths = function () {
  const __dirname = getDirName(import.meta.url);
  const root = path.join(__dirname, '..');
  return {
    root,
    dist: path.join(root, 'dist'),
    lib: path.join(root, 'lib'),
    src: path.join(root, 'src'),
  }
}

/**
 * Guickie to combine a path to root
 * @param {string} relPath - relative path from root
 * @returns absolute path from root
 */
export const pathFromRoot = (relPath = '') => path.join(getModulePaths().root, relPath);
