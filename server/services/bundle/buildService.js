/**
 * Handles the creation of package bundle.
 * 
 * Note: the package should be already installed when runing the build.
 * 
 * Main roles:
 * - creates an entry point and import the package - index.js
 * - uses rollup to bundle the package
 * - inside rollup plugins it uses size-snapshot. This plugin generates a file with needed sizes
 ***/

const path = require('path')
const fs = require('fs')
const rollup = require('rollup')
const { sizeSnapshot } = require('rollup-plugin-size-snapshot')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')

/**
 * Builds the package bundle.js with rollup.
 * 
 * @param {String} packagePath
 */
async function build(packageName, packagePath) {
  await _writeIndex(packageName, packagePath)
  await _runRollup(packagePath)
}

async function _writeIndex(packageName, packagePath) {
  const indexPath = path.join(packagePath, 'index.js')
  const indexContent = `import pack from '${packageName}';`

  await fs.promises.writeFile(indexPath, indexContent)
}

async function _runRollup(packagePath) {
  const inputOptions = {
    input: path.join(packagePath, 'index.js'),
    treeshake: false,
    plugins: [
      sizeSnapshot({ snapshotPath: path.join(packagePath, 'stats.js') }),
      resolve(),
      commonjs()
    ]
  }

  const outputOptions = {
    file: path.join(packagePath, 'bundle.js'),
    format: 'cjs',
  }

  const bundle = await rollup.rollup(inputOptions)
  await bundle.generate(outputOptions)
  await bundle.write(outputOptions)
}

module.exports = {
  build
}