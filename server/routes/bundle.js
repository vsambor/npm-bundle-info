const express = require('express')
const router = express.Router()

/* GET bundle listing. */
router.get('/', (req, res, next) => {
  console.log('req body: ', req.body)
  res.send('HELLO FROM BUNDLE')
})

module.exports = router
