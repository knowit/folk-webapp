import { createTheme } from '@mui/material/styles'
import { PaletteMode } from '@mui/material'

declare module '@mui/material/styles' {
  interface TypeBackground {
    darker?: string
  }
  interface SimplePaletteColorOptions {
    darker?: string
  }
  interface Palette {
    tertiary?: Palette['primary']
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions['primary']
  }
}

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      ...(mode === 'light'
        ? {
            main: '#333',
            light: '#b8b8b6',
            contrastText: '#E4E1DB',
          }
        : {
            main: '#707070',
            light: '#E4E1DB',
          }),
    },
    secondary: {
      ...(mode === 'light' ? { main: '#FAC0B1' } : { main: '#ff0000' }),
    },
    tertiary: {
      ...(mode === 'light' ? { main: '#FAC0B1' } : { main: '#ff0000' }),
    },
    background: {
      ...(mode === 'light'
        ? {
            default: '#FFFFFF',
            paper: '#F1F0ED',
            darker: '#E4E1DB',
          }
        : {
            default: '#FFFFFF',
            paper: '#F1F0ED',
          }),
    },
    text: {
      ...(mode === 'light'
        ? { primary: '#333', secondary: '#F1F0ED' }
        : { primary: '#F1F0ED', secondary: '#333' }),
    },
    error: {
      ...(mode === 'light' ? { main: '#802826' } : { main: '#802826' }),
    },
    success: {
      ...(mode === 'light' ? { main: '#1e561f' } : { main: '#1e561f' }),
    },
  },
})
const colourTheme = createTheme(getDesignTokens('light'))

export const theme = createTheme(colourTheme, {
  typography: {
    fontFamily: 'Arial, Helvetica Neue, Helvetica, sans-serif',
    fontWeightRegular: 'normal',
  },
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: { marginTop: '5px', width: '100%' },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: { root: { padding: '0px' } },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          width: '100%',
          backgroundColor: colourTheme.palette.background.darker,
          color: colourTheme.palette.text.primary,
          fontSize: '18px',
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        position: 'relative',
      },
      styleOverrides: {
        root: {
          backgroundColor: colourTheme.palette.primary.main,
          borderBottomColor: colourTheme.palette.secondary.main,
          borderBottomStyle: 'solid',
          boxShadow: 'none',
          height: '79px',
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: { paddingRight: '10px' },
        groupLabel: {
          color: colourTheme.palette.text.primary,
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          color: colourTheme.palette.primary.contrastText,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: colourTheme.palette.text.primary,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: colourTheme.palette.background.paper,
          borderRadius: 0,
          padding: '1rem',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: colourTheme.palette.text.primary,
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: colourTheme.palette.text.primary,
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
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderWidth: 0,
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
          color: colourTheme.palette.text.primary,
          fontSize: '32px',
          display: 'flex',
          alignItems: 'stretch',
          textTransform: 'none',
          borderRadius: '5px',
          backgroundColor: colourTheme.palette.primary.light,
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
          backgroundColor: colourTheme.palette.primary.main,
          marginTop: '-10px',
          marginBottom: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          padding: '10px 25px 0px 25px',
          '& .MuiTabs-indicator': { display: 'none' },
          '& .Mui-selected': {
            backgroundColor: colourTheme.palette.background.paper,
          },
        },
      },
    },
  },
})
