import React from 'react'
import { AppBar, Toolbar, Avatar } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { NavMenu, NavMenuItem } from './NavMenu'
import { ReactComponent as KnowitLogo } from '../assets/logo.svg'
import { ReactComponent as FallbackUserIcon } from '../assets/fallback_user.svg'
import { LoginLogoutButton } from './LoginLogoutButton'
import { useUserInfo } from '../context/UserInfoContext'

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
    appbar: {
      height: '79px',
      boxShadow: 'none',
      borderBottomStyle: 'solid',
      borderBottomColor: '#FAC0B1',
      backgroundColor: '#333333',
    },
    toolbar: {
      height: '100%',
      paddingLeft: '30px',
      paddingRight: '30px',
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

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="relative">
        <Toolbar component={'nav'} className={classes.toolbar}>
          <Link
            data-testid="knowit-logo"
            to={process.env.NODE_ENV === 'development' ? '/debug' : '/'}
          >
            <KnowitLogo title="knowit-logo" className={classes.logo} />
          </Link>
          <NavMenu>
            <NavMenuItem label="Ansatte" to="/ansatte" />
            <NavMenuItem label="Kunder" to="/kunder" />
            <NavMenuItem label="Kompetanse" to="/kompetanse" />
            <NavMenuItem label="Arbeidsmiljø" to="/arbeidsmiljo" />
            <NavMenuItem label="Rekruttering" to="/rekruttering" />
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
