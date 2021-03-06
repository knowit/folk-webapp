import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    textAlign: 'right',
    padding: '10px 15px',
    fontWeight: 'bold',
  },
});

interface RowCountProps {
  children: React.ReactNode;
}
const RowCount = ({ children }: RowCountProps) => {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
};

export default RowCount;
