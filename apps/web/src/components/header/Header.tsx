import React from 'react'
import { AppBar, Toolbar, Avatar, Tabs, Tab } from '@mui/material'
import { styled } from '@mui/material/styles'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { NavMenu } from './NavMenu'
import { ReactComponent as KnowitLogo } from '../../assets/logo.svg'
import { ReactComponent as FallbackUserIcon } from '../../assets/fallback_user.svg'
import { LoginLogoutButton } from '../LoginLogoutButton'
import { useUserInfo } from '../../context/UserInfoContext'

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

export default function Header() {
  const { user } = useUserInfo()
  const activePage = useLocation().pathname

  return (
    <ComponentRoot>
      <AppBar>
        <Toolbar component={'nav'}>
          <Link data-testid="knowit-logo" to={'/debug'}>
            <KnowitLogoStyled title="knowit-logo" />
          </Link>
          <NavMenu>
            {user && (
              <Tabs value={activePage}>
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
          <AvatarStyled alt={user?.name} src={user?.picture}>
            <FallbackUserIcon />
          </AvatarStyled>
        </Toolbar>
      </AppBar>
    </ComponentRoot>
  )
}
