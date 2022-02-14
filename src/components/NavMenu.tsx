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
      margin: '0 13.75px',
      fontSize: '21px',
    },
    menuItemLink: {
      padding: '0 13.75px',
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      borderBottom: '1px solid transparent',
      color: '#F1F0ED',
    },
    activeItemLink: {
      fontWeight: 'bold',
      borderBottomColor: '#FAC0B1',
      color: '#FAC0B1',
    },
  })
)

export function NavMenuItem({ label, to }: { label: string; to: string }) {
  const classes = useStyles()

  return (
    <li className={classes.menuItem}>
      <NavLink
        to={to}
        className={({ isActive }) =>
          classes.menuItemLink + (isActive ? ` ${classes.activeItemLink}` : '')
        }
      >
        {label}
      </NavLink>
    </li>
  )
}

export function NavMenu({ children }: { children: React.ReactNode }) {
  const classes = useStyles()

  return <ul className={classes.root}>{children}</ul>
}
