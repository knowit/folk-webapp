import { createTheme } from '@mui/material/styles'
import { PaletteMode } from '@mui/material'

declare module '@mui/material/styles' {
  interface TypeBackground {
    darker?: string
  }
  interface TypeText {
    tertiary?: string
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

export const themeColours = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      ...(mode === 'light'
        ? {
            light: '#404040',
            main: '#333',
            dark: '#252525',
            contrastText: '#E4E1DB',
          }
        : {
            light: '#303030',
            main: '#222',
            dark: '#151515',
            contrastText: '#E4E1DB',
          }),
    },
    secondary: {
      ...(mode === 'light' ? { main: '#FAC0B1' } : { main: '#FAC0B1' }),
    },
    tertiary: {
      ...(mode === 'light' ? { main: '#FAC0B1' } : { main: '#FAC0B1' }),
    },
    background: {
      ...(mode === 'light'
        ? {
            default: '#FFFFFF',
            paper: '#F1F0ED',
            darker: '#E4E1DB',
          }
        : {
            default: '#282828',
            paper: '#333',
            darker: '#222',
          }),
    },
    text: {
      ...(mode === 'light'
        ? { primary: '#333', secondary: '#707070', tertiary: '#F1F0ED' }
        : { primary: '#E4E1DB', secondary: '#F1F0ED', tertiary: '#F1F0ED' }),
    },
    info: {
      ...(mode === 'light'
        ? {
            light: '#bbb',
            main: '#999',
            dark: '#777',
          }
        : {
            light: '#eee',
            main: '#ddd',
            dark: '#ccc',
          }),
    },
    error: {
      ...(mode === 'light'
        ? {
            light: '#b44',
            main: '#a33',
            dark: '#922',
          }
        : {
            light: '#944',
            main: '#833',
            dark: '#722',
          }),
    },
    success: {
      ...(mode === 'light'
        ? {
            light: '#494',
            main: '#383',
            dark: '#272',
          }
        : {
            light: '#494',
            main: '#383',
            dark: '#272',
          }),
    },
  },
})

export const updateTheme = (mode) => {
  const colourTheme = createTheme(themeColours(mode))

  const theme = createTheme(colourTheme, {
    typography: {
      fontFamily: 'Arial, Helvetica Neue, Helvetica, sans-serif',
      fontWeightRegular: 'normal',
    },
    components: {
      MuiAccordion: {
        defaultProps: {
          disableGutters: true,
        },
        styleOverrides: {
          root: {
            marginTop: 10,
            '&.Mui-expanded:last-of-type': {
              marginTop: 10,
            },
          },
        },
      },
      MuiAccordionDetails: {
        styleOverrides: { root: { padding: 0, border: 'none' } },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
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
            '&.Mui-checked': {
              color: colourTheme.palette.text.primary,
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            margin: 5,
          },
          deletable: {
            '& .MuiChip-deleteIcon': {
              '&:hover': { color: colourTheme.palette.error.light },
            },
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
            '&.Mui-focused': {
              color: colourTheme.palette.text.primary,
            },
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            color: colourTheme.palette.text.primary,
            backgroundColor: colourTheme.palette.background.default,
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            color: colourTheme.palette.text.primary,
            '&.Mui-checked': {
              color: colourTheme.palette.text.primary,
            },
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
      MuiTab: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            color: colourTheme.palette.primary.contrastText,
            fontSize: 21,
            textTransform: 'none',
            display: 'flex',
            margin: 10,
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
      MuiTabs: {
        defaultProps: {
          indicatorColor: 'secondary',
        },
        styleOverrides: {
          root: {
            backgroundColor: colourTheme.palette.primary.main,
            display: 'flex',
            flexWrap: 'wrap',
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
      MuiTooltip: {
        styleOverrides: {
          arrow: {
            color: colourTheme.palette.background.paper,
            '&:before': {
              border: `1px solid ${colourTheme.palette.primary.main}`,
            },
          },
          tooltip: {
            maxWidth: '100%',
            color: colourTheme.palette.text.primary,
            background: colourTheme.palette.background.paper,
            fontSize: 14,
            border: `1px solid ${colourTheme.palette.primary.main}`,
          },
        },
      },
    },
  })

  return theme
}
