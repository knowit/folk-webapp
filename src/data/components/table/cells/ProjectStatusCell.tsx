import { makeStyles, withStyles } from '@material-ui/core';
import React from 'react';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const StatusCircle = ({ color }: { color: string }) => {
  const Circle = withStyles(() => ({
    colorPrimary: { color },
    root: {
      width: '30px',
      height: '30px',
    },
  }))(FiberManualRecordIcon);

  return <Circle color="primary" />;
};

const useStyles = makeStyles({
  root:{
    display:"flex",
    justifyContent: "center",
    width: "100%",
    
  }
})

export default function ProjectStatusCell(status?: 'red' | 'green') {
  const classes = useStyles();
  const color = status && status === 'green' ? '#4C8E00' : '#D10000';
  return <div className={classes.root}>
 <StatusCircle color={status ? color : '#777777'} />
  </div>;
}
