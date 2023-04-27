import React from 'react'
import { AppBar, Toolbar, Avatar, Tabs, Tab } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { NavMenu } from './NavMenu'
import { ReactComponent as KnowitLogo } from '../../assets/logo.svg'
import { ReactComponent as FallbackUserIcon } from '../../assets/fallback_user.svg'
import { LoginLogoutButton } from '../LoginLogoutButton'
import { useUserInfo } from '../../context/UserInfoContext'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      top: 0,
      left: 'auto',
      right: 0,
      position: 'sticky',
      zIndex: 1100,
      backgroundColor: 'white',
      paddingTop: '30px',
    },
    logo: {
      height: '27px',
    },
    userAvatar: {
      height: '40px',
    },
  })
)

export default function Header() {
  const classes = useStyles()
  const { user } = useUserInfo()
  const activePage = useLocation().pathname

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar component={'nav'}>
          <Link data-testid="knowit-logo" to={'/debug'}>
            <KnowitLogo title="knowit-logo" className={classes.logo} />
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
          <Avatar
            alt={user?.name}
            src={user?.picture}
            className={classes.userAvatar}
          >
            <FallbackUserIcon />
          </Avatar>
        </Toolbar>
      </AppBar>
    </div>
  )
}
