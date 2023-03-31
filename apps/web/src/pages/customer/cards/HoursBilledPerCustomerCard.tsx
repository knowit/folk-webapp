import React from 'react'
import ChartCard from '../../../components/charts/ChartCard'
import { useHoursBilledPerCustomerCharts } from '../../../api/data/customer/customerQueries'
import { POSSIBLE_OLD_DATA_WARNING } from './messages'
import useFilteredData from '../../../components/charts/chartFilters/useFilteredData'
import DropdownPicker from '../../../components/charts/DropdownPicker'

const HoursBilledPerCustomerCard = () => {
  const { data, error } = useHoursBilledPerCustomerCharts()

  const { filterOptions, getFilteredData, setSelectedFilter, selectedFilter } =
    useFilteredData('perCustomer', data)

  const chartData = getFilteredData()

  return (
    <ChartCard
      title="Timer brukt per kunde"
      description={POSSIBLE_OLD_DATA_WARNING}
      data={chartData}
      error={error}
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

export default HoursBilledPerCustomerCard
