import React, { useState } from 'react';
import CvDialog from '../../../../components/CvDialog'
import GetApp from '@material-ui/icons/GetApp';

interface CvCellData {
  no_pdf: string
  int_pdf: string
  no_word: string
  int_word: string
}

export default function CvCell({ data }: {data: CvCellData}) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value:string) => {
    setOpen(false);
  };
  return (
    <>
    <GetApp onClick={handleClickOpen}/>
    <CvDialog open={open} onClose={handleClose} name={"Fornavn Etternavn"} data={data} />
    </>
  );
}
