import React from 'react'
import ChartCard from '../../../components/charts/ChartCard'
import { useHoursBilledPerWeekCharts } from '../../../api/data/customer/customerQueries'
import { POSSIBLE_OLD_DATA_WARNING } from './messages'
import HoursBilledPerWeekTooltip from '../components/HoursBilledPerWeekTooltip'

const HoursBilledPerWeekCard = () => {
  const { data, error } = useHoursBilledPerWeekCharts()

  return (
    <ChartCard
      title="Timer brukt per periode"
      description={POSSIBLE_OLD_DATA_WARNING}
      isHorizontal={true}
      fullSize={true}
      data={data}
      error={error}
      showFilter={true}
      filterType="perWeek"
      sliceTooltip={HoursBilledPerWeekTooltip}
    />
  )
}

export default HoursBilledPerWeekCard
