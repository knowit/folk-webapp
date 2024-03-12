import React, { useEffect, useState } from 'react'
import { BaseSkeleton } from '../../../components/skeletons/BaseSkeleton'
import { useCustomerCards } from '../../../api/data/customer/customerQueries'
import CustomerCard from '../cards/CustomerCard'
import { GridItem } from 'web/src/components/gridItem/GridItem'
import { Grid } from '@mui/material'
import CustomerCardSort from './CustomerCardSort'
import { styled } from '@mui/material/styles'
import { ChartPeriod } from '../../../components/charts/chartFilters/useChartData'

const Title = styled('h2')({
  marginBottom: '2px',
})

interface Props {
  selectedCustomerIds: string[]
  showHistoricalData: boolean
  handleCheckboxChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    customerId: string
  ) => void
  selectedChartPeriod: ChartPeriod
}

const CustomerCardList = ({
  selectedCustomerIds,
  showHistoricalData,
  handleCheckboxChange,
  selectedChartPeriod,
}: Props) => {
  const customerCards = useCustomerCards()
  const [customersInGraph, setCustomersInGraph] = useState([])
  const [otherCustomers, setOtherCustomers] = useState([])

  useEffect(() => {
    if (customerCards) {
      const all_customer = customerCards.filter(
        (cc) => showHistoricalData || cc.consultantsLastPeriod > 0
      )

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
  }, [customerCards, selectedCustomerIds, showHistoricalData])

  if (!customerCards) {
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
            <Title>Kunder i graf i angitt periode</Title>
          </Grid>

          {customersInGraph.map((customer) => (
            <CustomerCard
              key={customer.customer}
              data={customer}
              handleCheckboxChange={handleCheckboxChange}
              selectedCustomerIds={selectedCustomerIds}
              selectedChartPeriod={selectedChartPeriod}
            />
          ))}
        </>
      )}
      <>
        <CustomerCardSort
          data={otherCustomers}
          handleCheckboxChange={handleCheckboxChange}
          selectedCustomerIds={selectedCustomerIds}
          selectedChartPeriod={selectedChartPeriod}
        />
      </>
    </>
  )
}

export default CustomerCardList
