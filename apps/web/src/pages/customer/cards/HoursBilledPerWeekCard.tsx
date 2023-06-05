import ChartCard from '../../../components/charts/ChartCard'
import {
  useEmployeesPerWeekCharts,
  useHoursBilledPerWeekCharts,
} from '../../../api/data/customer/customerQueries'
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
import { styled } from '@mui/material/styles'
import { GridItemContent } from '../../../components/gridItem/GridItemContent'
import { BaseSkeleton } from '../../../components/skeletons/BaseSkeleton'
import { motion, LayoutGroup } from 'framer-motion'
import { DateRangePickerButton } from '../../../components/dateranges/DateRangePickerButton'
import CustomerGraphFilter from '../components/CustomerGraphFilter'
import {
  usePerWeekFilter,
  useGraphData,
} from '../../../components/charts/chartFilters/usePerWeekFilter'
import { useState } from 'react'

const GridContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: '3fr 1fr',
  gridGap: '1rem',
})

const CustomerFilterWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: 420,
  textAlign: 'right',
  background: theme.palette.background.default,
}))

const ScrollableDiv = styled('div')(() => ({
  overflowY: 'scroll',
  height: '100%',
}))

const CheckboxFlexWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  height: 324,
  maxHeight: 324,
}))

interface HoursBilledPerWeekCardProps {
  selectedCustomerIds: string[]
  setSelectedCustomerIds?: (ids: string[]) => void
  selectedPeriodStartDate: Date
  selectedPeriodEndDate: Date
  handleDateRangeChange: (
    selectedPeriodStartDate?: Date,
    selectedPeriodEndDate?: Date
  ) => void
  handleCheckboxChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    customerId: string
  ) => void
  customersWithConsultants: string[]
  customerHistory: boolean
  handleCustomerHistory?: () => void
  customerSpecificGraph: boolean
}

const easingFunction = { ease: [0.33, 0, 1, 0.62], duration: 1 }

const HoursBilledPerWeekCard = ({
  selectedCustomerIds,
  setSelectedCustomerIds,
  selectedPeriodStartDate: startDate,
  selectedPeriodEndDate: endDate,
  handleDateRangeChange,
  customersWithConsultants,
  customerHistory,
  handleCustomerHistory,
  handleCheckboxChange,
  customerSpecificGraph,
}: HoursBilledPerWeekCardProps) => {
  const { data, error } = useHoursBilledPerWeekCharts()
  const { data: employeeData } = useEmployeesPerWeekCharts()
  const {
    filterOptions,
    selectedFilter,
    setSelectedFilter,
    weeklyData,
    monthlyData,
  } = usePerWeekFilter(data)
  const { weeklyData: employeeWeeklyData, monthlyData: employeeMonthlyData } =
    useGraphData(employeeData)
  const [graphView, setGraphView] = useState('hoursBilled')

  const customersUnfiltered =
    data === undefined ? [] : data?.data?.map((item) => item.id as string)

  const customers = customerHistory
    ? customersUnfiltered
    : customersWithConsultants
    ? customersUnfiltered.filter((customer) =>
        customersWithConsultants.includes(customer)
      )
    : customersUnfiltered

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

  const setDateRange = (startDate, endDate) => {
    handleDateRangeChange(startDate, endDate)
  }

  const handleGraphViewChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGraphView(event.target.value)
  }

  const chartData =
    graphView === 'hoursBilled'
      ? selectedFilter === 'Uke'
        ? weeklyData
        : monthlyData
      : selectedFilter === 'Uke'
      ? employeeWeeklyData
      : employeeMonthlyData

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

  function toggleSelectAll() {
    selectedCustomerIds?.length === customers.length
      ? handleSelectNone()
      : handleSelectAll()
  }

  function toggleShowHistoricCustomer() {
    handleCustomerHistory()

    if (selectAll.checked === true) {
      toggleSelectAll()
    }
  }

  const showHistoricCustomer = {
    label: 'Inkluder kunder uten aktive prosjekter i listen',
    changeHandler: toggleShowHistoricCustomer,
    checked: customerHistory,
  }

  const selectAll = {
    label: 'Marker alle kunder',
    changeHandler: toggleSelectAll,
    checked: selectedCustomerIds?.length === customers.length,
  }

  return (
    <GridItem fullSize>
      {filteredData === undefined || selectedCustomerIds === null ? (
        <BaseSkeleton variant="rectangular" height={420}></BaseSkeleton>
      ) : customerSpecificGraph ? (
        <div>
          {' '}
          <ChartCard
            title={'Timer brukt per periode'}
            description={POSSIBLE_OLD_DATA_WARNING}
            data={timeFilteredData}
            error={error}
            fullSize={true}
            noDataText={
              customerSpecificGraph
                ? 'Manglende timelistedata for gitt kunde'
                : 'Bruk listen til høyre for å velge hvilke kunder du vil vise i grafen'
            }
            sliceTooltip={HoursBilledPerWeekTooltip}
            extraHeaderContent={
              <FormControl component="fieldset">
                <FormLabel>Grupper etter</FormLabel>
                <Box display="inline-flex" flexWrap="nowrap" width="100%">
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
        </div>
      ) : (
        <GridContainer>
          <ChartCard
            title={
              graphView == 'hoursBilled'
                ? 'Timer brukt per periode'
                : 'Konsulenter per periode'
            }
            description={POSSIBLE_OLD_DATA_WARNING}
            data={timeFilteredData}
            error={error}
            fullSize={true}
            noDataText={
              customerSpecificGraph
                ? 'Manglende timelistedata for gitt kunde'
                : 'Bruk listen til høyre for å velge hvilke kunder du vil vise i grafen'
            }
            sliceTooltip={HoursBilledPerWeekTooltip}
            extraHeaderContent={
              <FormControl component="fieldset">
                <Box
                  display="flex"
                  flexWrap="nowrap"
                  width="100%"
                  alignItems="center"
                >
                  <div>
                    <FormLabel>Grupper etter</FormLabel>
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
                          control={<Radio />}
                          label={option}
                          style={{ flexGrow: 1 }}
                        />
                      ))}
                    </RadioGroup>
                  </div>
                  <div>
                    <FormLabel>Visning</FormLabel>
                    <RadioGroup
                      aria-label="Velg filtype"
                      name="grafVisning"
                      row
                      value={graphView}
                      onChange={handleGraphViewChange}
                      style={{ flexWrap: 'nowrap' }}
                    >
                      <FormControlLabel
                        value="hoursBilled"
                        control={<Radio />}
                        label="Timer"
                        style={{ flexGrow: 1 }}
                      />
                      <FormControlLabel
                        value="employees"
                        control={<Radio />}
                        label="Konsulenter"
                        style={{ flexGrow: 1 }}
                      />
                    </RadioGroup>
                  </div>
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
              <CustomerGraphFilter
                checkBox1={selectAll}
                checkBox2={showHistoricCustomer}
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
