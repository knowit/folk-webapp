import { styled, useTheme } from '@mui/material/styles'
import {
  Add,
  ArrowDownward,
  ArrowUpward,
  Close,
  ExpandLess,
  ExpandMore,
  FilterList,
  Fullscreen,
  FullscreenExit,
  GetApp,
  OpenInNew,
  Remove,
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

export const AddIcon = styled(Add)(() => IconBaseStyle)
export const ArrowDownIcon = styled(ArrowDownward)(() => IconBaseStyle)
export const ArrowUpIcon = styled(ArrowUpward)(() => IconBaseStyle)
export const CloseIcon = styled(Close)(() => IconBaseStyle)
export const DownloadIcon = styled(GetApp)(() => IconBaseStyle)
export const ExpandLessIcon = styled(ExpandLess)(() => IconBaseStyle)
export const ExpandMoreIcon = styled(ExpandMore)(() => IconBaseStyle)
export const FilterListIcon = styled(FilterList)(() => IconBaseStyle)
export const FullscreenIcon = styled(Fullscreen)(() => IconBaseStyle)
export const FullscreenExitIcon = styled(FullscreenExit)(() => IconBaseStyle)
export const OpenInNewIcon = styled(OpenInNew)(() => IconBaseStyle)
export const RemoveIcon = styled(Remove)(() => IconBaseStyle)
