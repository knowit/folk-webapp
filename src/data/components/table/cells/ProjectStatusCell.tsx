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

interface ColorMap {
  [index: string]: string;
}

export default function ProjectStatusCell(status?:{data: string}) {
  const classes = useStyles();
  const colors: ColorMap = {"green": '#4C8E00', "yellow": '#ffff00', "orange": '#ffa500', "red": '#D10000'}
  const color = (status !== undefined || status !== null ) ? colors[status!.data] : '#777777';

  return (
    <div className={classes.root}>
      <StatusCircle color={color} />
    </div>
  );
}
