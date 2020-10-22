import React, { useState } from 'react';
import CvDialog from '../../../../components/CvDialog';
import GetApp from '@material-ui/icons/GetApp';
import { NoData } from '../../../../components/ErrorText';
import makeStyles from '@material-ui/core/styles/makeStyles';

interface CvCellData {
  no_pdf: string;
  int_pdf: string;
  no_word: string;
  int_word: string;
}

interface ConsultantType {
  value: string;
  image: string | null;
  competenceUrl: string;
}

type rowDataArray = [ConsultantType, string, string, string, CvCellData];

interface RowData {
  rowData: rowDataArray;
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
});

export default function CvCell({
  data,
  rowData,
}: {
  data: CvCellData;
  rowData: RowData;
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  return data ? (
    <>
      <div className={classes.root}>
        <GetApp onClick={handleClickOpen} />
      </div>
      <CvDialog
        open={open}
        onClose={handleClose}
        name={rowData.rowData[0].value}
        data={data}
      />
    </>
  ) : (
    <NoData />
  );
}