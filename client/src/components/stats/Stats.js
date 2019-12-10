import React from 'react'
import PropTypes from 'prop-types'
import './Stats.css'
import { formatSize } from '../../helpers/statsUtils'


Stats.propTypes = {
  size: PropTypes.shape({
    minifiedSize: PropTypes.number.isRequired,
    gzippedSize: PropTypes.number.isRequired
  }).isRequired
}

Stats.defaultProps = {
  size: {
    minifiedSize: 0,
    gzippedSize: 0
  }
}

/**
 * Renders the bundle size when minified or minified and gzipped.
 * 
 * @param {Object} props - @see Stats.propTypes
 */
function Stats(props) {
  const { size } = props
  const formattedMinified = formatSize(size.minifiedSize)
  const formattedZipped = formatSize(size.gzippedSize)

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
