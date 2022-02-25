import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import App from './App'
import { UserInfoProvider } from './context/UserInfoContext'
import { theme } from './theme'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <UserInfoProvider>
        <App />
      </UserInfoProvider>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
)
