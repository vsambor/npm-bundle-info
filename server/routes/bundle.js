const express = require('express')
const router = express.Router()

/* GET bundle listing. */
router.get('/', (req, res, next) => {
  console.log('req body: ', req.body)

  console.log('request: ', req)

  // TODO
  // 1. Check cache for all needed versions

  // 2. Download and process versions which are not in cache

  // 3. Return bundleData

  const bundleData = {
    compressionData: [
      { name: 'Minified', data: [55, 60] },
      { name: 'Minified + Gzipped', data: [45, 40] }
    ],
    versions: ['v1.0', 'v1.1']
  }

  res.send(bundleData)
})

module.exports = router
