import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    fontStyle: 'italic',
    margin: 0,
    color: ({ isError }: { isError?: boolean }) =>
      isError ? theme.palette.error.main : 'inherit',
  },
}))

interface Props {
  message: string
  isError?: boolean
}

export function FallbackMessage({ message, isError }: Props) {
  const classes = useStyles({ isError })

  return <p className={classes.root}>{message}</p>
}
