import React from 'react'
import ChartCard from '../../../components/charts/ChartCard'
import { useHoursBilledPerWeekCharts } from '../../../api/data/customer/customerQueries'
import { POSSIBLE_OLD_DATA_WARNING } from './messages'
import HoursBilledPerWeekTooltip from '../components/HoursBilledPerWeekTooltip'
import useFilteredData from '../../../components/charts/chartFilters/useFilteredData'
import DropdownPicker from '../../../components/charts/DropdownPicker'

const HoursBilledPerWeekCard = () => {
  const { data, error } = useHoursBilledPerWeekCharts()

  const { filterOptions, getFilteredData, setSelectedFilter, selectedFilter } =
    useFilteredData('perWeek', data)

  const chartData = getFilteredData()

  return (
    <ChartCard
      title="Timer brukt per periode"
      description={POSSIBLE_OLD_DATA_WARNING}
      data={chartData}
      error={error}
      sliceTooltip={HoursBilledPerWeekTooltip}
      extraHeaderContent={
        <DropdownPicker
          values={filterOptions}
          selected={selectedFilter}
          onChange={setSelectedFilter}
        />
      }
    />
  )
}

export default HoursBilledPerWeekCard
