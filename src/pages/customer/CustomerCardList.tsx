import React from 'react'
import { GridItem } from '../../components/GridItem'
import CustomerCard from './CustomerCard'

const data = [
  {
    customer: 'customer 2',
    consultants: 1,
    billedLastPeriod: 6,
    billedTotal: 6,
  },
  {
    customer: 'customer 1',
    consultants: 1,
    billedLastPeriod: 4,
    billedTotal: 4,
  },
  {
    customer: 'Entur AS',
    consultants: 2,
    billedLastPeriod: 16,
    billedTotal: 32,
  },
  {
    customer: 'customer 3',
    consultants: 1,
    billedLastPeriod: 1,
    billedTotal: 1,
  },
]

const CustomerCardList = () => {
  // const [value, pending, error] = useFetchedData<DDPayload>({
  //   url: '/api/data/customerCards',
  // })

  return (
    <>
      {data.map((customer) => (
        <CustomerCard key={customer.customer} {...customer} />
      ))}
    </>
  )
}

export default CustomerCardList
