import React, { useState } from 'react';
import GetApp from '@material-ui/icons/GetApp';
import { makeStyles, Theme } from '@material-ui/core';
import CvDialog from '../../../../components/CvDialog';
import { NoData } from '../../../../components/ErrorText';

interface CvCellData {
  no_pdf: string;
  int_pdf: string;
  no_word: string;
  int_word: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    color: theme.palette.primary.main,
    borderRadius: 0,
    transition: 'none',
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));
export default function CvCell({
  rowData: [{ value: name }],
  data,
}: {
  rowData: [{ value: string }];
  data: CvCellData;
}) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value: string) => {
    setOpen(false);
  };
  return data ? (
    <>
      <GetApp onClick={handleClickOpen} className={classes.icon} />
      <CvDialog open={open} onClose={handleClose} name={name} data={data} />
    </>
  ) : (
    <NoData />
  );
}
