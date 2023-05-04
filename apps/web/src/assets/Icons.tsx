import { styled, useTheme } from '@mui/material/styles'
import {
  Close,
  ExpandLess,
  ExpandMore,
  Fullscreen,
  FullscreenExit,
  GetApp,
  OpenInNew,
} from '@mui/icons-material'

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
export const ExpandLessIcon = styled(ExpandLess)(() => BaseStyle)
export const ExpandMoreIcon = styled(ExpandMore)(() => BaseStyle)
export const FullscreenIcon = styled(Fullscreen)(() => BaseStyle)
export const FullscreenExitIcon = styled(FullscreenExit)(() => BaseStyle)
export const OpenIneNewIcon = styled(OpenInNew)(() => BaseStyle)
