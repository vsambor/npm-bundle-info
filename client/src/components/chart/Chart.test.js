import React from 'react'
import ReactDOM from 'react-dom'
import Chart from './Chart'

it('Should render without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Chart />, div)
  ReactDOM.unmountComponentAtNode(div)
})
