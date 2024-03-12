import { useMatomo } from '@jonkoops/matomo-tracker-react'
import { useHoursBilledPerWeekCharts } from '../../../api/data/customer/customerQueries'
import ChartCard from '../../../components/charts/ChartCard'
import { ChartPeriod } from '../../../components/charts/chartFilters/useChartData'
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import storageTokens from '../util/local-storage-tokens'
import { DateRangePickerButton } from '../../../components/dateranges/DateRangePickerButton'
import HoursBilledPerWeekTooltip from '../components/HoursBilledPerWeekTooltip'
import { POSSIBLE_OLD_DATA_WARNING } from './messages'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import useChartData from '../../../components/charts/chartFilters/useChartData'

interface Props {
  customersWithConsultants: string[]
  selectedCustomerIds: string[]
  showCustomerHistory?: boolean
  specificCustomer?: boolean
  selectedChartPeriod: ChartPeriod
  setSelectedChartPeriod: Dispatch<SetStateAction<ChartPeriod>>
}

const HoursBilledPerWeekChart = ({
  customersWithConsultants,
  selectedCustomerIds,
  showCustomerHistory,
  specificCustomer,
  selectedChartPeriod,
  setSelectedChartPeriod,
}: Props) => {
  const [startDate, setStartDate] = useState(storageTokens.getPeriodStartDate())
  const [endDate, setEndDate] = useState(storageTokens.getPeriodEndDate())

  useEffect(() => {
    storageTokens.setPeriodStartDate(startDate)
  }, [startDate])

  useEffect(() => {
    storageTokens.setPeriodEndDate(endDate)
  }, [endDate])

  const { data, error } = useHoursBilledPerWeekCharts()
  const chartData = useChartData(data, selectedChartPeriod)
  const { trackEvent } = useMatomo()

  const selectedCustomers = showCustomerHistory
    ? selectedCustomerIds
    : selectedCustomerIds.filter((sc) => customersWithConsultants.includes(sc))

  const setDateRange = (startDate, endDate) => {
    trackEvent({ category: 'filter-dato', action: 'click-event' })
    setStartDate(startDate)
    setEndDate(endDate)
  }

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
          <FormLabel>Grupper etter periode</FormLabel>
          <Box display="flex" flexWrap="nowrap" width="100%">
            <RadioGroup
              style={{ flexWrap: 'nowrap' }}
              row
              value={selectedChartPeriod}
              onChange={(event) => {
                const option = Object.keys(ChartPeriod).find(
                  (option) => option === event.target.value
                )
                trackEvent({
                  category: `${eventNavn}-${option.toLowerCase()}`,
                  action: 'click-event',
                })
                setSelectedChartPeriod(ChartPeriod[option])
              }}
            >
              {Object.keys(ChartPeriod).map((option: ChartPeriod) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={option === ChartPeriod.WEEK ? 'Uker' : 'Måneder'}
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
