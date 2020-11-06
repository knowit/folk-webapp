import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CharacterLimitBox from '../../../../components/CharacterLimitBox';

const useCustomerStatusStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const StatusCircle = ({ color }: { color: string }) => {
  const Circle = withStyles(() => ({
    colorPrimary: { color },
  }))(FiberManualRecordIcon);

  return <Circle color="primary" />;
};

export default function CustomerStatusCell({
  data: { value, status },
}: {
  data: { value: string; status: 'red' | 'green' };
}) {
  const classes = useCustomerStatusStyles({ status });

  const colorCode =
    status === 'red' ? '#D10000' : status === 'green' ? '#4C8E00' : '#777777';

  return (
    <div className={classes.root}>
      <CharacterLimitBox text={value || '-'} />
      <StatusCircle color={colorCode} />
    </div>
  );
}
