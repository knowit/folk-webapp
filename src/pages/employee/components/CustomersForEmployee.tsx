import * as React from 'react'
import { Customer } from '../../../api/data/employee/employeeApiTypes'
import { makeStyles } from '@material-ui/core/styles'
import { MultiLineSkeleton } from '../../../components/skeletons/MultiLineSkeleton'
import { FallbackMessage } from '../../../components/FallbackMessage'
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
  isError?: boolean
}

export function CustomersForEmployee({ customers, isLoading, isError }: Props) {
  const classes = useStyles()

  if (isError) {
    return (
      <FallbackMessage isError message="Noe gikk galt ved henting av kunder." />
    )
  }

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
