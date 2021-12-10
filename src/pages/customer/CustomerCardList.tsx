import { Skeleton } from '@material-ui/lab'
import React from 'react'
import { DDPayload } from '../../data/types'
import { useFetchedData } from '../../hooks/service'
import CustomerCard, { CustomerData } from './CustomerCard'

// const data = [
//   {
//     customer: 'customer 2',
//     consultants: 1,
//     billedLastPeriod: 6,
//     billedTotal: 6,
//   },
//   {
//     customer: 'customer 1',
//     consultants: 1,
//     billedLastPeriod: 4,
//     billedTotal: 4,
//   },
//   {
//     customer: 'Entur AS',
//     consultants: 2,
//     billedLastPeriod: 16,
//     billedTotal: 32,
//   },
//   {
//     customer: 'customer 3',
//     consultants: 1,
//     billedLastPeriod: 1,
//     billedTotal: 1,
//   },
// ]

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
