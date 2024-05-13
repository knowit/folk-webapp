import {
  useCustomerCards,
  useHoursBilledPerWeekCharts,
} from '../../../api/data/customer/customerQueries'
import { GridItem } from '../../../components/gridItem/GridItem'
import { GridItemHeader } from '../../../components/gridItem/GridItemHeader'
import { styled } from '@mui/material/styles'
import { ChartPeriod } from '../../../components/charts/chartFilters/useChartData'
import { BaseSkeleton } from '../../../components/skeletons/BaseSkeleton'
import CustomerGraphFilter from './CustomerGraphFilter'
import HoursBilledPerWeekChart from '../cards/HoursBilledPerWeekChart'
import CustomerOverviewFilter, { SortMethod } from './CustomerOverviewFilter'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { Dispatch, SetStateAction, useState } from 'react'
import { Translation } from '../../../utils/translation'
import useChartData from '../../../components/charts/chartFilters/useChartData'
import { useMatomo } from '@jonkoops/matomo-tracker-react'

interface HoursBilledPerWeekCardProps {
  selectedCustomerIds: string[]
  setSelectedCustomerIds: (ids: string[]) => void
  handleCheckboxChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    customerId: string
  ) => void
  showCustomerHistory: boolean
  setShowCustomerHistory: (v: boolean) => void
  selectedChartPeriod: ChartPeriod
  setSelectedChartPeriod: Dispatch<SetStateAction<ChartPeriod>>
}

const CustomerHoursPerWeekSection = ({
  selectedCustomerIds,
  setSelectedCustomerIds,
  handleCheckboxChange,
  showCustomerHistory,
  setShowCustomerHistory,
  selectedChartPeriod,
  setSelectedChartPeriod,
}: HoursBilledPerWeekCardProps) => {
  const { trackEvent } = useMatomo()
  const [selectedSortMethod, setSelectedSortMethod] = useState(SortMethod.abc)
  const customersWithConsultants = useCustomerCards()
    .filter((cc) => cc.consultantsLastPeriod > 0)
    .map((customerCard) => customerCard.customer)
  const { data } = useHoursBilledPerWeekCharts()
  const chartData = useChartData(data, selectedChartPeriod)

  const customerIdsUnfiltered =
    data === undefined ? [] : data?.data?.map((item) => item.id as string)

  const customers = customerIdsUnfiltered

  const selectedCustomers = customers.filter((customer) =>
    selectedCustomerIds?.includes(customer)
  )

  const handleSelectAll = () => {
    trackEvent({
      category: 'Filtering',
      action: `Filtered customers by using "Select All" checkbox`,
      name: 'Filter by selecting all',
    })

    setSelectedCustomerIds(customers.sort())
  }

  const handleSelectNone = () => {
    trackEvent({
      category: 'Filtering',
      action: `Filtered customers by using "Deselect all" checkbox`,
      name: 'Filter by deselecting all',
    })

    setSelectedCustomerIds([])
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

  function toggleSelectAll() {
    selectedCustomerIds?.length === customers.length
      ? handleSelectNone()
      : handleSelectAll()
  }

  function toggleShowHistoricCustomer() {
    trackEvent({
      category: 'Filtering',
      action: `Filtered customers by using "Historic customers" checkbox`,
      name: `Filter by ${
        !showCustomerHistory
          ? 'including historic customers'
          : 'removing historic customers'
      }`,
    })

    setShowCustomerHistory(!showCustomerHistory)

    if (selectAll.checked === true) {
      toggleSelectAll()
    }
  }

  const showHistoricCustomer = {
    label: 'Inkluder kunder uten aktive prosjekter i listen',
    changeHandler: toggleShowHistoricCustomer,
    checked: showCustomerHistory,
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
        <GridContainer>
          <HoursBilledPerWeekChart
            customersWithConsultants={customersWithConsultants}
            selectedCustomerIds={selectedCustomerIds}
            showCustomerHistory={showCustomerHistory}
            selectedChartPeriod={selectedChartPeriod}
            setSelectedChartPeriod={setSelectedChartPeriod}
          />
          <CustomerFilterWrapper>
            <GridItemHeader title="Filtrer kunder">
              <CustomerGraphFilter
                checkBox1={selectAll}
                checkBox2={showHistoricCustomer}
              />
            </GridItemHeader>
            <SortContainer>
              <RadioGroup
                style={{ flexWrap: 'nowrap' }}
                row
                value={selectedSortMethod}
              >
                {Object.keys(SortMethod).map((option: SortMethod) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio size={'small'} />}
                    label={Translation[`filter.${option}`]}
                    style={{ flexGrow: 1 }}
                    onChange={() => setSelectedSortMethod(option)}
                  />
                ))}
              </RadioGroup>
            </SortContainer>

            <CustomerOverviewFilter
              selectedCustomerIds={selectedCustomerIds}
              handleCheckboxChange={handleCheckboxChange}
              selectedSortMethod={selectedSortMethod}
              showCustomerHistory={showCustomerHistory}
              selectedChartPeriod={selectedChartPeriod}
            />
          </CustomerFilterWrapper>
        </GridContainer>
      )}
    </GridItem>
  )
}

export default CustomerHoursPerWeekSection

const GridContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: '5fr 2fr',
  gridGap: '1rem',
})

const CustomerFilterWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: 420,
  textAlign: 'right',
  background: theme.palette.background.default,
}))

const SortContainer = styled('div')(({ theme }) => ({
  padding: '0 15px',
  backgroundColor: theme.palette.background.darker,
}))
