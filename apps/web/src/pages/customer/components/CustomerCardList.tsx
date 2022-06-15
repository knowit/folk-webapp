import { Skeleton } from '@material-ui/lab'
import React from 'react'
import { useCustomerCards } from '../../../api/data/customer/customerQueries'
import CustomerCard from '../cards/CustomerCard'

const CustomerCardList = () => {
  const { data } = useCustomerCards()

  if (!data) {
    return <Skeleton variant="rect" height={780} animation="wave" />
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
