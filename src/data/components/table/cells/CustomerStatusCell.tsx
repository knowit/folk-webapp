import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CharacterLimitBox from '../../../../components/CharacterLimitBox';

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
interface CustomerStatusData {
  data: { value: string; status?: 'red' | 'green' };
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
  const d = customerData.data;
  const color = d.status
    ? d.status === 'green'
      ? '#4C8E00'
      : '#D10000'
    : '#777777';
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CharacterLimitBox text={d.value || '-'} />
      <StatusCircle color={color} />
    </div>
  );
}
