import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';

const DialogBox = withStyles(() => ({
  paper: {
    width: '950px',
    height: '604px',
    borderRadius: '0px',
  },
}))(Dialog);

interface BigChartInterface {
  open: boolean;
  onClose: () => void;
  children?: JSX.Element | JSX.Element[];
}

const BigChart = ({ onClose, open, children }: BigChartInterface) => {
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

export default BigChart;
