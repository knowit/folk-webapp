import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CvDialog from '../../../../components/CvDialog'

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
    <>
    <CvDialog name = {"Fornavn Etternavn"} data = {data} />  
    </>
  );
}

