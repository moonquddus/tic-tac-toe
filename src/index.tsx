import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/style.css'
import App from './components/feature/App/App'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// reportWebVitals()
