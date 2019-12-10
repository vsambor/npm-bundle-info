import React, { useState } from 'react'
import './App.css'
import AppHeader from '../app-header'
import AppFooter from '../app-footer'
import SearchInput from '../search-input'
import Stats from '../stats'
import Chart from '../chart'
import { getBundleInfoAPI } from '../../services/hostApi'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Loader from 'react-loader-spinner'

function App() {
  const [isSpinnerVisible, setSpinnerVisible] = useState(false)
  const [bundleData, setBundleData] = useState({})

  const _handleOnItemSelected = (item) => {
    if (item && item.package && item.package.name && item.package.version) {
      setSpinnerVisible(true)
      getBundleInfoAPI(item.package.name, item.package.version)
        .then(resposeData => setBundleData(resposeData))
        .finally(() => setSpinnerVisible(false))
    } else {
      // TODO - implement an error handler component?
      console.warn('WARNING: The selected bundle does not have name or version!')
    }

    // setSpinnerVisible(!isSpinnerVisible)
  }

  return (
    <div className="app">
      <AppHeader />

      <main>
        <SearchInput onItemSelected={_handleOnItemSelected} />

        <div className="app-main-inner-container">
          <Loader type="Triangle" color="#00BFFF" height={200} width={200} visible={isSpinnerVisible} />

          {!isSpinnerVisible &&
            <div className="app-stats-chart-container">
              <section className="app-stats-container"><Stats size={bundleData.stats} /></section>
              <section className="app-chart-container"><Chart bundleChartData={bundleData.chart} /></section>
            </div>
          }
        </div>
      </main>

      <AppFooter />
    </div>
  )
}

export default App
