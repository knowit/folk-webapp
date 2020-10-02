import React, { useState } from 'react';
import CvDialog from '../../../../components/CvDialog'
import GetApp from '@material-ui/icons/GetApp';
import { NoData } from '../../../../components/ErrorText';

interface CvCellData {
  no_pdf: string
  int_pdf: string
  no_word: string
  int_word: string
}

export default function CvCell({
  rowData: [{value:name}],
  data,
}: {
  rowData:[{value:string}]
  data: CvCellData
}) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value:string) => {
    setOpen(false);
  };
  return data?(
    <>
    <GetApp onClick={handleClickOpen}/>
    <CvDialog open={open} onClose={handleClose} name={name} data={data} />
    </>
  ):
  <NoData/>
  ;
}
