import { makeStyles } from '@material-ui/core';
import React from 'react';
import { NoData } from '../../../../components/ErrorText';

const useStyles = makeStyles({
  root: (percentData: number) => ({
    backgroundColor: '#EFEFEF',
    borderRadius: 12,
    padding: '4px 10px',
    lineHeight: 1,
    width: percentData,
  }),
});



export default function ProjectStatusCell({ data }: { data: number|undefined }) {
  const classes = useStyles(data||0);
  const percentData = `${data}%`;
  switch(data) {
  case null :
    return <NoData/>;
  case undefined :
    return <NoData/>;
  case 0:
    return 'Ikke i prosjekt';
  default:
    
    return <div className={classes.root}>{percentData}</div>;
}
}
