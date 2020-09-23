import React from 'react';
import { Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GetApp from '@material-ui/icons/GetApp';

const useCvCellStyles = makeStyles({
  linkStyle: {
    color: '#707070',
    cursor: 'pointer',
    textDecoration: 'underline',
    '& :hover': {
      color: '#333',
    },
  },
});

export default function CvCell() {
  // TODO: get url for CV-partner
  const classes = useCvCellStyles();
  return (
    <Link className={classes.linkStyle} title="Last ned CV">
      <GetApp />
    </Link>
  );
}
