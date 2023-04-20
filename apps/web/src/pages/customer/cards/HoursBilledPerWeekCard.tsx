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
import FlipMove from 'react-flip-move'

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
}

const HoursBilledPerWeekCard = ({
  selectedCustomerIds,
  setSelectedCustomerIds,
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
    selectedCustomerIds.includes(customer)
  )
  const unselectedCustomers = customers.filter(
    (customer) => !selectedCustomerIds.includes(customer)
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

  const chartData = selectedFilter === 'Uke' ? weeklyData : monthlyData
  const filteredData =
    data === undefined
      ? undefined
      : {
          ...data,
          data: chartData?.data?.filter((customer) => {
            return selectedCustomerIds.includes(customer.id as string)
          }),
        }

  return (
    <GridItem fullSize>
      {filteredData === undefined ? (
        <BaseSkeleton variant="rectangular" height={420}></BaseSkeleton>
      ) : (
        <GridContainer>
          <ChartCard
            title="Timer brukt per periode"
            description={POSSIBLE_OLD_DATA_WARNING}
            data={filteredData}
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
                </Box>
              </FormControl>
            }
          />
          <CustomerFilterWrapper>
            <GridItemHeader title="Filtrer kunder">
              <Checkbox
                checked={selectedCustomerIds.length === customers.length}
                onChange={
                  selectedCustomerIds.length === customers.length
                    ? handleSelectNone
                    : handleSelectAll
                }
                name="select-all"
              />
            </GridItemHeader>

            <ScrollableDiv>
              <GridItemContent>
                <CheckboxFlexWrapper>
                  <FlipMove typeName={null}>
                    {selectedCustomers.map((customer) => (
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
                    ))}
                    {unselectedCustomers.map((customer) => (
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
                    ))}
                  </FlipMove>
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
