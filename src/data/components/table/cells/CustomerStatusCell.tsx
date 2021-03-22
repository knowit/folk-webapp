import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export interface CustomerStatusData {
  customer: string;
  workOrderDescription: string;
  weight: number;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default function CustomerStatusCell(customerData: {
  data: CustomerStatusData;
}) {
  const classes = useStyles();
  const { data } = customerData;

  return (
    <div className={classes.root}>
      {data.customer
        ? `${data.customer}: ${data.workOrderDescription}`
        : 'Ikke i prosjekt'}
    </div>
  );
}
