import { Theme, withStyles } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import { Fullscreen, FullscreenExit } from '@material-ui/icons'
import React from 'react'

const FullscreenIconButton = withStyles((theme: Theme) => ({
  root: {
    marginLeft: 'auto',
    padding: 0,
    borderRadius: 0,
    cursor: 'pointer',
    '& svg': {
      color: theme.palette.primary.main,
      '&:hover': {
        color: theme.palette.text.primary,
      },
    },
  },
}))(IconButton)

const CloseFullscreenIcon = withStyles({
  root: { height: '42px', width: '42px' },
})(FullscreenExit)

const OpenFullscreenIcon = withStyles({
  root: { height: '42px', width: '42px' },
})(Fullscreen)

interface ToggleBigChartButtonProps {
  big: boolean
  onChange: () => void
}

export function ToggleBigChartButton({
  big,
  onChange,
}: ToggleBigChartButtonProps) {
  const altText = big ? 'Lukk stor størrelse' : 'Utvid til stor størrelse'

  return (
    <FullscreenIconButton
      aria-label={altText}
      title={altText}
      onClick={onChange}
      disableRipple
      size="small"
    >
      {big ? <CloseFullscreenIcon /> : <OpenFullscreenIcon />}
    </FullscreenIconButton>
  )
}
