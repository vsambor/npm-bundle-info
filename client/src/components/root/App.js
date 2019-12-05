import React from 'react';
import './App.css';
import SearchInput from '../search-input'
import Stats from '../bundle-stats'
import Chart from '../chart'

function App() {
  return (
    <div className="app">
      <header className="app-header">Bundle Info</header>

      <main>
        <SearchInput onItemSelected={_handleOnItemSelected} />
        <div className="app-stats-chart-container">
          <section className="app-stats-container">
            <Stats></Stats>
          </section>
          <section className="app-chart-container">
            <Chart></Chart>
          </section>
        </div>
      </main>

      <footer className="app-footer">
        {(new Date()).getFullYear()} © Bundle Info. All rights reserved.
      </footer>
    </div>
  );
}

function _handleOnItemSelected(item) {
  console.log('App: item selected: ', item)
}

export default App;
