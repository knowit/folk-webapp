import React, { useEffect, useState } from 'react'
import CustomerCardList from './CustomerCardList'
import { useHoursBilledPerCustomerCharts } from '../../../api/data/customer/customerQueries'
import { CustomerData } from '../cards/CustomerCard'

interface Props {
  selectedCustomerIds: string[]
  showHistoricalData: boolean
  customersWithConsultants: string[]
}

const CustomerCardListOverview = ({
  selectedCustomerIds,
  showHistoricalData,
  customersWithConsultants,
}: Props) => {
  const { data } = useHoursBilledPerCustomerCharts()
  const [historicalCustomers, setHistoricalCustomers] = useState<
    CustomerData[]
  >([])

  useEffect(() => {
    const historical_customer_sorted = []
    const historical_customer =
      data && showHistoricalData
        ? data?.data?.filter(
            ({ customer }) => !customersWithConsultants.includes(customer)
          )
        : []

    historical_customer.map((customer) =>
      historical_customer_sorted.push({
        customer: customer.customer,
        consultants: 0,
        billedTotal: customer.hours,
      })
    )
    setHistoricalCustomers(historical_customer_sorted)
  }, [customersWithConsultants, data, showHistoricalData])

  return (
    <CustomerCardList
      selectedCustomerIds={selectedCustomerIds}
      showHistoricalData={showHistoricalData}
      historicalCustomers={historicalCustomers}
    />
  )
}

export default CustomerCardListOverview
