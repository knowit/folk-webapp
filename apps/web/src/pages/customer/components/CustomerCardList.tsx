import React, { useEffect, useState } from 'react'
import { BaseSkeleton } from '../../../components/skeletons/BaseSkeleton'
import { useCustomerCards } from '../../../api/data/customer/customerQueries'
import CustomerCard, { CustomerData } from '../cards/CustomerCard'
import { GridItem } from 'web/src/components/gridItem/GridItem'
import { makeStyles } from '@mui/styles'
import { Grid } from '@mui/material'
import CustomerCardSort from './CustomerCardSort'

const useStyles = makeStyles({
  title: {
    marginBottom: '0',
  },
})

interface Props {
  selectedCustomerIds: string[]
  showHistoricalData: boolean
  historicalCustomers: CustomerData[]
  handleCheckboxChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    customerId: string
  ) => void
}

const CustomerCardList = ({
  selectedCustomerIds,
  historicalCustomers,
  handleCheckboxChange,
}: Props) => {
  const { data } = useCustomerCards()
  const classes = useStyles()

  const [customersInGraph, setCustomersInGraph] = useState([])
  const [otherCustomers, setOtherCustomers] = useState([])

  useEffect(() => {
    if (data) {
      const all_customer = data.concat(historicalCustomers)

      const customers_in_graph =
        selectedCustomerIds !== null &&
        selectedCustomerIds.length > 0 &&
        all_customer.filter(({ customer }) =>
          selectedCustomerIds.includes(customer)
        )

      const other_customers =
        selectedCustomerIds !== null && selectedCustomerIds.length === 0
          ? all_customer
          : all_customer.filter(
              ({ customer }) =>
                selectedCustomerIds && !selectedCustomerIds.includes(customer)
            )

      setCustomersInGraph(customers_in_graph)
      setOtherCustomers(other_customers)
    }
  }, [data, historicalCustomers, selectedCustomerIds])

  if (!data) {
    return (
      <>
        {[...Array(4)].map((_, index) => (
          <GridItem key={index}>
            <BaseSkeleton variant="rectangular" height={175} />
          </GridItem>
        ))}
      </>
    )
  }

  return (
    <>
      {customersInGraph.length > 0 && (
        <>
          <Grid item xs={12}>
            <h2 className={classes.title}>Kunder i graf i angitt periode</h2>
          </Grid>

          {customersInGraph.map((customer) => (
            <CustomerCard
              key={customer.customer}
              data={customer}
              handleCheckboxChange={handleCheckboxChange}
              selectedCustomerIds={selectedCustomerIds}
            />
          ))}
        </>
      )}
      <>
        <CustomerCardSort
          data={otherCustomers}
          handleCheckboxChange={handleCheckboxChange}
          selectedCustomerIds={selectedCustomerIds}
        />
      </>
    </>
  )
}

export default CustomerCardList
