/**
 * Validates a package name by using pacote (https://www.npmjs.com/package/pacote).
 */

const pacote = require('pacote')

/**
 * Resolves the bundle name to a valid version and name.
 */
async function resolvePackage(bundleName) {
  try {
    return await pacote.manifest(bundleName, { 'full-metadata': true })
  } catch (err) {
    // TODO - handle errors properly.
    // if (err.code === 'ETARGET') {
    //   throw new Error('PackageVersionMismatchError', null, {
    //     validVersions: Object.keys(err.distTags).concat(err.versions),
    //   })
    // } else {
    //   throw new Error('PackageNotFoundError', err)
    // }
  }
}