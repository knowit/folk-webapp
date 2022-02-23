import { makeStyles, createStyles } from '@material-ui/core'
import React from 'react'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles(() =>
  createStyles({
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

interface NavMenuItemProps {
  label: string
  to: string
}
export default function NavMenuItem({ label, to }: NavMenuItemProps) {
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
