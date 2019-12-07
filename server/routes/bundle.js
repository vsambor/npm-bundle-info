const express = require('express')
const router = express.Router()
const cacheService = require('../services/cacheService')

/* GET bundle listing. */
router.get('/', (req, res, next) => {
  const name = req.query.name
  const version = req.query.version

  // const versions = getVersions(name, version)

  // const cacheKey = `${name}-${version}`
  // const cachedValue = cacheService.get(cacheKey);

  // if (cachedValue) {
  //    // returns
  // }


  // TODO
  // 1. Check cache for all needed versions

  // 2. Download and process versions which are not in cache

  // 3. Return bundleData

  const bundleData = {
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

  res.send(bundleData)
})

module.exports = router
