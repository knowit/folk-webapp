import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LoginProvider from './LoginProvider';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#FFFFFF',
    },
    text: {
      primary: '#333333',
    },
  },
  spacing: 22.5,
  typography: {
    fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
    fontWeightRegular: 'normal',
  },
});

ReactDOM.render(
  <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <LoginProvider>
          <App />
        </LoginProvider>
      </BrowserRouter>
    </ThemeProvider>
  </>,
  document.getElementById('root')
);
