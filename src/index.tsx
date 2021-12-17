import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
// import LoginProvider from './LoginProvider'
import App from './App'
import { UserInfoProvider } from './context/UserInfoContext'

const theme = createTheme({
  palette: {
    primary: {
      main: '#707070',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F1F0ED',
    },
    text: {
      primary: '#333333',
    },
    error: {
      main: '#802826',
    },
    success: {
      main: '#1e561f',
    },
  },
  spacing: 22.5,
  typography: {
    fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
    fontWeightRegular: 'normal',
  },
})

ReactDOM.render(
  <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <UserInfoProvider>
          <App />
        </UserInfoProvider>
      </BrowserRouter>
    </ThemeProvider>
  </>,
  document.getElementById('root')
)
