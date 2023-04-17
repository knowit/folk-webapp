import React from 'react'
import Dialog from '@mui/material/Dialog'
import { withStyles } from '@mui/styles'

const DialogBox = withStyles(() => ({
  paper: {
    width: '950px',
    borderRadius: '0px',
    padding: '2rem',
  },
}))(Dialog)

interface BigChartInterface {
  open: boolean
  onClose: () => void
  children?: JSX.Element | JSX.Element[]
}

const BigChart = ({ onClose, open, children }: BigChartInterface) => {
  return (
    <DialogBox
      scroll="body"
      onClose={() => onClose()}
      open={open}
      maxWidth={false}
    >
      {children}
    </DialogBox>
  )
}

export default BigChart
