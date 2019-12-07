import React from 'react'
import './Chart.css'
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts'


Chart.propTypes = {
  bundleChartData: PropTypes.shape({
    // Note: <compressionData.data> and <versions> array are related information,
    // i.e. should be provided with the same order.
    compressionData: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      data: PropTypes.array.isRequired,
    })).isRequired,
    versions: PropTypes.array.isRequired
  }).isRequired
}

Chart.defaultProps = {
  bundleChartData: {
    compressionData: {
      name: '',
      data: []
    },
    versions: []
  }
}

/**
 * Shows the compression size of bundle versions by using a stacked chart.
 * 
 * @param {Object} props - @see Chart.propTypes 
 */
function Chart(props) {
  const { bundleChartData } = props;

  const options = {
    chart: { stacked: true, toolbar: { show: false } },
    responsive: [{
      breakpoint: 480,
      options: {
        legend: { position: 'bottom', offsetX: -10, offsetY: 0 }
      }
    }],
    plotOptions: { bar: { horizontal: false } },
    xaxis: { type: 'category', categories: bundleChartData.versions },
    legend: { position: 'right', offsetY: 116 },
    fill: { opacity: 1 }
  }

  const series = bundleChartData.compressionData

  return (
    <div className="chart-container">
      <ReactApexChart options={options} series={series} type="bar" height="350" />
    </div>
  )
}

export default Chart;