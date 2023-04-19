import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { StyledEngineProvider } from '@mui/material/styles'
import App from './App'
import { UserInfoProvider } from './context/UserInfoContext'
import { theme } from './theme'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('root')
createRoot(container).render(
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
)
