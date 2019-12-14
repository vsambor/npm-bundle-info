const fs = require('fs')
const path = require('path')
const { installPackage, removePackage } = require('../services/bundle/installService')

let packagePath
beforeAll(async () => {
  packagePath = await installPackage('lodash', '1.0.0')
})

describe('Tests realated to package instalation', () => {
  it('Should create directory for a package instalation', () => {
    expect(fs.existsSync(packagePath)).toEqual(true)
  })

  it('Should create a package directory with a unique generated name and version', () => {
    expect(packagePath.includes('lodash@1.0.0_')).toEqual(true)
  })

  it('Should create a package json file inside package directory', () => {
    expect(fs.existsSync(path.join(packagePath, 'package.json'))).toEqual(true)
  })

  it('Should create node modules with a package inside when runing npm install', () => {
    const nodeModulesDir = path.join(packagePath, 'node_modules')

    expect(fs.existsSync(nodeModulesDir)).toEqual(true)
    expect(fs.existsSync(path.join(nodeModulesDir, 'lodash'))).toEqual(true)
  })

  it('Should remove package directory', async () => {
    await removePackage(packagePath)
    expect(fs.existsSync(packagePath)).toEqual(false)
  })
})
