
/**
 * Fetch helper with proper handle of JSON and erros.
 * 
 * @param {String} url
 */
export function getAPI(url) {
  const headers = {Accept: 'application/json'}

  return fetch(url, {headers}).then(res => {
    if (!res.ok) {
      try {
        return res.json().then(err => Promise.reject(err))
      } catch (e) {
        if (res.status === 503) {
          return Promise.reject({
            error: {
              code: 'TimeoutError',
              message: 'This is taking unusually long. Try again later.',
            }
          })
        }

        return Promise.reject({
          error: {
            code: 'BuildError',
            message: 'Oops, something went wrong and we don\'t have an appropriate error for this. Open an issue maybe?'
          }
        })
      }
    }

    return res.json()
  })
}

/**
 * Ranks closely matching packages and by most popular ones.
 * 
 * @param {Object} packageA 
 * @param {Object} packageB 
 */
export function suggestionSort(packageA, packageB) {
  if (Math.abs(Math.log(packageB.searchScore) - Math.log(packageA.searchScore)) > 1) {
    return packageB.searchScore - packageA.searchScore
  } else {
    return packageB.score.detail.popularity - packageA.score.detail.popularity
  }
}