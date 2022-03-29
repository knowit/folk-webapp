import { Skeleton } from '@material-ui/lab'
import React from 'react'
import CustomerCard, { CustomerData } from './CustomerCard'
import { useCustomerCards } from '../../api/data/customer/customerQueries'

const CustomerCardList = () => {
  const { data, error } = useCustomerCards()

  if (error) {
    return (
      <>
        Error! {error.name} {error.message}
      </>
    )
  }

  if (!data) {
    return <Skeleton variant="rect" height={780} animation="wave" />
  }

  return (
    <>
      {data
        ? data.map((customer: CustomerData) => (
            <CustomerCard key={customer.customer} data={customer} />
          ))
        : null}
    </>
  )
}

export default CustomerCardList
