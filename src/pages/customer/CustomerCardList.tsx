import { Skeleton } from '@material-ui/lab'
import React from 'react'
import { DDPayload } from '../../data/types'
import { useFetchedData } from '../../hooks/service'
import CustomerCard, { CustomerData } from './CustomerCard'

const CustomerCardList = () => {
  const [data, pending, error] = useFetchedData<DDPayload>({
    url: '/api/data/customerCards',
  })

  if (error) {
    return (
      <>
        Error! {error.name} {error.message}
      </>
    )
  }

  if (pending) {
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
