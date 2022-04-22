import React from 'react'
import { useHoursBilledPerWeekCharts } from '../../../api/data/customer/customerQueries'
import ChartCard from '../../../components/charts/ChartCard'

const HoursBilledPerWeekCard = () => {
  const { data, error } = useHoursBilledPerWeekCharts()
  return (
    <ChartCard
      title="Timer brukt per uke"
      description="Dataene er fra første registrering i UBW og kan derfor være unøyaktige."
      data={data}
      error={error}
    />
  )
}

export default HoursBilledPerWeekCard
