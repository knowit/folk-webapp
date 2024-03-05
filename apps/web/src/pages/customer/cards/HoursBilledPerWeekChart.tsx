import { useMatomo } from '@jonkoops/matomo-tracker-react'
import { useHoursBilledPerWeekCharts } from '../../../api/data/customer/customerQueries'
import ChartCard from '../../../components/charts/ChartCard'
import usePerWeekFilter from '../../../components/charts/chartFilters/usePerWeekFilter'
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import { DateRangePickerButton } from '../../../components/dateranges/DateRangePickerButton'
import HoursBilledPerWeekTooltip from '../components/HoursBilledPerWeekTooltip'
import { POSSIBLE_OLD_DATA_WARNING } from './messages'

interface Props {
  handleDateRangeChange: (
    selectedPeriodStartDate?: Date,
    selectedPeriodEndDate?: Date
  ) => void
  startDate: Date
  endDate: Date
  customersWithConsultants: string[]
  selectedCustomerIds: string[]
  showCustomerHistory?: boolean
  specificCustomer?: boolean
}

const HoursBilledPerWeekChart = ({
  handleDateRangeChange,
  startDate,
  endDate,
  customersWithConsultants,
  selectedCustomerIds,
  showCustomerHistory,
  specificCustomer,
}: Props) => {
  const { data, error } = useHoursBilledPerWeekCharts()
  const {
    filterOptions,
    selectedFilter,
    setSelectedFilter,
    weeklyData,
    monthlyData,
  } = usePerWeekFilter(data)
  const { trackEvent } = useMatomo()

  const customersUnfiltered =
    data === undefined ? [] : data?.data?.map((item) => item.id as string)

  const customers = showCustomerHistory
    ? customersUnfiltered
    : customersWithConsultants
    ? customersUnfiltered.filter((customer) =>
        customersWithConsultants.includes(customer)
      )
    : customersUnfiltered

  const selectedCustomers = customers.filter((customer) =>
    selectedCustomerIds?.includes(customer)
  )

  const setDateRange = (startDate, endDate) => {
    trackEvent({ category: 'filter-dato', action: 'click-event' })
    handleDateRangeChange(startDate, endDate)
  }

  const chartData = selectedFilter === 'Uke' ? weeklyData : monthlyData
  const filteredData =
    data === undefined
      ? undefined
      : {
          ...data,
          data: chartData?.data?.filter((customer) => {
            return selectedCustomers?.includes(customer.id as string)
          }),
        }

  function binarySearch(data, date, compareFn) {
    if (!data) {
      return undefined
    }
    let start = 0
    let end = data.length - 1
    let mid
    while (start <= end) {
      mid = Math.floor((start + end) / 2)
      const cmp = compareFn(date, data[mid].date)
      if (cmp > 0) {
        start = mid + 1
      } else if (cmp < 0) {
        end = mid - 1
      } else {
        return mid
      }
    }
    return start
  }

  function getStartIndex(data, date, compareFn) {
    const index = binarySearch(data, date, compareFn) - 1
    return index >= 0 ? index : 0
  }

  const startIdx = startDate
    ? getStartIndex(filteredData?.data[0]?.data, startDate, (a, b) => a - b + 1)
    : 0

  const endIdx = endDate
    ? binarySearch(filteredData?.data[0]?.data, endDate, (a, b) => a - b)
    : filteredData?.data[0]?.length

  const timeFilteredData =
    filteredData === undefined
      ? undefined
      : {
          ...filteredData,
          data: filteredData.data.map((customer) => ({
            ...customer,
            data: customer.data.slice(startIdx, endIdx),
          })),
        }

  const eventNavn = specificCustomer
    ? 'fakturerte-timer-kunde'
    : 'fakturerte-timer'
  return (
    <ChartCard
      title={'Timer brukt per periode'}
      description={POSSIBLE_OLD_DATA_WARNING}
      data={timeFilteredData}
      error={error}
      fullSize={true}
      noDataText={
        specificCustomer
          ? 'Manglende timelistedata for gitt kunde'
          : 'Bruk listen til høyre for å velge hvilke kunder du vil vise i grafen'
      }
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
                trackEvent({
                  category: `${eventNavn}-${option.toLowerCase()}`,
                  action: 'click-event',
                })
                setSelectedFilter(option)
              }}
            >
              {filterOptions.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={option}
                  style={{ flexGrow: 1 }}
                />
              ))}
            </RadioGroup>

            <DateRangePickerButton
              startDate={startDate}
              endDate={endDate}
              onComplete={(startDate, endDate) =>
                setDateRange(startDate, endDate)
              }
            ></DateRangePickerButton>
          </Box>
        </FormControl>
      }
    />
  )
}

export default HoursBilledPerWeekChart
