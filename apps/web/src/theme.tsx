import { createTheme } from '@mui/material/styles'

const colours = {
  black: '#333333',
  lightGrey: '#b8b8b6',
  rose: '#FAC0B1',
  white: '#F1F0ED',
}

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
      paper: colours.white,
    },
    text: {
      primary: colours.black,
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
  components: {
    MuiAppBar: {
      defaultProps: {
        position: 'relative',
      },
      styleOverrides: {
        root: {
          backgroundColor: colours.black,
          borderBottomColor: colours.rose,
          borderBottomStyle: 'solid',
          boxShadow: 'none',
          height: '79px',
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          minWidth: '150px',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          height: '100%',
          paddingLeft: '30px',
          paddingRight: '30px',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          padding: '0',
          color: colours.black,
          fontSize: '32px',
          display: 'flex',
          alignItems: 'stretch',
          textTransform: 'none',
          borderRadius: '5px',
          backgroundColor: colours.lightGrey,
          lineHeight: '1',
          marginLeft: '10px',
          marginRight: '10px',
          marginBottom: '10px',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginTop: '-10px',
          marginBottom: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          backgroundColor: colours.black,
          padding: '10px 25px 0px 25px',
          '& .MuiTabs-indicator': { display: 'none' },
          '& .Mui-selected': {
            backgroundColor: colours.white,
          },
        },
      },
    },
  },
})
