import { styled, useTheme } from '@mui/material/styles'
import {
  ArrowDownward,
  ArrowUpward,
  Close,
  ExpandLess,
  ExpandMore,
  Fullscreen,
  FullscreenExit,
  GetApp,
  OpenInNew,
  FilterList,
} from '@mui/icons-material'

export const IconBaseStyle = () => {
  const theme = useTheme()
  return {
    color: theme.palette.text.secondary,
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.text.primary,
    },
  }
}

export const ArrowDownIcon = styled(ArrowDownward)(() => IconBaseStyle)
export const ArrowUpIcon = styled(ArrowUpward)(() => IconBaseStyle)
export const CloseIcon = styled(Close)(() => IconBaseStyle)
export const DownloadIcon = styled(GetApp)(() => IconBaseStyle)
export const ExpandLessIcon = styled(ExpandLess)(() => IconBaseStyle)
export const ExpandMoreIcon = styled(ExpandMore)(() => IconBaseStyle)
export const FilterListIcon = styled(FilterList)(() => IconBaseStyle)
export const FullscreenIcon = styled(Fullscreen)(() => IconBaseStyle)
export const FullscreenExitIcon = styled(FullscreenExit)(() => IconBaseStyle)
export const OpenIneNewIcon = styled(OpenInNew)(() => IconBaseStyle)
