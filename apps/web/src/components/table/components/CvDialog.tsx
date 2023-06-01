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
  TextField,
} from '@mui/material'
import { CloseIcon } from '../../../assets/Icons'
import { styled } from '@mui/material/styles'
import * as ExcelJS from 'exceljs'
import { CvLinks } from '../../../api/data/employee/employeeApiTypes'

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

const CardStyled = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'direction',
})<{ column?: boolean }>(({ theme, column }) => ({
  backgroundColor: theme.palette.background.default,
  width: 323.2,
  height: 132,
  borderRadius: 10,
  display: 'flex',
  justifyContent: column ? '' : 'space-around',
  flexDirection: column ? 'column' : 'row',
  boxShadow: `0 4px 10px 0 ${theme.palette.text.primary}05`,
  border: `solid 1px ${theme.palette.background.darker}`,
  padding: 10,
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
  data?: CvLinks
  rows?: string[][]
  onClose: () => void
  open: boolean
  filtered?: boolean
  name?: string
}

export default function CvDialog({
  onClose,
  data,
  rows,
  open,
  filtered,
  name,
}: CVDialogProps) {
  const [fileType, setFileType] = useState('.pdf')
  const [language, setLanguage] = useState('Norsk')
  const [downloadLink, setDownloadLink] = useState(data?.int_pdf)
  const [fileNameChoice, setFileNameChoice] = useState(false)
  const [fileName, setFileName] = useState('filterOutput')

  useEffect(() => {
    if (fileType === '.pdf') {
      if (language === 'Norsk') setDownloadLink(data?.no_pdf)
      else setDownloadLink(data.int_pdf)
    } else if (language === 'Norsk') setDownloadLink(data?.no_word)
    else setDownloadLink(data?.int_word)
  }, [language, fileType, data])

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLanguage(event.target.value)
  }
  const handleFileTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileType(event.target.value)
  }
  const handleFileNameChoiceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileNameChoiceBool = JSON.parse(event.target.value)
    setFileNameChoice(fileNameChoiceBool)

    if (!fileNameChoiceBool) {
      setFileName('filterOutput')
    }
  }

  const handleDownload = () => {
    createXlsLinks(rows, fileName)
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
      {filtered ? (
        <CardStyled column={true}>
          <FormControl>
            <RadioGroup
              aria-label="Velg filnavn"
              name="filnavnvalg"
              value={fileNameChoice}
              onChange={handleFileNameChoiceChange}
            >
              <FormControlLabelStyled
                value="false"
                control={<RadioStyledBlack />}
                label="Bruk default"
              />
              <FormControlLabelStyled
                value="true"
                control={<RadioStyledBlack />}
                label="Angi filnavn"
              />
            </RadioGroup>
          </FormControl>
          {fileNameChoice == true ? (
            <TextField
              placeholder="Angi filnavn"
              onChange={(event) => setFileName(event.target.value)}
            ></TextField>
          ) : null}
        </CardStyled>
      ) : (
        <CardStyled>
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
      )}
      <DialogActions>
        <ButtonGreyStyled variant="outlined" onClick={() => onClose()}>
          Avbryt
        </ButtonGreyStyled>
        {filtered ? (
          <ButtonGreenStyled onClick={handleDownload}>
            Last ned
          </ButtonGreenStyled>
        ) : (
          <ButtonGreenStyled variant="contained" href={downloadLink}>
            Last ned
          </ButtonGreenStyled>
        )}
      </DialogActions>
    </DialogStyled>
  )
}

export function createXlsLinks(rows: string[][], filename: string) {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Sheet 1')
  worksheet.addRows(rows)
  worksheet.columns.forEach((column) => (column.width = 30))
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename + '.xlsx'
    link.click()
  })
}
