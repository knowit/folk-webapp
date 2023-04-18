import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#707070',
      light: '#E4E1DB',
    },
    secondary: {
      main: '#ff0000',
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
    fontFamily: 'Arial, Helvetica Neue, Helvetica, sans-serif',
    fontWeightRegular: 'normal',
  },
})
