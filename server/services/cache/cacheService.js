/**
 * Handles a minimalistic persistent cache system.
 * 
 * Main roles:
 * - uses a file cache.json
 * - allow storing keys-values
 * - allows retrieving values by key
 * - allows removing keys
 * 
 * - TODO - handle concurency on cache.json
 ***/

const fs = require('fs')

const CACHE_FILE_PATH = __dirname + '/cache.json'

/**
 * Returs the value of cache corresponding to provided key.
 * 
 * @param {String} key 
 * @returns {Any} - cache value for a key
 */
function get(key) {
  const cache = _getCacheObject()
  return cache[key]
}

/**
 * Sets a value in cache. 
 * Note: it overrides the value if already exists.
 * 
 * @param {String} key 
 * @param {Any} value 
 */
function set(key, value) {
  const cache = _getCacheObject()
  cache[key] = value
  _setCacheObject(cache)
}

/**
 * Removes a key and it's value from cache.
 * 
 * @param {String} key 
 */
function deleteKey(key) {
  const cache = _getCacheObject()
  delete cache[key]
  _setCacheObject(cache)
}

/**
 * Flushes all cache elements.
 */
function deleteAll() {
  _setCacheObject({})
}

function _getCacheObject() {
  return JSON.parse(fs.readFileSync(CACHE_FILE_PATH))
}

function _setCacheObject(cache) {
  fs.writeFileSync(CACHE_FILE_PATH, JSON.stringify(cache))
}

module.exports = {
  get,
  set,
  deleteKey,
  deleteAll
}
