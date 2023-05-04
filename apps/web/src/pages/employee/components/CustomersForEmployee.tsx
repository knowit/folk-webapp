import * as React from 'react'
import { Customer } from '../../../api/data/employee/employeeApiTypes'
import { styled } from '@mui/material/styles'
import { MultiLineSkeleton } from '../../../components/skeletons/MultiLineSkeleton'
import { FallbackMessage } from './FallbackMessage'
import { ExperienceList } from './ExperienceList'
import { ExperienceListItem } from './ExperienceListItem'

const CustomerName = styled('span')(() => ({
  fontWeight: 'bold',
}))

interface Props {
  customers?: Customer[]
  isLoading?: boolean
  error?: object
}

export function CustomersForEmployee({ customers, isLoading, error }: Props) {
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
          <CustomerName>{customer.customer}: </CustomerName>
          {customer.workOrderDescription}
        </ExperienceListItem>
      ))}
    </ExperienceList>
  )
}
