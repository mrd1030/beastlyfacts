import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'
import ReactGA4 from 'react-ga4'

if (import.meta.env.VITE_GA4_MEASUREMENT_ID) {
  ReactGA4.initialize(import.meta.env.VITE_GA4_MEASUREMENT_ID);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)