import React from 'react';
import { Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GetApp from '@material-ui/icons/GetApp';

interface CvCellData {
  no_pdf: string
  int_pdf: string
  no_word: string
  int_word: string
}

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

export default function CvCell({ data }: {data: CvCellData}) {
  const classes = useCvCellStyles();
  return (
    <Link className={classes.linkStyle} title="Last ned CV" href={data.no_pdf}>
      <GetApp />
    </Link>
  );
}
