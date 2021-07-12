import React from 'react'
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom'
import ReactDOM from 'react-dom'

import './assets/css/global.css'

import AddPage from './pages/AddPage.jsx'
import HomePage from './pages/HomePage.jsx'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/new" component={AddPage} />
        <Route path="/" render={() => <HomePage page="index" />} />
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
