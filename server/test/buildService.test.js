const fs = require('fs')
const path = require('path')
const { installPackage, removePackage } = require('../services/bundle/installService')
const { build } = require('../services/bundle/buildService')

let packagePath
beforeAll(async () => {
  packagePath = await installPackage('lodash', '1.0.0')
  await build('lodash', packagePath)
})

afterAll(async () => {
  await removePackage(packagePath)
})

describe('Tests realated to build of bundle js', () => {
  it('Should create the index file', async () => {
    expect(fs.existsSync(path.join(packagePath, 'index.js'))).toEqual(true)
  })

  it('Should build the project', () => {
    expect(fs.existsSync(path.join(packagePath, 'bundle.js'))).toEqual(true)
  })

  it('Should create the stats js file', () => {
    expect(fs.existsSync(path.join(packagePath, 'stats.js'))).toEqual(true)
  })
})
