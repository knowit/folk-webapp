import { styled, useTheme } from '@mui/material/styles'
import { Close, Fullscreen, FullscreenExit, GetApp } from '@mui/icons-material'

const BaseStyle = () => {
  const theme = useTheme()
  return {
    color: theme.palette.text.secondary,
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.text.primary,
    },
  }
}

export const CloseIcon = styled(Close)(() => BaseStyle)
export const DownloadIcon = styled(GetApp)(() => BaseStyle)
export const FullscreenIcon = styled(Fullscreen)(() => BaseStyle)
export const FullscreenExitIcon = styled(FullscreenExit)(() => BaseStyle)
