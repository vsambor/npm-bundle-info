const fs = require('fs')
const path = require('path')
const { getSize } = require('../services/bundle/sizeService')
const { build } = require('../services/bundle/buildService')
const { installPackage, removePackage } = require('../services/bundle/installService')

let packagePath
beforeAll(async () => {
  packagePath = await installPackage('lodash', '1.0.0')
})

describe('Tests for getting the bundle size', () => {
  it('Should read stats.js and get minified and gziped size details', async () => {
    const size = await getSize('lodash', packagePath)

    expect(size).toBeTruthy()
    expect(size.minifiedSize).toBeTruthy()
    expect(size.gzippedSize).toBeTruthy()
  })

  it('Should remove the package after getting the size', () => {
    expect(fs.existsSync(packagePath)).toEqual(false)
  })
})
