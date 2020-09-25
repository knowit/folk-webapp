import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import GetApp from '@material-ui/icons/GetApp';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Button, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

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


function SimpleDialog({onClose, data, name, open }: {data: CvCellData, onClose:any, name:string, open:boolean }){
  const [fileType, setFileType] = React.useState();
  const [language, setLanguage] = React.useState();
  const classes = useCvCellStyles();

  const handleClose = () => {
    onClose();
  };
  const handleLanguageChange = (event:any) => {
    setLanguage(event.target.value);
  };
  const handleFileTypeChange = (event:any) => {
    setFileType(event.target.value)
  };
  const handleDownlaodClick = ()=>{
    var downlaodLink:string;
    if (fileType === ".pdf"){
      if (language === "Norsk")
        downlaodLink = data.no_pdf;
      else 
        downlaodLink = data.int_pdf;
    }
    else{
      if (language === "Norsk")
        downlaodLink = data.no_word;
      else 
        downlaodLink = data.int_word;
    }
    
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Last ned CV for {name}</DialogTitle>
      <Button onClick = {handleClose}><CloseIcon/></Button>
        <FormControl component="fieldset">
          <FormLabel component="legend">Velg filtype</FormLabel>
          <RadioGroup aria-label="Velg filtype" name="filtypevalg" value={fileType} onChange={handleFileTypeChange}>
            <FormControlLabel value=".docx" control={<Radio />} label=".docx" />
            <FormControlLabel value=".pdf" control={<Radio />} label=".pdf" />
          </RadioGroup>
       </FormControl>
     
      <FormControl component="fieldset">
        <FormLabel component="legend">Velg språk</FormLabel>
        <RadioGroup aria-label="Velg filtype" name="filtypevalg" value={language} onChange={handleLanguageChange}>
          <FormControlLabel value="Norsk" control={<Radio />} label="Norsk" />
          <FormControlLabel value="Engelsk" control={<Radio />} label="Engelsk" />
        </RadioGroup>
      </FormControl>
      <Button onClick = {handleClose}>
        Avbryt
      </Button>
      <Button onClick = {handleDownlaodClick}>
        Last ned
      </Button>
    </Dialog>
  );
}



export default function CvDialog({name,data}:{name:string, data:CvCellData}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value:any) => {
    setOpen(false);
  };

  return (
    <div>
      <GetApp onClick={handleClickOpen}/>
      <SimpleDialog open={open} onClose={handleClose} name={name} data={data} />
    </div>
  );
}
