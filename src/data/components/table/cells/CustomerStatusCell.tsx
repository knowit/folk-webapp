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
  data: CustomerStatusData[];
}) {
  const classes = useStyles();
  if (customerData.data[0].customer) {
    const mostWorked = customerData.data.sort(
      (customerA, customerB) => customerA.weight - customerB.weight
    )[0];
    return (
      <div className={classes.root}>
        {mostWorked.customer}: {mostWorked.workOrderDescription}
      </div>
    );
  }
  return <div className={classes.root}>Ikke i prosjekt</div>;
}
