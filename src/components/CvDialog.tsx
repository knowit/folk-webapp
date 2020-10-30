import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider/Divider';

interface CvCellData {
  no_pdf: string;
  int_pdf: string;
  no_word: string;
  int_word: string;
}

const DialogBox = withStyles(() => ({
  paper: {
    backgroundColor: '#f1f0ed',
    width: '600px',
    height: '360px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '0px',
  },
}))(Dialog);

const GreenButton = withStyles(() => ({
  root: {
    backgroundColor: '#4b6455',
    '&:hover': {
      backgroundColor: '#435A4C',
    },
    width: '106px',
  },
  label: {
    fontFamily: 'Arial',
    fontSize: '16px',
    fontWeight: 'bold',
    textTransform: 'none',
    color: '#f1f0ed',
  },
}))(Button);

const GreyButton = withStyles(() => ({
  root: {
    color: '#919191',
    width: '106px',
  },
  label: {
    fontFamily: 'Arial',
    fontSize: '16px',
    fontWeight: 'bold',
    textTransform: 'none',
  },
}))(Button);

const DialogCard = withStyles(() => ({
  root: {
    backgroundColor: '#ffffff',
    width: '323.2px',
    height: '132px',
    BorderRadius: '10px',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    boxShadow: '0 4px 10px 0 rgba(0, 0, 0, 0.07)',
    border: 'solid 1px #e0ded7',
    padding: '21px',
  },
}))(Card);

const BlackRadio = withStyles(() => ({
  root: {
    height: '20px',
    width: '20px',
    margin: '5px',
    color: 'black',
    '&$checked': {
      color: 'black',
    },
  },
  checked: {},
}))(Radio);

const FormControlLabelStyeled = withStyles(() => ({
  label: {
    margin: '0px',
    padding: '0px',
    fontSize: '14px',
  },
}))(FormControlLabel);

const useDialogStyle = makeStyles({
  closeIcon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    marginRight: '15px',
    marginTop: '15px',
    width: '14px',
    height: '14px',
  },
  title: {
    fontSize: '18px',
    lineHeight: '23px',
    color: '#333333',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    marginTop: '44px',
    marginBottom: '40px',
  },
  radioTitle: {
    fontFamily: 'Arial',
    fontSize: '16px',
    lineHeight: '23px',
    color: '#333333',
    marginBottom: '11px',
  },
  buttonLine: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '50%',
    margin: 'auto',
  },
});

export default function CvDialog({
  onClose,
  data,
  name,
  open,
}: {
  data: CvCellData;
  onClose: Function;
  name: string;
  open: boolean;
}) {
  const [fileType, setFileType] = useState('.pdf');
  const [language, setLanguage] = useState('Norsk');
  const [downloadLink, setDownloadLink] = useState(data.int_pdf);

  useEffect(() => {
    if (fileType === '.pdf') {
      if (language === 'Norsk') setDownloadLink(data.no_pdf);
      else setDownloadLink(data.int_pdf);
    } else if (language === 'Norsk') setDownloadLink(data.no_word);
    else setDownloadLink(data.int_word);
  }, [language, fileType, data]);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLanguage(event.target.value);
  };
  const handleFileTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileType(event.target.value);
  };

  const classes = useDialogStyle();
  return (
    <DialogBox
      onClose={() => onClose()}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <p className={classes.title}>Last ned CV for {name}</p>
      <CloseIcon className={classes.closeIcon} onClick={() => onClose()} />
      <DialogCard>
        <FormControl component="fieldset">
          <div className={classes.radioTitle}>Velg filtype</div>
          <RadioGroup
            aria-label="Velg filtype"
            name="filtypevalg"
            value={fileType}
            onChange={handleFileTypeChange}
          >
            <FormControlLabelStyeled
              value=".docx"
              control={<BlackRadio />}
              label=".docx"
            />
            <FormControlLabelStyeled
              value=".pdf"
              control={<BlackRadio />}
              label=".pdf"
            />
          </RadioGroup>
        </FormControl>
        <Divider orientation="vertical" />
        <FormControl component="fieldset">
          <div className={classes.radioTitle}>Velg språk</div>
          <RadioGroup
            aria-label="Velg filtype"
            name="filtypevalg"
            value={language}
            onChange={handleLanguageChange}
          >
            <FormControlLabelStyeled
              value="Norsk"
              control={<BlackRadio />}
              label="Norsk"
            />
            <FormControlLabelStyeled
              value="Engelsk"
              control={<BlackRadio />}
              label="Engelsk"
            />
          </RadioGroup>
        </FormControl>
      </DialogCard>
      <div className={classes.buttonLine}>
        <GreyButton variant="outlined" onClick={() => onClose()}>
          Avbryt
        </GreyButton>
        <GreenButton variant="contained" href={downloadLink}>
          Last ned
        </GreenButton>
      </div>
    </DialogBox>
  );
}
