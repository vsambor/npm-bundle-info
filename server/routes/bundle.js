/**
 * Handles the bundle API request/response orchestration.
 ***/

const express = require('express')
const router = express.Router()
const bundleService = require('../services/api/bundleService')


router.get('/', (req, res) => {
  const name = req.query.name
  const version = req.query.version

  try {
    bundleSizeData = bundleService.getBundleSize(name, version)
    res.send(bundleSizeData)
  } catch (error) {
    res.status(500).send({ error: error.toString() });
  }
})

module.exports = router
