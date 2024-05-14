import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import { FullscreenIcon, FullscreenExitIcon } from '../../assets/Icons'
import React from 'react'
import { useMatomo } from '@jonkoops/matomo-tracker-react'

const FullscreenIconButton = styled(IconButton)(({ theme }) => ({
  marginLeft: 'auto',
  padding: 0,
  borderRadius: 0,
  cursor: 'pointer',
  '& svg': {
    opacity: 0.5,
    color: theme.palette.text.primary,
    '&:hover': {
      opacity: 1,
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
  title: string
  onChange: () => void
}

export function ToggleBigChartButton({
  big,
  title,
  onChange,
}: ToggleBigChartButtonProps) {
  const { trackEvent } = useMatomo()
  big &&
    trackEvent({
      category: 'Graph size',
      action: 'Changed graph size',
      name: `Graph size changed expanded for ${title}`,
    })

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
