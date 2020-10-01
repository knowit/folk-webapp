import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useProjectStatusStyles = makeStyles({
  root: ({ percentData }: { percentData: string }) => ({
    backgroundColor: '#EFEFEF',
    borderRadius: 12,
    padding: '4px 10px',
    lineHeight: 1,
    width: percentData,
  }),
});

export default function ProjectStatusCell({ data }: { data: number }) {
  const percentData = `${data}%`;
  const classes = useProjectStatusStyles({ percentData });

  return data > 0 ? (
    <div className={classes.root}>{percentData}</div>
  ) : (
  <>Ikke i prosjekt</>
  );
}
