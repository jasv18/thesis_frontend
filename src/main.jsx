import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ServerProvider } from './context/serversContext.jsx'
import { NotificationProvider } from './context/NotificationProvider.jsx'
import { SelectedServerProvider } from './context/SelectedServerProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ServerProvider>
      <NotificationProvider>
        <SelectedServerProvider>
          <App />
        </SelectedServerProvider>
      </NotificationProvider>
    </ServerProvider>
  </React.StrictMode>
)
