import React from 'react';
import CvDialog from '../../../../components/CvDialog'

interface CvCellData {
  no_pdf: string
  int_pdf: string
  no_word: string
  int_word: string
}

export default function CvCell({ data }: {data: CvCellData}) {
  return (
    <>
    <CvDialog name = {"Fornavn Etternavn"} data = {data} />  
    </>
  );
}

