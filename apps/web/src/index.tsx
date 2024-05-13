import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { UserInfoProvider } from './context/UserInfoContext'

import { createRoot } from 'react-dom/client'
import { MatomoProvider, createInstance } from '@jonkoops/matomo-tracker-react'

const instance = createInstance({
  urlBase: 'https://objectnet-dataplattform.matomo.cloud/',
  siteId: 1,
  trackerUrl: 'https://objectnet-dataplattform.matomo.cloud/matomo.php',
  srcUrl: 'https://objectnet-dataplattform.matomo.cloud/matomo.js',
  disabled: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
  heartBeat: {
    active: true, // optional, default value: true
    seconds: 10, // optional, default value: `15
  },
  linkTracking: true, // optional, default value: true
  configurations: {
    disableCookies: true,
    setSecureCookie: true,
    setRequestMethod: 'POST',
  },
})

const container = document.getElementById('root')
createRoot(container).render(
  <MatomoProvider value={instance}>
    <BrowserRouter>
      <UserInfoProvider>
        <App />
      </UserInfoProvider>
    </BrowserRouter>
  </MatomoProvider>
)
