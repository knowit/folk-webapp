import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';

const DialogBox = withStyles(() => ({
  paper: {
    width: '950px',
    height: '603px',
    borderRadius: '0px',
  },
}))(Dialog);

const BigChart: React.FC<{ open: boolean; onClose: () => void }> = ({
  onClose,
  open,
  children,
}) => {
  return (
    <DialogBox
      scroll="body"
      onClose={() => onClose()}
      open={open}
      maxWidth={false}
    >
      {children}
    </DialogBox>
  );
};

export default { BigChart };
