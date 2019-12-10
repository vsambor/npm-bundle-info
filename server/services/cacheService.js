/**
 * Handles a minimalistic persistent cache system.
 * 
 * Main roles:
 * - uses a json file to store data
 * - allow storing keys-values
 * - allows retrieving values by key
 * - allows removing keys
 ***/

const fs = require('fs')

class CacheService {
  constructor(cacheName) {
    this.cacheFilePath = `/tmp/bundle-info/${cacheName}.json`
  }

  /**
   * Returs the value of cache corresponding to provided key.
   * 
   * @param {String} key 
   * @returns {Any} - cache value for a key
   */
  get(key) {
    const cache = this._getCacheObject()
    return cache[key]
  }

  /**
   * Sets a value in cache. 
   * Note: it overrides the value if already exists.
   * 
   * @param {String} key 
   * @param {Any} value 
   */
  set(key, value) {
    const cache = this._getCacheObject()
    cache[key] = value
    this._setCacheObject(cache)
  }

  /**
   * Removes a key and it's value from cache.
   * 
   * @param {String} key 
   */
  deleteKey(key) {
    const cache = this._getCacheObject()
    delete cache[key]
    this._setCacheObject(cache)
  }

  /**
   * Flushes all cache elements.
   */
  deleteAll() {
    this._setCacheObject({})
  }

  /**
   * Removes the cache file entirely.
   */
  prune() {
    if (fs.existsSync(this.cacheFilePath)) {
      fs.unlinkSync(this.cacheFilePath)
    }
  }

  _getCacheObject() {
    if (fs.existsSync(this.cacheFilePath)) {
      return JSON.parse(fs.readFileSync(this.cacheFilePath))
    }

    return {}
  }

  _setCacheObject(cache) {
    fs.writeFileSync(this.cacheFilePath, JSON.stringify(cache))
  }
}

module.exports = {
  CacheService
}
