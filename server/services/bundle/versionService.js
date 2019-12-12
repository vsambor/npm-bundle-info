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

class VersionService {

  constructor() { }

  /**
   * Returns 3 minor versions and 1 last major version of an npm package.
   * 
   * @param {String} packageName
   * @param {String} currentVersion
   * @returns {Array} - 4 versions
   */
  async getVersions(packageName, currentVersion) {
    // Array of versions sorted ascendent.
    const packageVersions = await this._getAllVersions(packageName)

    const fourVersions = this._pickOnlyFourVersions(packageVersions, currentVersion)

    return fourVersions
  }

  async _getAllVersions(packageName) {
    const url = `https://registry.npmjs.org/${packageName}`
    const jsonResponse = await this._getHttpJSON(url)

    return Object.keys(jsonResponse.versions)
  }

  _pickOnlyFourVersions(versions, currentVersion) {
    const resultList = []
    const lastIndex = versions.findIndex(item => item === currentVersion)

    if (versions && lastIndex > 0) {
      const majorVersion = semver.major(versions[lastIndex])

      for (let i = lastIndex; i >= 0; --i) {
        const currVersion = versions[i]
        const majorChanged = semver.major(currVersion) !== majorVersion

        // Filters out pre release versions.
        if (!semver.prerelease(currVersion)) {
          // Only 3 versions of the same major release are required.
          if (resultList.length < 3 && !majorChanged) {
            resultList.push(currVersion)
          }
          else if (majorChanged) {
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
  _getHttpJSON(url) {
    return new Promise((resolve, reject) => {
      https.get(url, res => {
        let body = ''
        res.on('data', chunk => body += chunk.toString())
        res.on('error', reject)
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode <= 299) {
            resolve(JSON.parse(body))
          } else {
            if (res.statusCode === 404) {
              reject({ code: res.statusCode, message: 'Package not found' })
            }

            reject({ code: res.statusCode, message: 'Get version error' })
          }
        })
      })
    })
  }
}

module.exports = VersionService
