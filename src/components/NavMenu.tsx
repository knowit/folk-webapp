import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      margin: '0 auto',
      height: '100%',
      overflow: 'hidden',
    },
    menuItem: {
      display: 'inline-flex',
      textDecoration: 'none',
      alignItems: 'center',
      padding: '0 13.75px',
      margin: '0 13.75px',
      fontSize: '21px',
      borderBottom: '1px solid transparent',
      color: '#F1F0ED',
    },
    activeItem: {
      fontWeight: 'bold',
      borderBottomColor: '#FAC0B1',
      color: '#FAC0B1',
    },
  })
)

export function NavMenuItem({ label, to }: { label: string; to: string }) {
  const classes = useStyles()

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        classes.menuItem + (isActive ? ` ${classes.activeItem}` : '')
      }
    >
      {label}
    </NavLink>
  )
}

export function NavMenu({ children }: { children: React.ReactNode }) {
  const classes = useStyles()

  return <div className={classes.root}>{children}</div>
}
