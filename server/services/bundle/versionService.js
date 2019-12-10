/**
 * Handles the retrieval of 3 last minor versions and 1 major version of a package.
 * 
 * Main roles:
 * - uses npmjs.org registry api where all information about a package are stored
 * - performes a logical check on versions
 * - returns only the wanted versions 
 ***/

const https = require('https')
const semver = require('semver')

/**
 * Returns 3 minor versions and 1 last major version of an npm package.
 * 
 * @param {String} packageName
 * @param {String} currentVersion
 * @returns {Array} - 4 versions
 */
async function getVersions(packageName, currentVersion) {
  // Array of versions sorted ascendent.
  const packageVersions = await _getAllVersions(packageName)

  const fourVersions = _pickOnlyFourVersions(packageVersions, currentVersion)

  return fourVersions
}

async function _getAllVersions(packageName) {
  let jsonResponse

  try {
    jsonResponse = await _getHttpJSON(`https://registry.npmjs.org/${packageName}`)
  } catch (error) {
    console.error('Error: ', error.toString())
  }

  return Object.keys(jsonResponse.versions)
}

function _pickOnlyFourVersions(versions, currentVersion) {
  const resultList = []
  const lastIndex = versions.findIndex(item => item === currentVersion)

  if (versions && lastIndex > 0) {
    const majorVersion = semver.major(versions[lastIndex])

    for (let i = lastIndex; i >= 0; --i) {
      const currVersion = versions[i]

      // Filters out pre release versions.
      if (!semver.prerelease(currVersion)) {

        // Only 3 versions of the same major release are required.
        if (resultList.length < 3) {
          resultList.push(currVersion)
        }

        else if (semver.major(currVersion) != majorVersion) {
          // The first major release found.
          resultList.push(currVersion)
          break
        }
      }
    }
  }

  return resultList
}

/**
 * Handles http requests and returns a promise with a JSON body. 
 * (used just for code clarity)
 * 
 * Inspired by https://gist.github.com/ktheory/df3440b01d4b9d3197180d5254d7fb65
 * @param {String} url 
 */
function _getHttpJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let body = ''
      res.on('data', chunk => body += chunk.toString())
      res.on('error', reject)
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode <= 299) {
          resolve(JSON.parse(body))
        } else {
          reject('Request failed. status: ' + res.statusCode + ', body: ' + body)
        }
      })
    })
  })
}

module.exports = {
  getVersions
}
