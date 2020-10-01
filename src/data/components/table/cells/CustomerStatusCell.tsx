import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CharacterLimitBox from '../../../../components/CharacterLimitBox';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useCustomerStatusStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const RedCircle= withStyles(() => ({
  colorPrimary: {
    color: '#D10000', 
  }
}))(FiberManualRecordIcon);

const GreenCircle= withStyles(() => ({
  colorPrimary: {
    color: '#4C8E00', 
  }
}))(FiberManualRecordIcon);

export default function CustomerStatusCell({
  data: { value, status },
}: {
  data: { value: string; status: 'red' | 'green' };
}) {
  const classes = useCustomerStatusStyles({ status });

  return (
    <div className={classes.root}>
      <CharacterLimitBox text = {value || '-'}/>
      {status==='red'? <RedCircle color = 'primary'/> : <GreenCircle color = 'primary'/>}
    </div>
  );
}
