import * as React from 'react'
import { Customer } from '../../../api/data/employee/employeeApiTypes'
import { makeStyles } from '@material-ui/core/styles'
import { MultiLineSkeleton } from '../../../components/skeletons/MultiLineSkeleton'
import { FallbackMessage } from './FallbackMessage'
import { ExperienceList } from './ExperienceList'
import { ExperienceListItem } from './ExperienceListItem'

const useStyles = makeStyles({
  customerName: {
    fontWeight: 'bold',
  },
})

interface Props {
  customers?: Customer[]
  isLoading?: boolean
}

export function CustomersForEmployee({ customers, isLoading }: Props) {
  const classes = useStyles()

  if (isLoading) {
    return <MultiLineSkeleton />
  }

  if (!customers || customers.length === 0) {
    return <FallbackMessage message="Fant ingen kunder å vise." />
  }

  const customersSortedByWeight = customers.sort(
    (customerA, customerB) => customerA.weight - customerB.weight
  )

  return (
    <ExperienceList>
      {customersSortedByWeight.map((customer) => (
        <ExperienceListItem key={customer.customer + customer.weight}>
          <span className={classes.customerName}>{customer.customer}: </span>
          {customer.workOrderDescription}
        </ExperienceListItem>
      ))}
    </ExperienceList>
  )
}
