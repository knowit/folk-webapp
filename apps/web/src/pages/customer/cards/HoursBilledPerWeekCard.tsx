import React from 'react'
import ChartCard from '../../../components/charts/ChartCard'
import { useHoursBilledPerWeekCharts } from '../../../api/data/customer/customerQueries'
import { POSSIBLE_OLD_DATA_WARNING } from './messages'

const HoursBilledPerWeekCard = () => {
  const { data, error } = useHoursBilledPerWeekCharts()

  return (
    <ChartCard
      title="Timer brukt per periode"
      description={POSSIBLE_OLD_DATA_WARNING}
      data={data}
      error={error}
      showFilter={true}
      filterType="perWeek"
    />
  )
}

export default HoursBilledPerWeekCard
