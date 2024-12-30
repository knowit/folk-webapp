import { NavLink, Link, useLocation } from 'react-router-dom'
import { AppBar, Avatar, Tabs, Tab, Toolbar } from '@mui/material'
import { styled } from '@mui/material/styles'
import NavMenu from './NavMenu'
import KnowitLogo from '../../assets/logo.svg'
import FallbackUserIcon from '../../assets/fallback_user.svg'
import { useUserInfo } from '../../hooks/useUserInfo'
import LoginLogoutButton from '../LoginLogoutButton'
import ModeSwitch from './ModeSwitch'

const ComponentRoot = styled('div')(({ theme }) => ({
  top: 0,
  left: 'auto',
  right: 0,
  position: 'sticky',
  zIndex: 1100,
  backgroundColor: theme.palette.background.paper,
  paddingTop: 30,
}))

const KnowitLogoStyled = styled(KnowitLogo)(() => ({
  height: 27,
}))

const AvatarStyled = styled(Avatar)(() => ({
  height: 40,
  margin: 20,
}))

const ActionsContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
}))

interface HeaderProps {
  darkMode: boolean
  onChangeMode: () => void
}

export default function Header({ darkMode, onChangeMode }: HeaderProps) {
  const availablePages = [
    '/ansatte',
    '/hjem',
    '/kunder',
    '/kompetanse',
    '/organisasjon',
    // '/knowitGPT',
  ]
  const activePage = useLocation().pathname
  const { isAuthenticated, userEmployeeProfile } = useUserInfo()

  let tabsVisiblePage: string | boolean
  availablePages.includes(activePage)
    ? (tabsVisiblePage = activePage)
    : (tabsVisiblePage = false)

  const handleModeSwitch = () => {
    onChangeMode()
  }

  function HeaderTabs() {
    return (
      <Tabs value={tabsVisiblePage} textColor="secondary">
        <Tab label={'Hjem'} value={'/hjem'} to={'/hjem'} component={NavLink} />
        <Tab
          label={'Ansatte'}
          value={'/ansatte'}
          to={'/ansatte'}
          component={NavLink}
        />
        <Tab
          label={'Kunder'}
          value={'/kunder'}
          to={'/kunder'}
          component={NavLink}
        />
        <Tab
          label={'Kompetanse'}
          value={'/kompetanse'}
          to={'/kompetanse'}
          component={NavLink}
        />
        <Tab
          label={'Organisasjon'}
          value={'/organisasjon'}
          to={'/organisasjon'}
          component={NavLink}
        />
        {/* <Tab
          label={'KnowitGPT'}
          value={'/knowitGPT'}
          to={'/knowitGPT'}
          component={NavLink}
        /> */}
      </Tabs>
    )
  }

  return (
    <ComponentRoot>
      <AppBar>
        <Toolbar component={'nav'} sx={{ backgroundColor: 'primary.main' }}>
          <Link data-testid="knowit-logo" to={'/'}>
            <KnowitLogoStyled title="knowit-logo" />
          </Link>

          <NavMenu>{isAuthenticated && <HeaderTabs />}</NavMenu>

          <ActionsContainer>
            <LoginLogoutButton />
            <AvatarStyled
              id="userAvatar"
              alt={userEmployeeProfile?.name}
              src={userEmployeeProfile?.image}
            >
              <FallbackUserIcon />
            </AvatarStyled>

            <ModeSwitch onChange={handleModeSwitch} checked={darkMode} />
          </ActionsContainer>
        </Toolbar>
      </AppBar>
    </ComponentRoot>
  )
}
