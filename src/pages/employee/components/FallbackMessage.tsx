import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    fontStyle: 'italic',
  },
})

interface Props {
  message: string
}

export function FallbackMessage({ message }: Props) {
  const classes = useStyles()

  return <p className={classes.root}>{message}</p>
}
