/**
 * Handles package install in a temporary directory.
 * 
 * Main roles:
 * - creates directory for a package
 * - creates package.json for npm
 * - run `npm install` to create node_modules
 ***/

const fs = require('fs')
const path = require('path')
const sanitize = require('sanitize-filename');
const exec = require('util').promisify(require('child_process').exec)

const BUNDLE_INSTALL_PATH = '/tmp/bundle-info'
const PACKAGE_FLAGS = [
  "no-package-lock",
  "no-shrinkwrap",
  "no-optional",
  "no-bin-links",
  "prefer-offline",
  "progress false",
  "loglevel error",
  "ignore-scripts",
  "save-exact",
  "json"
]

/**
 * Installs a npm package.
 * 
 * @param {String} name - package name
 * @param {String} version - package version
 * @returns {String} - installed package path
 */
async function installPackage(name, version) {
  // Creates installation directory for current package.
  const packageName = sanitize(`${name}@${version}`)
  const packagePath = path.join(BUNDLE_INSTALL_PATH, `${packageName}_${_uid()}`)
  await fs.promises.mkdir(packagePath, { recursive: true })

  // Creates the package.json file.
  const packageJsonPath = path.join(packagePath, 'package.json')
  await fs.promises.writeFile(packageJsonPath, JSON.stringify({ dependencies: {} }))

  // Runs npm install for specific package name and version.
  const command = `npm install ${packageName} --${PACKAGE_FLAGS.join(" --")}`
  const { stdout, stderr } = await exec(command, { cwd: packagePath })

  if (stderr) {
    // TODO - handle erros properly.
    console.error(stderr)
  }

  return packagePath;
}

/**
 * Removes a specific package directory by path.
 * 
 * @param {String} path - package path
 * @returns {Boolean} - true if removed without problems, false otherwise.
 */
async function removePackage(path) {
  const { stdout, stderr } = await exec(`rm -rf ${path}`)
  if (stderr) {
    // TODO - handle erros properly.
    console.error(stderr)
    return false
  }

  return true
}

function _uid() {
  return Math.floor(new Date().valueOf() * Math.random())
}

module.exports = {
  installPackage,
  removePackage
}
