import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import App from './App'
import { UserInfoProvider } from './context/UserInfoContext'
import { theme } from './theme'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('root')
createRoot(container).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <UserInfoProvider>
        <App />
      </UserInfoProvider>
    </BrowserRouter>
  </ThemeProvider>
)
