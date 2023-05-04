import React from 'react'
import { BaseSkeleton } from '../../../components/skeletons/BaseSkeleton'
import { useCustomerCards } from '../../../api/data/customer/customerQueries'
import CustomerCard, { CustomerData } from '../cards/CustomerCard'
import { GridItem } from 'web/src/components/gridItem/GridItem'
import { makeStyles } from '@mui/styles'
import { Grid } from '@mui/material'
import CustomerCardSort from './CustomerCardSort'

const useStyles = makeStyles({
  root: {
    borderRadius: '0px 0px 6px 6px',
    overflow: 'hidden',
    height: '100%',
  },
  title: {
    height: 20,
  },
})

interface Props {
  selectedCustomerIds: string[]
  showHistoricalData: boolean
  historicalCustomers: CustomerData[]
}

const CustomerCardList = ({
  selectedCustomerIds,
  historicalCustomers,
}: Props) => {
  const { data } = useCustomerCards()
  const classes = useStyles()

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

  const all_customer = data.concat(historicalCustomers)

  const customers_in_graph =
    selectedCustomerIds.length > 0 &&
    all_customer.filter(({ customer }) =>
      selectedCustomerIds.includes(customer)
    )

  const other_customers =
    selectedCustomerIds.length === 0
      ? all_customer
      : all_customer.filter(
          ({ customer }) => !selectedCustomerIds.includes(customer)
        )

  return (
    <>
      {customers_in_graph && (
        <>
          <Grid item xs={12}>
            <div className={classes.root}>
              <h2 className={classes.title}>Kunder i graf i angitt periode</h2>
            </div>
          </Grid>

          {customers_in_graph.map((customer) => (
            <CustomerCard key={customer.customer} data={customer} />
          ))}
        </>
      )}
      <>
        <CustomerCardSort data={other_customers} />
      </>
    </>
  )
}

export default CustomerCardList
