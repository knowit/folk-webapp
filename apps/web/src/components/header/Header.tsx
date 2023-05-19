import React, { useState, FunctionComponent } from 'react'
import {
  AppBar,
  Avatar,
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tabs,
  Tab,
  Toolbar,
} from '@mui/material'
import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material'
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

interface HeaderProps {
  darkMode: boolean
  onChangeMode: () => void
}

export const Header: FunctionComponent<HeaderProps> = ({
  darkMode,
  onChangeMode,
}) => {
  // export default function Header<HeaderProps>({ mode }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const { user } = useUserInfo()
  const activePage = useLocation().pathname

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClick = () => {
    setAnchorEl(null)
    onChangeMode()
  }

  return (
    <ComponentRoot>
      <AppBar>
        <Toolbar component={'nav'}>
          <Link data-testid="knowit-logo" to={'/'}>
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
          <Button aria-label="Brukerinnstillinger" onClick={handleOpenMenu}>
            <AvatarStyled id="userAvatar" alt={user?.name} src={user?.picture}>
              <FallbackUserIcon />
            </AvatarStyled>
          </Button>
          <Menu anchorEl={anchorEl} open={open}>
            <MenuItem
              aria-label={darkMode ? 'Skru på Light mode' : 'Skru på Dark mode'}
              onClick={handleMenuClick}
            >
              <ListItemIcon>
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </ListItemIcon>
              <ListItemText>
                {darkMode ? 'Light mode' : 'Dark Mode'}
              </ListItemText>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </ComponentRoot>
  )
}

export default Header
