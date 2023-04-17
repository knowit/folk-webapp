import * as React from 'react'
import {
  Tooltip as MuiTooltip,
  TooltipProps,
  withStyles,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import InfoIcon from '@mui/icons-material/Info'

const useStyles = makeStyles((theme) => ({
  triggerButton: {
    border: 0,
    margin: 0,
    padding: '0 0.25em',
    background: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '1.5em',
    color: theme.palette.text.primary,
  },
  triggerContent: {
    height: '100%',
    width: 'auto',
  },
}))

const StyledTooltip = withStyles((theme) => ({
  arrow: {
    color: theme.palette.primary.light,
    '&:before': {
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
  tooltip: {
    color: theme.palette.text.primary,
    background: theme.palette.primary.light,
    fontSize: '14px',
    border: `1px solid ${theme.palette.primary.main}`,
  },
}))(MuiTooltip)

interface Props extends Pick<TooltipProps, 'placement'> {
  description: string
  trigger?: React.ReactElement
}

export function InfoTooltip({
  description,
  placement = 'bottom',
  trigger = <InfoIcon />,
}: Props) {
  const classes = useStyles()

  return (
    <StyledTooltip arrow title={description} placement={placement}>
      <button className={classes.triggerButton}>
        {React.cloneElement(trigger, { className: classes.triggerContent })}
      </button>
    </StyledTooltip>
  )
}
