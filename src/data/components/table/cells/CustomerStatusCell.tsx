import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const colorLookupTable = {
  red: '#D10000',
  green: '#4C8E00',
};

const useCustomerStatusStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  statusLabel: ({ status }: { status: 'red' | 'green' }) => ({
    backgroundColor: colorLookupTable[status],
    width: 20,
    height: 20,
    borderRadius: 10,
  }),
});

export default function CustomerStatusCell({
  data: { value, status },
}: {
  data: { value: string; status: 'red' | 'green' };
}) {
  const classes = useCustomerStatusStyles({ status });

  return (
    <div className={classes.root}>
      <div>{value || '-'}</div>
      <div className={classes.statusLabel} />
    </div>
  );
}
