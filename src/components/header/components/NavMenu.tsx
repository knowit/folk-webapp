import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      margin: '0 auto',
      height: '100%',
      overflow: 'hidden',
    },
  })
)

export default function NavMenu({ children }: { children: React.ReactNode }) {
  const classes = useStyles()

  return <ul className={classes.root}>{children}</ul>
}
