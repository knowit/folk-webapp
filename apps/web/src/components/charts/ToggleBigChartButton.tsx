import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import { FullscreenIcon, FullscreenExitIcon } from '../../assets/Icons'
import React from 'react'

const FullscreenIconButton = styled(IconButton)(({ theme }) => ({
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
}))
const FullscreenIconStyled = styled(FullscreenIcon)(() => ({
  height: 42,
  width: 42,
}))
const FullscreenExitIconStyled = styled(FullscreenExitIcon)(() => ({
  height: 42,
  width: 42,
}))

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
      {big ? <FullscreenIconStyled /> : <FullscreenExitIconStyled />}
    </FullscreenIconButton>
  )
}
