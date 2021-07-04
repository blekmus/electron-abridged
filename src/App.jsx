import React from 'react'
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom'
import ReactDOM from 'react-dom'

import './assets/css/global.css'

import AddPage from './pages/AddPage.jsx'
import SeriesPage from './pages/SeriesPage.jsx'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SeriesPage} />
        <Route path="/new" component={AddPage} />
      </Switch>
    </Router>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector('#root'),
)