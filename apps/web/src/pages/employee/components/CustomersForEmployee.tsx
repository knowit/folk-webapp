import * as React from 'react'
import { Customer } from '../../../api/data/employee/employeeApiTypes'
import { makeStyles } from '@mui/styles'
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
  error?: object
}

export function CustomersForEmployee({ customers, isLoading, error }: Props) {
  const classes = useStyles()

  if (error) {
    return <FallbackMessage error={error} />
  }

  if (isLoading) {
    return <MultiLineSkeleton />
  }

  if (!customers || customers.length === 0) {
    return <FallbackMessage message="Fant ingen kunder å vise." />
  }

  const sortedCustomers = customers.sort((customerA, customerB) =>
    String(customerA.customer).localeCompare(String(customerB.customer))
  )

  return (
    <ExperienceList>
      {sortedCustomers.map((customer) => (
        <ExperienceListItem
          key={customer.customer + customer.workOrderDescription}
        >
          <span className={classes.customerName}>{customer.customer}: </span>
          {customer.workOrderDescription}
        </ExperienceListItem>
      ))}
    </ExperienceList>
  )
}
