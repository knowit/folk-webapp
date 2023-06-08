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
  FormControlLabel,
  FormControl,
  Checkbox,
  ButtonGroup,
  Button,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { GridItemContent } from '../../../components/gridItem/GridItemContent'
import { BaseSkeleton } from '../../../components/skeletons/BaseSkeleton'
import { motion, LayoutGroup } from 'framer-motion'
import { DateRangePickerButton } from '../../../components/dateranges/DateRangePickerButton'
import CustomerGraphFilter from '../components/CustomerGraphFilter'
import { useMatomo } from '@jonkoops/matomo-tracker-react'
import {
  usePerWeekFilter,
  useEmployeeGraphData,
} from '../../../components/charts/chartFilters/usePerWeekFilter'
import { useState } from 'react'

const GridContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'customerFiltered',
})<{ customerFiltered?: boolean }>(({ customerFiltered }) => ({
  display: 'grid',
  gridTemplateColumns: customerFiltered ? '3fr' : '3fr 1fr',
  gridGap: '1rem',
}))

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

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ active, theme }) => ({
  backgroundColor: 'transparent',
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.text.primary}`,
  borderRadius: 50,
  whiteSpace: 'nowrap',
  padding: '8px 12px',
  height: '2rem',
  textTransform: 'inherit',
  '&:hover': {
    backgroundColor: theme.palette.background.default,
  },
  background: active
    ? theme.palette.background.paper
    : theme.palette.background.darker,
}))

const StyledButtonGroup = styled(ButtonGroup)(() => ({
  margin: '5px',
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
    useEmployeeGraphData(employeeData)
  const [graphView, setGraphView] = useState('Timer')
  const { trackEvent } = useMatomo()
  const graphViewOptions = ['Timer', 'Konsulenter']

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
    trackEvent({ category: 'filter-dato', action: 'click-event' })
    handleDateRangeChange(startDate, endDate)
  }

  const handleGraphViewChange = (value: string) => {
    setGraphView(value)
  }

  const chartData =
    graphView === 'Timer'
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
      ) : (
        <GridContainer customerFiltered={customerSpecificGraph}>
          <ChartCard
            title={
              graphView == 'Timer'
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
                <Box display="inline-flex" flexWrap="nowrap" width="100%">
                  <StyledButtonGroup aria-label="Grupper etter">
                    {filterOptions.map((option) => (
                      <StyledButton
                        key={option}
                        value={option}
                        variant="contained"
                        active={selectedFilter == option}
                        onClick={() => {
                          trackEvent({
                            category: customerSpecificGraph
                              ? `fakturert-kunde-${option.toLowerCase()}`
                              : `fakturert-${option.toLowerCase()}`,
                            action: 'click-event',
                          })
                          setSelectedFilter(option)
                        }}
                      >
                        {option}
                      </StyledButton>
                    ))}
                  </StyledButtonGroup>
                  <StyledButtonGroup aria-label="Visning">
                    {graphViewOptions.map((option) => (
                      <StyledButton
                        key={option}
                        value={option}
                        variant="contained"
                        active={graphView == option}
                        onClick={() => {
                          trackEvent({
                            category: customerSpecificGraph
                              ? `fakturert-kunde-${option.toLowerCase()}`
                              : `fakturert-${option.toLowerCase()}`,
                            action: 'click-event',
                          })
                          handleGraphViewChange(option)
                        }}
                      >
                        {option}
                      </StyledButton>
                    ))}
                  </StyledButtonGroup>
                  <StyledButtonGroup>
                    <DateRangePickerButton
                      startDate={startDate}
                      endDate={endDate}
                      onComplete={(startDate, endDate) =>
                        setDateRange(startDate, endDate)
                      }
                    ></DateRangePickerButton>
                  </StyledButtonGroup>
                </Box>
              </FormControl>
            }
          />
          {customerSpecificGraph ? null : (
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
                                checked={selectedCustomerIds?.includes(
                                  customer
                                )}
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
          )}
        </GridContainer>
      )}
    </GridItem>
  )
}

export default HoursBilledPerWeekCard
