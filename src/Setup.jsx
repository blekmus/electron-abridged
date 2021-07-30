import React from 'react'
import ReactDOM from 'react-dom'

import './assets/css/global.css'

import SetupPage from './pages/SetupPage.jsx'

function App() {
  return (
    <SetupPage />
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector('#root'),
)
