import React, { FunctionComponent } from 'react'
import { AppBar, Avatar, Tabs, Tab, Toolbar } from '@mui/material'
import { styled } from '@mui/material/styles'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { NavMenu } from './NavMenu'
import { ReactComponent as KnowitLogo } from '../../assets/logo.svg'
import { ReactComponent as FallbackUserIcon } from '../../assets/fallback_user.svg'
import { LoginLogoutButton } from '../LoginLogoutButton'
import { useUserInfo } from '../../context/UserInfoContext'
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
}))

interface HeaderProps {
  darkMode: boolean
  onChangeMode: () => void
}

export const Header: FunctionComponent<HeaderProps> = ({
  darkMode,
  onChangeMode,
}) => {
  const { user } = useUserInfo()
  const activePage = useLocation().pathname

  const handleModeSwitch = () => {
    onChangeMode()
  }

  return (
    <ComponentRoot>
      <AppBar>
        <Toolbar component={'nav'} sx={{ backgroundColor: 'primary.main' }}>
          <Link data-testid="knowit-logo" to={'/'}>
            <KnowitLogoStyled title="knowit-logo" />
          </Link>
          <NavMenu>
            {user && (
              <Tabs value={activePage} textColor="secondary">
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
                  label={'Organisasjonsstruktur'}
                  value={'/organisasjon'}
                  to={'/organisasjon'}
                  component={NavLink}
                />
              </Tabs>
            )}
          </NavMenu>
          <LoginLogoutButton />
          <AvatarStyled id="userAvatar" alt={user?.name} src={user?.picture}>
            <FallbackUserIcon />
          </AvatarStyled>
          <ModeSwitch onChange={handleModeSwitch} checked={darkMode} />
        </Toolbar>
      </AppBar>
    </ComponentRoot>
  )
}

export default Header
