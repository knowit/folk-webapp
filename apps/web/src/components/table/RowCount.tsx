import React from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  root: {
    textAlign: 'right',
    padding: '10px 15px',
    fontWeight: 'bold',
    width: '100%',
  },
})

interface RowCountProps {
  children: React.ReactNode
}

export function RowCount({ children }: RowCountProps) {
  const classes = useStyles()
  return <div className={classes.root}>{children}</div>
}
