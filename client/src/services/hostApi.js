import {getAPI} from '../helpers/serviceUtils'

export function getInfo(packageString) {
  return getAPI(`/api/size?package=${packageString}&record=true`)
}

export function getExports(packageString) {
  return getAPI(`/api/exports?package=${packageString}`)
}

export function getExportsSizes(packageString) {
  return getAPI(`/api/exports-sizes?package=${packageString}`)
}

export function getHistory(packageString) {
  return getAPI(`/api/package-history?package=${packageString}`)
}

export function getRecentSearches(limit) {
  return getAPI(`/api/recent?limit=${limit}`)
}

export function getSimilar(packageName) {
  return AgetAPI(`/api/similar-packages?package=${packageName}`)
}
