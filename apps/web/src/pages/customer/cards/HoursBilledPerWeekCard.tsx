import ChartCard from '../../../components/charts/ChartCard'
import { useHoursBilledPerWeekCharts } from '../../../api/data/customer/customerQueries'
import { POSSIBLE_OLD_DATA_WARNING } from './messages'
import HoursBilledPerWeekTooltip from '../components/HoursBilledPerWeekTooltip'
import { GridItem } from '../../../components/gridItem/GridItem'
import { GridItemHeader } from '../../../components/gridItem/GridItemHeader'
import {
  Box,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  FormControl,
  Checkbox,
} from '@mui/material'
import { styled } from '@mui/styles'
import usePerWeekFilter from '../../../components/charts/chartFilters/usePerWeekFilter'
import { GridItemContent } from '../../../components/gridItem/GridItemContent'
import { BaseSkeleton } from '../../../components/skeletons/BaseSkeleton'
import { motion, LayoutGroup } from 'framer-motion'
import { DateRangePickerButton } from '../../../components/dateranges/DateRangePickerButton'

const GridContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: '3fr 1fr',
  gridGap: '1rem',
})

const CustomerFilterWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '420px',
  textAlign: 'right',
  background: 'white',
})

const ScrollableDiv = styled('div')({
  overflowY: 'scroll',
})

const CheckboxFlexWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
})

interface HoursBilledPerWeekCardProps {
  selectedCustomerIds: string[]
  setSelectedCustomerIds: (ids: string[]) => void
  startDate: Date
  endDate: Date
  handleDateRangeChange: (startDate?: string, endDate?: string) => void
}

const easingFunction = { ease: [0.33, 0, 1, 0.62], duration: 1 }

const HoursBilledPerWeekCard = ({
  selectedCustomerIds,
  setSelectedCustomerIds,
  startDate,
  endDate,
  handleDateRangeChange,
}: HoursBilledPerWeekCardProps) => {
  const { data, error } = useHoursBilledPerWeekCharts()
  const {
    filterOptions,
    selectedFilter,
    setSelectedFilter,
    weeklyData,
    monthlyData,
  } = usePerWeekFilter(data)

  const customers =
    data === undefined ? [] : data?.data?.map((item) => item.id as string)

  const selectedCustomers = customers.filter((customer) =>
    selectedCustomerIds?.includes(customer)
  )
  const unselectedCustomers = customers.filter(
    (customer) => !selectedCustomerIds?.includes(customer)
  )
  const handleSelectAll = () => {
    setSelectedCustomerIds(customers)
  }
  const handleSelectNone = () => {
    setSelectedCustomerIds([])
  }

  const handleCheckboxChange = (event, customerId) => {
    if (event.target.checked) {
      setSelectedCustomerIds([...selectedCustomerIds, customerId])
    } else {
      setSelectedCustomerIds(
        selectedCustomerIds.filter((id) => id !== customerId)
      )
    }
  }

  const setDateRange = (startDate, endDate) => {
    handleDateRangeChange(startDate, endDate)
  }

  const chartData = selectedFilter === 'Uke' ? weeklyData : monthlyData
  const filteredData =
    data === undefined
      ? undefined
      : {
          ...data,
          data: chartData?.data?.filter((customer) => {
            return selectedCustomerIds?.includes(customer.id as string)
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
  const startIdx = binarySearch(
    filteredData?.data[0]?.data,
    startDate,
    (a, b) => a - b
  )
  const endIdx =
    binarySearch(filteredData?.data[0]?.data, endDate, (a, b) => a - (b - 1)) -
    1

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

  return (
    <GridItem fullSize>
      {filteredData === undefined || selectedCustomerIds === null ? (
        <BaseSkeleton variant="rectangular" height={420}></BaseSkeleton>
      ) : (
        <GridContainer>
          <ChartCard
            title="Timer brukt per periode"
            description={POSSIBLE_OLD_DATA_WARNING}
            data={timeFilteredData}
            error={error}
            fullSize={true}
            noDataText="Bruk listen til høyre for å velge hvilke kunder du vil vise i grafen"
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
          <CustomerFilterWrapper>
            <GridItemHeader title="Filtrer kunder">
              <Checkbox
                checked={selectedCustomerIds?.length === customers.length}
                onChange={
                  selectedCustomerIds?.length === customers.length
                    ? handleSelectNone
                    : handleSelectAll
                }
                name="select-all"
              />
            </GridItemHeader>

            <ScrollableDiv>
              <GridItemContent>
                <CheckboxFlexWrapper>
                  <LayoutGroup>
                    {selectedCustomers.map((customer) => (
                      <motion.div
                        layoutId={customer}
                        key={customer}
                        initial={false}
                        transition={easingFunction}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedCustomerIds.includes(customer)}
                              onChange={(event) =>
                                handleCheckboxChange(event, customer)
                              }
                              name={customer}
                            />
                          }
                          label={customer}
                          labelPlacement="start"
                          key={customer}
                        />
                      </motion.div>
                    ))}
                    {unselectedCustomers.map((customer) => (
                      <motion.div
                        layoutId={customer}
                        key={customer}
                        initial={false}
                        transition={easingFunction}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedCustomerIds?.includes(customer)}
                              onChange={(event) =>
                                handleCheckboxChange(event, customer)
                              }
                              name={customer}
                            />
                          }
                          label={customer}
                          labelPlacement="start"
                          key={customer}
                        />
                      </motion.div>
                    ))}
                  </LayoutGroup>
                </CheckboxFlexWrapper>
              </GridItemContent>
            </ScrollableDiv>
          </CustomerFilterWrapper>
        </GridContainer>
      )}
    </GridItem>
  )
}

export default HoursBilledPerWeekCard
