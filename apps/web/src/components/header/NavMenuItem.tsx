import React from 'react'
import { Tab } from '@mui/material'
import { NavLink } from 'react-router-dom'

interface NavMenuItemProps {
  label: string
  to: string
}

export function NavMenuItem({ label, to }: NavMenuItemProps) {
  return <Tab label={label} value={to} to={to} component={NavLink} />
}
