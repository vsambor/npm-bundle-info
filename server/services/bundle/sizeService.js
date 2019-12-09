/**
 * Handles the bundle size retrieval.
 * 
 * Main roles:
 * - calls build service which generats stats.js
 * - retireves stats.js and get needed info
 * - removes the package
 ***/

const fs = require('fs')
const path = require('path')
const { build } = require('./buildService')
const { removePackage } = require('./installService')

/**
 * Returns minified and gzipped size for a given package.
 * 
 * @param {String} packageName 
 * @param {String} packagePath 
 * 
 * @returns {Object} - { minifiedSize, gzippedSize }
 */
async function getSize(packageName, packagePath) {
  await build(packageName, packagePath)

  const rawStats = fs.readFileSync(path.join(packagePath, 'stats.js'))
  const stats = JSON.parse(rawStats)

  const minifiedSize = stats['bundle.js'].minified
  const gzippedSize = stats['bundle.js'].gzipped

  await removePackage(packagePath)
  return { minifiedSize, gzippedSize }
}

module.exports = {
  getSize
}