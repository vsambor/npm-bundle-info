import React from 'react'
import PropTypes from 'prop-types'
import './Stats.css'
import { formatSize } from '../../helpers/statsUtils'


Stats.propTypes = {
  minifiedSize: PropTypes.number.isRequired,
  zippedSize: PropTypes.number.isRequired,
}

Stats.defaultProps = {
  minifiedSize: 0,
  zippedSize: 0
}

/**
 * Renders the bundle size when minified or minified and gzipped.
 * 
 * @param {Object} props - @see Stats.propTypes
 */
function Stats(props) {
  const { minifiedSize, zippedSize } = props
  const formattedMinified = formatSize(minifiedSize)
  const formattedZipped = formatSize(zippedSize)

  return (
    <div className="stats-container">
      <h3>BUNDLE SIZE</h3>
      <div className="stats-inner-container">
        <div className="stats-minified">
          <h1>{formattedMinified.size}<small>{formattedMinified.unit}</small></h1>
          <small>MINIFIED</small>
        </div>
        <div className="stats-zipped">
          <h1>{formattedZipped.size}<small>{formattedZipped.unit}</small></h1>
          <small>MINIFIED + ZIPPED</small>
        </div>
      </div>
    </div>
  )
}

export default Stats
