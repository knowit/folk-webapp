import * as React from 'react'
import { makeStyles } from '@mui/styles'
import { styled } from '@mui/material/styles'
import { Tooltip } from '@mui/material'
import { InfoRounded } from '@mui/icons-material'

const TooltipStyled = styled(Tooltip)(() => ({
  marginLeft: 5,
  '& .MuiTooltip-tooltip': {
    width: 'fit-content',
    maxWidth: '100%',
    fontSize: '1rem',
    borderWidth: 1,
    borderStyle: 'solid',
  },
}))

const useStyles = makeStyles((theme) => ({
  root: {
    fontStyle: 'italic',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    color: ({ isError }: { isError?: boolean }) =>
      isError ? theme.palette.error.main : 'inherit',
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
    <TooltipStyled title={detailMessage}>
      <InfoRounded />
    </TooltipStyled>
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
