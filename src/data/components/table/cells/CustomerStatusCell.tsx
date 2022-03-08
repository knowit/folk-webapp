import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Customer } from '../../../../api/data/employee/employeeApiTypes'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
})

interface Props {
  data: Customer | undefined | null
}

export default function CustomerStatusCell({ data }: Props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {data
        ? `${data.customer}: ${data.workOrderDescription}`
        : 'Ikke i prosjekt'}
    </div>
  )
}
