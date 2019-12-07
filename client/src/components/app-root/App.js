import React, { useState } from 'react'
import './App.css'
import AppHeader from '../app-header'
import AppFooter from '../app-footer'
import SearchInput from '../search-input'
import Stats from '../stats'
import Chart from '../chart'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Loader from 'react-loader-spinner'

function App() {
  const [isSpinnerVisible, setSpinnerVisible] = useState(false)

  const _handleOnItemSelected = (item) => {
    console.log('App: item selected: ', item)
    setSpinnerVisible(!isSpinnerVisible)
  }

  // TODO- provides something similar from backend
  const bundleData = {
    compressionData: [
      { name: 'Minified', data: [55, 60] },
      { name: 'Minified + Gzipped', data: [45, 40] }
    ],
    versions: ['v1.0', 'v1.1']
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
              <section className="app-stats-container"><Stats /></section>
              <section className="app-chart-container"><Chart bundleChartData={bundleData} /></section>
            </div>
          }
        </div>
      </main>

      <AppFooter />
    </div>
  )
}

export default App
