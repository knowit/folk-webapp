import React, { useState } from 'react'
import GetApp from '@material-ui/icons/GetApp'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { withStyles } from '@material-ui/core'
import { NoData } from '../../../../components/ErrorText'
import CvDialog from '../components/CvDialog'
import { CvLinks } from '../../../../api/data/employee/employeeApiTypes'

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
})

const DownloadIcon = withStyles({
  root: {
    color: '#707070',
    cursor: 'pointer',
    '&:hover': {
      color: '#333333',
    },
  },
})(GetApp)

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
  const classes = useStyles()
  return data ? (
    <>
      <div className={classes.root} title="Last ned CV">
        <DownloadIcon onClick={handleClickOpen} />
      </div>
      <CvDialog open={open} onClose={handleClose} name={name} data={data} />
    </>
  ) : (
    <NoData />
  )
}
