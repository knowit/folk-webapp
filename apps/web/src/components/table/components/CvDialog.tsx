import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  Dialog,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import { CloseIcon } from '../../../assets/Icons'
import { styled } from '@mui/material/styles'
import { CvLinks } from '../../../api/data/employee/employeeApiTypes'
import { FilterEntry } from '../../filter/FilterUtil'

const DialogStyled = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    width: '600px',
    height: '360px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))
const RadioStyledBlack = styled(Radio)(({ theme }) => ({
  height: 20,
  width: 20,
  margin: 5,
  color: theme.palette.text.primary,
  '&$checked': {
    color: theme.palette.text.primary,
  },
}))
const CardStyled = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  width: 323.2,
  height: 132,
  borderRadius: 10,
  display: 'flex',
  justifyContent: 'space-around',
  flexDirection: 'row',
  boxShadow: `0 4px 10px 0 ${theme.palette.text.primary}05`,
  border: `solid 1px ${theme.palette.background.darker}`,
  padding: 21,
}))
const FormControlLabelStyled = styled(FormControlLabel)(() => ({
  margin: 0,
  padding: 0,
  fontSize: 14,
}))
const ButtonGreenStyled = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
  borderRadius: 5,
  color: theme.palette.primary.contrastText,
  width: 106,
  '&:hover': {
    backgroundColor: theme.palette.success.dark,
  },
}))
const ButtonGreyStyled = styled(Button)(({ theme }) => ({
  backgroundColor: 'none',
  border: `1px solid ${theme.palette.info.main}`,
  borderRadius: 5,
  color: theme.palette.info.dark,
  width: 106,
  '&:hover': {
    border: `1px solid ${theme.palette.info.main}`,
  },
}))
const CloseIconContainer = styled('div')(() => ({
  position: 'absolute',
  alignSelf: 'flex-end',
  marginRight: 15,
  marginTop: 15,
  width: 24,
  height: 24,
}))
const DialogTitle = styled('p')(({ theme }) => ({
  fontSize: 18,
  // lineHeight: 23,
  color: theme.palette.text.primary,
  fontFamily: 'Arial',
  fontWeight: 'bold',
  marginTop: 44,
  marginBottom: 40,
}))
const DialogSubtitle = styled('div')(({ theme }) => ({
  fontFamily: 'Arial',
  fontSize: 16,
  // lineHeight: 23,
  color: theme.palette.text.primary,
  marginBottom: 11,
}))
const DialogActions = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-around',
  width: '50%',
  margin: 'auto',
}))

interface CVDialogProps {
  data: CvLinks
  onClose: () => void
  open: boolean
  filtered?: boolean
  name?: string
}

export default function CvDialog({
  onClose,
  data,
  open,
  filtered,
  name,
}: CVDialogProps) {
  const [fileType, setFileType] = useState('.pdf')
  const [language, setLanguage] = useState('Norsk')
  const [downloadLink, setDownloadLink] = useState(data.int_pdf)

  useEffect(() => {
    if (fileType === '.pdf') {
      if (language === 'Norsk') setDownloadLink(data.no_pdf)
      else setDownloadLink(data.int_pdf)
    } else if (language === 'Norsk') setDownloadLink(data.no_word)
    else setDownloadLink(data.int_word)
  }, [language, fileType, data])

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLanguage(event.target.value)
  }
  const handleFileTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileType(event.target.value)
  }

  return (
    <DialogStyled
      onClose={() => onClose()}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      {filtered ? (
        <DialogTitle>Last ned filtrert ansattliste </DialogTitle>
      ) : (
        <DialogTitle>Last ned CV for {name}</DialogTitle>
      )}
      <CloseIconContainer onClick={() => onClose()} title="Lukk">
        <CloseIcon />
      </CloseIconContainer>
      <CardStyled>
        {filtered ? (
          <FormControl component="fieldset">
            <DialogSubtitle>Velg filtype</DialogSubtitle>
            <RadioGroup
              aria-label="Velg filtype"
              name="filtypevalg"
              value={fileType}
              onChange={handleFileTypeChange}
            >
              <FormControlLabelStyled
                value=".xls"
                control={<RadioStyledBlack />}
                label=".xls"
              />
            </RadioGroup>
          </FormControl>
        ) : (
          <FormControl component="fieldset">
            <DialogSubtitle>Velg filtype</DialogSubtitle>
            <RadioGroup
              aria-label="Velg filtype"
              name="filtypevalg"
              value={fileType}
              onChange={handleFileTypeChange}
            >
              <FormControlLabelStyled
                value=".docx"
                control={<RadioStyledBlack />}
                label=".docx"
              />
              <FormControlLabelStyled
                value=".pdf"
                control={<RadioStyledBlack />}
                label=".pdf"
              />
            </RadioGroup>
          </FormControl>
        )}
        <Divider orientation="vertical" />
        <FormControl component="fieldset">
          <DialogSubtitle>Velg språk</DialogSubtitle>
          <RadioGroup
            aria-label="Velg filtype"
            name="filtypevalg"
            value={language}
            onChange={handleLanguageChange}
          >
            <FormControlLabelStyled
              value="Norsk"
              control={<RadioStyledBlack />}
              label="Norsk"
            />
            <FormControlLabelStyled
              value="Engelsk"
              control={<RadioStyledBlack />}
              label="Engelsk"
            />
          </RadioGroup>
        </FormControl>
      </CardStyled>
      <DialogActions>
        <ButtonGreyStyled variant="outlined" onClick={() => onClose()}>
          Avbryt
        </ButtonGreyStyled>
        <ButtonGreenStyled variant="contained" href={downloadLink}>
          Last ned
        </ButtonGreenStyled>
      </DialogActions>
    </DialogStyled>
  )
}
