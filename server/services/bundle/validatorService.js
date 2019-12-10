/**
 * Validates a package name by using pacote (https://www.npmjs.com/package/pacote).
 ***/

const pacote = require('pacote')

/**
 * Resolves the package name to a valid version and name.
 * 
 * @param {String} packageName
 * @returns {Boolean} - true if is valid, false otherwise
 */
async function isPackageValid(packageName) {
  try {
    return !!await pacote.manifest(packageName, { 'full-metadata': true })
  } catch (err) {
    return false
  }
}

module.exports = {
  isPackageValid
}
