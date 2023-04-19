import * as React from 'react'
import { makeStyles } from '@mui/styles'
import { Tooltip } from '@mui/material'
import { InfoRounded } from '@mui/icons-material'

const useStyles = makeStyles((theme) => ({
  root: {
    fontStyle: 'italic',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    color: ({ isError }: { isError?: boolean }) =>
      isError ? theme.palette.error.main : 'inherit',
  },
  tooltip: {
    maxWidth: '100%',
    fontSize: '1rem',
    backgroundColor: theme.palette.background.paper,
    borderColor: theme.palette.primary.main,
    borderWidth: '1px',
    borderStyle: 'solid',
  },
  icon: {
    marginLeft: '5px',
  },
}))

interface Props {
  message?: string
  error?: object
}

export function FallbackMessage({
  message = 'Det oppsto en feil ved henting av data',
  error,
}: Props) {
  const classes = useStyles({ isError: error !== undefined })

  const errorMessage =
    error?.['status'] != 403
      ? message
      : 'Innlogget bruker har ikke tilgang til å hente data'
  const detailMessage = error && (
    <pre className={classes.root}>{JSON.stringify(error, null, 2)}</pre>
  )
  const help = () => (
    <Tooltip
      className={classes.icon}
      classes={{ tooltip: classes.tooltip }}
      title={detailMessage}
    >
      <InfoRounded />
    </Tooltip>
  )

  return (
    <p className={classes.root}>
      <h3 className={classes.root}>
        {errorMessage}
        {error && help()}
      </h3>
    </p>
  )
}
