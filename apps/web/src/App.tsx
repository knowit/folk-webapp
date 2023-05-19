import React, { useEffect, useState } from 'react'
import { Theme, styled } from '@mui/material/styles'
import Header from './components/header/Header'
import Content from './components/Content'
import Footer from './components/Footer'
import { useUserInfo } from './context/UserInfoContext'

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
  const [darkMode, setDarkMode] = useState(false)
  const url = new URL(window.location.href)

  useEffect(() => {
    setDarkMode(localStorage.getItem('mode') === 'true')
  }, [])

  if (url.searchParams.has('login')) {
    localStorage.setItem('login', 'true')
    url.searchParams.delete('login')
    history.replaceState(null, '', url)
  }

  const { user } = useUserInfo()
  if (user === undefined) return null

  const handleModeChange = () => {
    localStorage.setItem('darkMode', (!darkMode).toString())
    setDarkMode(!darkMode)
  }

  return (
    <AppContainer>
      <Header darkMode={darkMode} onChangeMode={handleModeChange} />
      <AppContentContainer>
        <AppMainContent>
          <Content />
        </AppMainContent>
        <Footer />
      </AppContentContainer>
    </AppContainer>
  )
}
