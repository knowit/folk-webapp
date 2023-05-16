import React, { useState } from 'react'
import { DownloadIcon } from '../../../assets/Icons'
import { styled } from '@mui/material/styles'
import { NoData } from '../../ErrorText'
import CvDialog from '../components/CvDialog'
import { CvLinks } from '../../../api/data/employee/employeeApiTypes'

const CvDownloadStyled = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
}))

interface CVCellProps {
  data: CvLinks
  name: string
}

export default function CvCell({ data, name }: CVCellProps) {
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return data ? (
    <>
      <CvDownloadStyled title="Last ned CV">
        <DownloadIcon onClick={handleClickOpen} />
      </CvDownloadStyled>
      <CvDialog open={open} onClose={handleClose} name={name} data={data} />
    </>
  ) : (
    <NoData />
  )
}
