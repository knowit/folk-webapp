import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { StyledEngineProvider } from '@mui/material/styles'
import App from './App'
import { UserInfoProvider } from './context/UserInfoContext'
import { theme } from './theme'
import { createRoot } from 'react-dom/client'
import { MatomoProvider, createInstance } from '@jonkoops/matomo-tracker-react'

const instance = createInstance({
  urlBase: 'https://objectnet-dataplattform.matomo.cloud/',
  siteId: 1,
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
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <UserInfoProvider>
            <App />
          </UserInfoProvider>
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  </MatomoProvider>
)
