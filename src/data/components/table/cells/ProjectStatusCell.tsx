import { makeStyles, Tooltip, TooltipProps, withStyles } from '@material-ui/core';
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

  return <Circle color='primary' />;
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',

  },
});

interface ColorMap {
  [index: string]: string;
}

const toolTipStyles = makeStyles(theme => ({
  arrow: {
    color: '#F2F2F2',
  },
  tooltip: {
    backgroundColor: '#F2F2F2',
    color: '#333333',
    fontSize: theme.typography.pxToRem(13),
    border: '1px solid #E4E1DB',
  },
}));

function StatusTooltip(props: JSX.IntrinsicAttributes & TooltipProps) {
  const classes = toolTipStyles();
  return <Tooltip arrow classes={classes} {...props} />;
}


export default function ProjectStatusCell(status? :{data: string}) {
  const classes = useStyles();
  const colors: ColorMap = {"green": '#4C8E00', "yellow": '#ffd500', "orange": '#ff8800', "red": '#D10000'}
  const color = status ? colors[status.data] : '#777777';
  const toolTipTitle = status && (status.data === 'orange' ? "Er åpen for å bytte prosjekt" : (status.data === 'yellow' ? 'Ønsker å bytte prosjekt': ''))

  return (
    <div className={classes.root}>
      <StatusTooltip arrow placement='bottom' title={toolTipTitle ? toolTipTitle : ''}>
        <div>
          <StatusCircle color={color} />
        </div>
      </StatusTooltip>
    </div>
  );
}
