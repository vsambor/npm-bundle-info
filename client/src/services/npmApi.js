import {getAPI, suggestionSort} from '../helpers/serviceUtils'

/**
 * Handles the search suggestions for npm packanges.
 * It alos sorts the items by text matching and by popularity.
 *  
 * @param {String} query 
 * @returns {Promise}
 */
export function getSuggestionsAPI(query) {
  return getAPI(`https://api.npms.io/v2/search/suggestions?q=${query}`)
    .then(result => result.sort(suggestionSort))
}