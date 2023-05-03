import React from 'react'
import Dialog from '@mui/material/Dialog'
import { styled } from '@mui/material/styles'

const DialogStyled = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    width: '950px',
  },
}))

interface BigChartInterface {
  open: boolean
  onClose: () => void
  children?: JSX.Element | JSX.Element[]
}

const BigChart = ({ onClose, open, children }: BigChartInterface) => {
  return (
    <DialogStyled
      scroll="body"
      onClose={() => onClose()}
      open={open}
      maxWidth={false}
    >
      {children}
    </DialogStyled>
  )
}

export default BigChart
