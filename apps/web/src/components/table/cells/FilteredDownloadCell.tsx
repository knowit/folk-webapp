import React, { useState } from 'react'
import { DownloadIcon } from '../../../assets/Icons'
import { styled } from '@mui/material/styles'
import { NoData } from '../../ErrorText'
import { FilterObject } from '../../filter/FilterUtil'
import CvDialog from '../components/CvDialog'
import { Button } from '@mui/material'

const ComponentRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.darker,
  padding: '0px 15px 15px',
  display: 'flex',
  width: '100%',
  fontWeight: 'bold',
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
  color: theme.palette.text.primary,
  display: 'flex',
  padding: '8px 12px',
  textTransform: 'inherit',
  marginBottom: '5px',
  backgroundColor: theme.palette.background.default,
}))

interface FilteredDownloadProps {
  filters: FilterObject[]
  consultants: string[][]
}

export default function FilteredDownloadCell({
  filters,
  consultants,
}: FilteredDownloadProps) {
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const rows = []
  filters
    .filter((filter) => filter.filters.length > 0)
    .forEach((filter) => {
      if (filter.filters.length > 0) {
        const columns: string[] = []
        columns.push(filter.label)
        filter.filters.forEach((entry) => {
          columns.push(entry.value + ':' + entry.threshold)
        })
        rows.push(columns)
      }
    })
  rows.push([])
  rows.push(['Navn', 'Tittel', 'Prosjektstatus', 'Kunde'])
  consultants.forEach((consultant) => {
    rows.push(consultant)
  })

  return filters.some((filter) => filter.filters.length > 0) &&
    consultants.length > 0 ? (
    <ComponentRoot>
      <ButtonStyled
        onClick={handleClickOpen}
        aria-label="Last ned som excel-fil"
        endIcon={<DownloadIcon />}
      >
        Last ned som excel-fil
      </ButtonStyled>
      <CvDialog open={open} onClose={handleClose} rows={rows} filtered={true} />
    </ComponentRoot>
  ) : null
}
