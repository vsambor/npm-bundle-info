const VersionService = require('../services/bundle/versionService')
const versionMoks = require('./moks/versions')

let versionServiceTest

describe('Tests realated to all package versions retrieval', () => {

  beforeAll(() => {
    versionServiceTest = new VersionService()
  })

  afterEach(() => {
    jest.resetAllMocks()
    jest.resetModules()
  });

  it('Should call npm registry api', () => {
    const spy = jest.spyOn(versionServiceTest, '_getHttpJSON').mockImplementation(() => { })
    versionServiceTest.getVersions('vue')

    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith('https://registry.npmjs.org/vue');
  })

  it('Should return package not found when there is no version', async () => {
    jest.spyOn(versionServiceTest, '_getHttpJSON').mockImplementation(
      () => Promise.reject({ code: 404, message: 'Package not found' })
    )

    try {
      await versionServiceTest.getVersions('tttttzzzzzzkkkkk')
    } catch (error) {
      expect(error.code).toEqual(404);
      expect(error.message).toEqual('Package not found')
    }
  })

  it('Should filter out prerelease versions', async () => {
    versionServiceTest._getAllVersions = jest.fn(() => versionMoks.preRelease)
    const versions = await versionServiceTest.getVersions('test', '5.1.1')

    expect(versions).toEqual(['5.1.1', '5.0.9', '5.0.7', '4.7.2'])
  })

  it('Returns existing versions if there are less than 4', async () => {
    versionServiceTest._getAllVersions = jest.fn(() => versionMoks.fewAvailable)

    const versions = await versionServiceTest.getVersions('test-pack', '1.0.1')

    expect(versions).toEqual(['1.0.1', '1.0.0'])
  })

  it('Returns last major version in case if is big version gap', async () => {
    versionServiceTest._getAllVersions = jest.fn(() => versionMoks.noMajorVersion);

    const versions = await versionServiceTest.getVersions('test', '3.3.3')

    expect(versions).toEqual(['3.3.3', '0.0.4'])
  })

  it('Should return last 3 versions and 1 last major version', async () => {
    versionServiceTest._getAllVersions = jest.fn(() => versionMoks.majorVersion);

    const versions = await versionServiceTest.getVersions('test', '3.4.1')

    expect(versions).toEqual(['3.4.1', '3.4.0', '3.3.1', '2.2.4'])
  })
})