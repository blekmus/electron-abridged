import React from 'react'
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom'
import ReactDOM from 'react-dom'

import './assets/css/global.css'

import AddPage from './pages/AddPage.jsx'
import EditPage from './pages/EditPage.jsx'
import HomePage from './pages/HomePage.jsx'
import EntryPage from './pages/EntryPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/settings" component={SettingsPage} />
        <Route path="/new" component={AddPage} />
        <Route path="/edit/:id" component={EditPage} />
        <Route path="/entry/:id" component={EntryPage} />
        <Route path="/series" render={() => <HomePage page="series" />} />
        <Route path="/short" render={() => <HomePage page="short" />} />
        <Route path="/shot" render={() => <HomePage page="shot" />} />

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
