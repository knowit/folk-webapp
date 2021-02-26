import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CharacterLimitBox from '../../../../components/CharacterLimitBox';


interface CustomerStatusData {
  data: { value: string; };
  rowData: any[];
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default function CustomerStatusCell(customerData: CustomerStatusData) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CharacterLimitBox text={customerData.data.value || '-'} />
    </div>
  );
}