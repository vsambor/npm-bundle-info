import { getAPI } from '../helpers/serviceUtils'

// TODO - put this in a config for prod/dev.
const hostOrigin = 'http://localhost:3003'

export function getBundleInfoAPI(bundleName, bundleVersion) {
  return getAPI(`${hostOrigin}/api/bundle?name=${bundleName}&version=${bundleVersion}`)
}
