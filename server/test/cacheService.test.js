const fs = require('fs')
const { CacheService } = require('../services/cacheService')

let cache

beforeAll(() => {
  cache = new CacheService('test-cache')
})

describe('Tests realated to caching system', () => {
  it('Should return undefine when there is no key in cache', () => {
    expect(cache.get('non-existing-key')).toBeUndefined()
  })

  it('Should be able to add new pairs in cache and retrieve existing elements', () => {
    cache.set('test1', 33)
    cache.set('test2', { test: 123 })

    expect(cache.get('test1')).toEqual(33)
    expect(cache.get('test2')).toEqual({ test: 123 })
  })

  it('Should be able to remove the key and value', () => {
    expect(cache.get('test1')).toEqual(33)

    cache.deleteKey('test1')

    expect(cache.get('test1')).toBeUndefined()
    expect(cache.get('test2')).toEqual({ test: 123 })
  })

  it('Should be remove all the keys', () => {
    cache.set('test3', 'tziuka')
    cache.set('test4', 333)
    cache.set('test5', null)

    cache.deleteAll()

    expect(cache.get('test1')).toBeUndefined()
    expect(cache.get('test2')).toBeUndefined()
    expect(cache.get('test3')).toBeUndefined()
    expect(cache.get('test4')).toBeUndefined()
  })

  it('Should remove the cache file on prune', () => {
    cache.prune()

    expect(fs.existsSync(cache.cachePath)).toEqual(false)
  })
})