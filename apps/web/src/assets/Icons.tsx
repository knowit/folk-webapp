import { styled } from '@mui/material/styles'
import { GetApp } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'

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

export const DownloadIcon = styled(GetApp)(() => BaseStyle)
