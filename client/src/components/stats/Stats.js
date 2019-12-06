import React from 'react';
import PropTypes from 'prop-types';
import './Stats.css';


Stats.propTypes = {
  minifiedSize: PropTypes.number.isRequired,
  zippedSize: PropTypes.number.isRequired,
}

Stats.defaultProps = {
  minifiedSize: 0,
  zippedSize: 0
};

function Stats(props) {
  const { minifiedSize, zippedSize } = props

  return (
    <div className="stats-container">
      <h3>BUNDLE SIZE</h3>
      <div className="stats-inner-container">
        <div className="stats-minified">
          <h1>{minifiedSize}<small>KB</small></h1>
          <small>MINIFIED</small>
        </div>
        <div className="stats-zipped">
          <h1>{zippedSize}<small>KB</small></h1>
          <small>MINIFIED + ZIPPED</small>
        </div>
      </div>
    </div>
  );
}

export default Stats;