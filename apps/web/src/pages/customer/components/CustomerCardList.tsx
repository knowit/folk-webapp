import { BaseSkeleton } from '../../../components/skeletons/BaseSkeleton'
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
            <BaseSkeleton variant="rect" height={175} />
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
