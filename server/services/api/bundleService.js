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

const { isPackageValid } = require('../bundle/validatorService')
const CacheService = require('../cacheService')
const { installPackage } = require('../bundle/installService')
const { getSize } = require('../bundle/sizeService')
const VersionService = require('../bundle/versionService')

/**
 * Manages all the steps to get the bundle size.
 * 
 * @param {String} packageName
 * @param {String} packageVersion
 */
async function getBundleSize(packageName, packageVersion) {
  const isValid = await isPackageValid(packageName)

  if (!isValid) {
    // TODO - handle better.
    throw Error('Package name not valid!')
  }

  const versionsAndSizes = await _getVersionsAndSizes(packageName, packageVersion)

  return _cretateBundleData(versionsAndSizes)
}

async function _getVersionsAndSizes(packageName, packageVersion) {
  const versionsAndSizes = []
  const versionService = new VersionService()
  const cache = new CacheService('cache')

  const versions = await versionService.getVersions(packageName, packageVersion)

  for (const version of versions) {
    const cacheKey = `${packageName}-${version}`
    let versionSize = cache.get(cacheKey)

    if (!versionSize) {
      const packagePath = await installPackage(packageName, version)
      versionSize = await getSize(packageName, packagePath)

      cache.set(cacheKey, versionSize)
    }

    versionsAndSizes.push({ version: version, sizes: versionSize })
  }

  return versionsAndSizes
}

function _cretateBundleData(versionsSizes) {
  const bundleSizeData = {
    stats: {},
    chart: {
      compressionData: [
        { name: 'Minified', data: [] },
        { name: 'Minified + Gzipped', data: [] }
      ],
      versions: []
    }
  }

  if (versionsSizes.length) {
    bundleSizeData.stats = versionsSizes[0].sizes

    for (versionSize of versionsSizes) {
      // Using shift to have the bigger version first on the frontend chart.
      bundleSizeData.chart.compressionData[0]['data'].unshift(versionSize.sizes.minifiedSize)
      bundleSizeData.chart.compressionData[1]['data'].unshift(versionSize.sizes.gzippedSize)
      bundleSizeData.chart.versions.unshift(versionSize.version)
    }
  }

  return bundleSizeData
}

module.exports = {
  getBundleSize
}