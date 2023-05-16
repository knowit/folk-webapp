import * as React from 'react'
import { styled } from '@mui/material/styles'
import { Tooltip } from '@mui/material'
import { InfoRounded } from '@mui/icons-material'

const MessageStyles = ({ theme, isError }) => ({
  fontStyle: 'italic',
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  color: isError ? theme.palette.error.main : 'inherit',
})

const ComponentRoot = styled('p', {
  shouldForwardProp: (prop) => prop !== 'isError',
})<{ isError: boolean }>(MessageStyles)

const ComponentHeadline = styled('h3', {
  shouldForwardProp: (prop) => prop !== 'isError',
})<{ isError: boolean }>(MessageStyles)

const PreStyled = styled('pre', {
  shouldForwardProp: (prop) => prop !== 'isError',
})<{ isError: boolean }>(MessageStyles)

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

interface Props {
  message?: string
  error?: object
}

export function FallbackMessage({
  message = 'Det oppsto en feil ved henting av data',
  error,
}: Props) {
  const errorMessage =
    error?.['status'] != 403
      ? message
      : 'Innlogget bruker har ikke tilgang til å hente data'
  const detailMessage = error && (
    <PreStyled isError={error !== undefined}>
      {JSON.stringify(error, null, 2)}
    </PreStyled>
  )
  const help = () => (
    <TooltipStyled title={detailMessage}>
      <InfoRounded />
    </TooltipStyled>
  )

  return (
    <ComponentRoot isError={error !== undefined}>
      <ComponentHeadline isError={error !== undefined}>
        {errorMessage}
        {error && help()}
      </ComponentHeadline>
    </ComponentRoot>
  )
}
