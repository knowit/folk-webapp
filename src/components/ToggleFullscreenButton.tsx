import { Theme, withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { Fullscreen, FullscreenExit } from '@material-ui/icons';
import React from 'react';

const FullscreenIconButton = withStyles((theme: Theme) => ({
  root: {
    marginLeft: 'auto',
    // TODO: set negative padding?
    padding: 0,
    borderRadius: 0,
    cursor: 'pointer',
    '& svg': {
      color: theme.palette.primary.main,
      // TODO: resize on fullscreen
      height: '40px',
      width: '40px',
      '&:hover': {
        color: theme.palette.text.primary,
      },
    },
  },
}))(IconButton);

interface ToggleFullscreenButtonProps {
  isFullscreen: boolean;
  onChange: () => void;
}

export function ToggleFullscreenButton({
  isFullscreen,
  onChange,
}: ToggleFullscreenButtonProps) {
  const altText = isFullscreen
    ? 'Exit stor størrelse'
    : 'Utvid til stor størrelse';

  return (
    <FullscreenIconButton
      aria-label={altText}
      title={altText}
      onClick={onChange}
      disableRipple
      size="small"
    >
      {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
    </FullscreenIconButton>
  );
}
