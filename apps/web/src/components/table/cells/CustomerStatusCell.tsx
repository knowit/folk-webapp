import React from 'react'
import { makeStyles } from '@mui/styles'
import { Customer } from '../../../api/data/employee/employeeApiTypes'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
})

interface Props {
  data: Customer | null
}

export default function CustomerStatusCell(customerData: Props) {
  const classes = useStyles()
  const { data } = customerData

  return (
    <div className={classes.root}>
      {data?.customer && data.workOrderDescription
        ? `${data.customer}: ${data.workOrderDescription}`
        : 'Ikke i prosjekt'}
    </div>
  )
}
