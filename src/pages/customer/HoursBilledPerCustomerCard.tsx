import React from 'react'
import { useHoursBilledPerCustomerCharts } from '../../api/data/customer/customerQueries'
import ChartCard from '../../components/charts/ChartCard'

const HoursBilledPerCustomerCard = () => {
  const { data, error } = useHoursBilledPerCustomerCharts()
  return (
    <ChartCard
      title="Timer brukt per kunde"
      description="Dataene er fra første registrering i UBW og kan derfor være unøyaktige."
      data={data}
      error={error}
    />
  )
}

export default HoursBilledPerCustomerCard
