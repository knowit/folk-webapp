import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  listItem: {
    paddingBottom: '0.25em',
  },
})

interface Props {
  children?: React.ReactNode
}

export function ListItem({ children }: Props) {
  const classes = useStyles()

  return <li className={classes.listItem}>{children}</li>
}
