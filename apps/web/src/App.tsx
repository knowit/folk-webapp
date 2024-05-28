import { useEffect, useState } from 'react'
import { updateTheme } from './theme'
import { useUserInfo } from './hooks/useUserInfo'
import { fetchAuthSession } from 'aws-amplify/auth'
import { CssBaseline, useMediaQuery } from '@mui/material'
import {
  Theme,
  ThemeProvider,
  StyledEngineProvider,
  styled,
} from '@mui/material/styles'
import Header from './components/header/Header'
import Content from './components/Content'
import Footer from './components/Footer'

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const AppContainer = styled('div')(() => ({
  minHeight: '100vh',
  width: '1215px',
  margin: 'auto',
  paddingBottom: '30px',
  display: 'flex',
  flexDirection: 'column',
}))

const AppContentContainer = styled('div')(({ theme }) => ({
  padding: '30px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '0px 0px 10px 10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flexGrow: 1,
}))

const AppMainContent = styled('main')(() => ({ width: '100%', height: '100%' }))

export default function App() {
  const [activeTheme, setActiveTheme] = useState<Theme>(updateTheme('light'))
  const [darkMode, setDarkMode] = useState(false)
  const { user } = useUserInfo()
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  useEffect(() => {
    const initApp = async () => {
      try {
        await fetchAuthSession()
      } catch (e) {
        if (e !== 'No current user') {
          console.warn(e)
        }
      }
    }

    initApp()
  }, [])

  useEffect(() => {
    if (localStorage.getItem('darkMode') === null) {
      setActiveTheme(updateTheme(prefersDarkMode ? 'dark' : 'light'))
      setDarkMode(prefersDarkMode)
    } else {
      setActiveTheme(
        updateTheme(
          localStorage.getItem('darkMode') === 'true' ? 'dark' : 'light'
        )
      )
      setDarkMode(localStorage.getItem('darkMode') === 'true')
    }
  }, [prefersDarkMode])

  function handleModeChange() {
    localStorage.setItem('darkMode', (!darkMode).toString())
    setDarkMode(!darkMode)
    setActiveTheme(
      updateTheme(
        localStorage.getItem('darkMode') === 'true' ? 'dark' : 'light'
      )
    )
  }

  return (
    <>
      {user !== undefined && (
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={activeTheme}>
            <CssBaseline />
            <AppContainer>
              <Header darkMode={darkMode} onChangeMode={handleModeChange} />
              <AppContentContainer>
                <AppMainContent>
                  <Content />
                </AppMainContent>
                <Footer />
              </AppContentContainer>
            </AppContainer>
          </ThemeProvider>
        </StyledEngineProvider>
      )}
    </>
  )
}
