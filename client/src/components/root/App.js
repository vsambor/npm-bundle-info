import React, { useState } from 'react';
import './App.css';
import SearchInput from '../search-input'
import Stats from '../bundle-stats'
import Chart from '../chart'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

function App() {
  const [isSpinnerVisible, setSpinnerVisible] = useState(false)

  const _handleOnItemSelected = (item) => {
    console.log('App: item selected: ', item)
    setSpinnerVisible(!isSpinnerVisible)
  }

  return (
    <div className="app">
      <header className="app-header">Bundle Info</header>

      <main>
        <SearchInput onItemSelected={_handleOnItemSelected} />

        <Loader type="Triangle" color="#00BFFF" height={200} width={200} visible={isSpinnerVisible} />

        {!isSpinnerVisible &&
          <div className="app-stats-chart-container">
            <section className="app-stats-container">
              <Stats></Stats>
            </section>
            <section className="app-chart-container">
              <Chart></Chart>
            </section>
          </div>
        }
      </main>

      <footer className="app-footer">
        {(new Date()).getFullYear()} © Bundle Info. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
