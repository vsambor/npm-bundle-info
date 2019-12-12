const { isPackageValid } = require('../services/bundle/validatorService')

describe('Tests realated to valid/invalid package name', () => {
  it('Should return false when package is invalid', async () => {
    expect(await isPackageValid('blalbaimaginaryzz33xx')).toBe(false)
  })

  it('Should return true when package is valid', async () => {
    expect(await isPackageValid('react')).toBe(true)
  })
})