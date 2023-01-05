import React from 'react'
import ChartCard from '../../../components/charts/ChartCard'
import { useHoursBilledPerCustomerCharts } from '../../../api/data/customer/customerQueries'
import { POSSIBLE_OLD_DATA_WARNING } from './messages'

const HoursBilledPerCustomerCard = () => {
  const { data, error } = useHoursBilledPerCustomerCharts()

  return (
    <ChartCard
      title="Timer brukt per kunde"
      description={POSSIBLE_OLD_DATA_WARNING}
      data={data}
      error={error}
      showFilter={true}
      filterType="perCustomer"
    />
  )
}

export default HoursBilledPerCustomerCard
