import * as React from 'react'
import { Customer } from '../../../api/data/employee/employeeApiTypes'
import { makeStyles } from '@material-ui/core/styles'
import { MultiLineSkeleton } from '../../../components/skeletons/MultiLineSkeleton'
import { FallbackMessage } from './FallbackMessage'
import { UnorderedList } from '../../../components/lists/UnorderedList'
import { ListItem } from '../../../components/lists/ListItem'

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
    // TODO: make better fallback component
    return <FallbackMessage message="Fant ingen kunder å vise." />
  }

  const customersSortedByWeight = customers.sort(
    (customerA, customerB) => customerA.weight - customerB.weight
  )

  return (
    <UnorderedList>
      {customersSortedByWeight.map((customer) => (
        <ListItem key={customer.customer + customer.weight}>
          <span className={classes.customerName}>{customer.customer}: </span>
          {customer.workOrderDescription}
        </ListItem>
      ))}
    </UnorderedList>
  )
}
