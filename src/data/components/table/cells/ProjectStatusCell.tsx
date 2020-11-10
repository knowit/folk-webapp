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

export default function ProjectStatusCell({ data }: { data: number }) {
  const classes = useStyles(data);
  const percentData = `${data}%`;
  return data >= 0 ? (
    <div className={classes.root}>{percentData}</div>
  ) : (
    <NoData />
  );
}
