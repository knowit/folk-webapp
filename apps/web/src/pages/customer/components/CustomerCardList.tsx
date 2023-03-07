import { Skeleton } from '@material-ui/lab'
import React from 'react'
import { useCustomerCards } from '../../../api/data/customer/customerQueries'
import CustomerCard from '../cards/CustomerCard'
import { GridItem } from 'web/src/components/gridItem/GridItem'

const CustomerCardList = () => {
  const { data } = useCustomerCards()

  if (!data) {
    return (
      <>
        {[...Array(4)].map((_, index) => (
          <GridItem key={index}>
            <Skeleton variant="rect" height={175} />
          </GridItem>
        ))}
      </>
    )
  }
  return (
    <>
      {data.map((customer) => (
        <CustomerCard key={customer.customer} data={customer} />
      ))}
    </>
  )
}

export default CustomerCardList
