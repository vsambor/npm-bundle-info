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
        <SearchInput />
        <div>
          <section>
            <Stats></Stats>
          </section>
          <section>
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

export default App;
