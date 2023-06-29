import * as React from 'react'
import { Tooltip, TooltipProps, tooltipClasses } from '@mui/material'
import { styled } from '@mui/material/styles'
import InfoIcon from '@mui/icons-material/Info'

const TriggerButton = styled('button')(({ theme }) => ({
  border: 0,
  margin: 0,
  padding: '0 0.25em',
  background: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '1.5em',
  color: theme.palette.text.primary,
}))

interface Props extends Pick<TooltipProps, 'placement'> {
  description: string
  trigger?: React.ReactElement
}

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
  },
})

export function InfoTooltip({
  description,
  placement = 'bottom',
  trigger = <InfoIcon />,
}: Props) {
  return (
    <CustomWidthTooltip arrow title={description} placement={placement}>
      <TriggerButton>{React.cloneElement(trigger)}</TriggerButton>
    </CustomWidthTooltip>
  )
}
