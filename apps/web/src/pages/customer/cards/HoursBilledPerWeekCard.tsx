import React from 'react'
import ChartCard from '../../../components/charts/ChartCard'
import { useHoursBilledPerWeekCharts } from '../../../api/data/customer/customerQueries'
import { POSSIBLE_OLD_DATA_WARNING } from './messages'
import HoursBilledPerWeekTooltip from '../components/HoursBilledPerWeekTooltip'
import useFilteredData from '../../../components/charts/chartFilters/useFilteredData'
import { GridItem } from '../../../components/gridItem/GridItem'
import {
  Box,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  FormControl,
} from '@mui/material'
import { DateRangePickerButton } from '../../../components/DateRangePickerButton'

const HoursBilledPerWeekCard = () => {
  const { data, error } = useHoursBilledPerWeekCharts()

  const { filterOptions, getFilteredData, setSelectedFilter, selectedFilter } =
    useFilteredData('perWeek', data)

  const chartData = getFilteredData()

  return (
    <GridItem fullSize={true}>
      <ChartCard
        title="Timer brukt per periode"
        description={POSSIBLE_OLD_DATA_WARNING}
        data={chartData}
        error={error}
        fullSize={true}
        sliceTooltip={HoursBilledPerWeekTooltip}
        extraHeaderContent={
          <FormControl component="fieldset">
            <FormLabel>Grupper etter</FormLabel>
            <Box display="flex" flexWrap="nowrap" width="100%">
              <RadioGroup
                style={{ flexWrap: 'nowrap' }}
                row
                value={selectedFilter}
                onChange={(event) => {
                  const option = filterOptions.find(
                    (option) => option === event.target.value
                  )
                  setSelectedFilter(option)
                }}
              >
                {filterOptions.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio color="primary" />}
                    label={option}
                    style={{ flexGrow: 1 }}
                  />
                ))}
              </RadioGroup>
              <DateRangePickerButton onComplete={(startDate, endDate) => { console.log("startDate", startDate); console.log("endDate", endDate) }} />
            </Box>
          </FormControl>
        }
      />
    </GridItem>
  )
}

export default HoursBilledPerWeekCard
