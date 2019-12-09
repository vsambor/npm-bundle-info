/**
 * Holdes the entire logic of bundle route endpoints.
 * 
 * Logical steps:
 * 1. validates the package
 * 2. get all needed versions
 * 3. check if each version exists in cache
 * 4. depends on previous step, it returns the bundle data from cache or it processes the size
 * 5. returns the bundle data
 ***/

const validatorService = require('../../services/bundle/validatorService')
const cacheService = require('../cache/cacheService')
const { installPackage } = require('../../services/bundle/installService')
const { getSize } = require('../../services/bundle/sizeService')

/**
 * Manages all the steps to get the bundle size.
 * 
 * @param {String} name - bundle name
 * @param {String} version - bundle version
 */
async function getBundleSize(name, version) {
  // 1. validate packge...

  // 2. const versions = getVersions(name, version)

  // const cacheKey = `${name}-${version}`
  // 3. const cachedValue = cacheService.get(cacheKey);

  // if (cachedValue) {
  //    // returns
  // }

  // 4.
  const packagePath = await installPackage(name, version)
  const size = await getSize(name, packagePath)

  // 5. 
  const bundleSizeData = {
    stats: {
      minified: 34500,
      zipped: 1500
    },
    chart: {
      compressionData: [
        { name: 'Minified', data: [55, 60] },
        { name: 'Minified + Gzipped', data: [45, 40] }
      ],
      versions: ['v1.0', 'v1.1']
    }
  }

  return bundleSizeData;
}

module.exports = {
  getBundleSize
}