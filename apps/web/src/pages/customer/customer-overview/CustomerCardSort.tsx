import { useMemo, useState } from 'react'
import { GridItemHeader } from '../../../components/gridItem/GridItemHeader'
import SearchInput from '../../../components/SearchInput'
import SortButton from '../cards/SortButton'
import { Grid, styled } from '@mui/material'
import CustomerCard from '../cards/CustomerCard'
import { SortCustomerCards } from '../util/sort-customer-cards'
import { useMatomo } from '@jonkoops/matomo-tracker-react'
import { CustomerCardData } from '../../../api/data/customer/customerApiTypes'
import { ChartPeriod } from '../../../components/charts/chartFilters/useChartData'

interface Props {
  data: CustomerCardData[]
  handleCheckboxChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    customerId: string
  ) => void
  selectedCustomerIds: string[]
  selectedChartPeriod: ChartPeriod
}

const ButtonWrapper = styled('div')({
  display: 'flex',
  paddingRight: '260px;',
})

const CustomerCardSort = ({
  data,
  handleCheckboxChange,
  selectedCustomerIds,
  selectedChartPeriod,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeSortButton, setActiveSortBotton] = useState('Alfabetisk')
  const [sortOrder, setSortOrder] = useState('ASC')
  const { trackEvent } = useMatomo()
  const filtredRows = data.filter((term) => {
    return term.customer.toLowerCase().includes(searchTerm.toLowerCase())
  })
  const sortedData = useMemo(
    () =>
      SortCustomerCards(
        filtredRows,
        activeSortButton,
        sortOrder,
        selectedChartPeriod
      ),
    [filtredRows, activeSortButton, sortOrder, selectedChartPeriod]
  )

  const buttons = ['Alfabetisk', 'Antall konsulenter', 'Antall timer']
  const showHeader =
    selectedCustomerIds !== null && selectedCustomerIds.length > 0

  const changeSortType = (type: string) => {
    trackEvent({
      category: `sortering-kunder-${type.replace(/\s/g, '').toLowerCase()}`,
      action: 'click-event',
    })
    if (activeSortButton === type) {
      const newOrder = sortOrder == 'ASC' ? 'DESC' : 'ASC'
      setSortOrder(newOrder)
    } else {
      const order = type === 'Alfabetisk' ? 'ASC' : 'DESC'

      setSortOrder(order)
      setActiveSortBotton(type)
    }
  }

  return (
    <>
      <Grid item xs={12}>
        {showHeader && <h2>Øvrige kunder</h2>}
        <GridItemHeader title="Sortering:">
          <ButtonWrapper>
            {buttons.map((title) => (
              <SortButton
                key={title}
                title={title}
                order={sortOrder}
                active={title === activeSortButton}
                onClick={changeSortType}
              />
            ))}
          </ButtonWrapper>

          <SearchInput
            placeholder={'Søk i kunder'}
            onSearch={(searchTerm) => {
              setSearchTerm(searchTerm)
            }}
            onClear={() => setSearchTerm('')}
          />
        </GridItemHeader>
      </Grid>

      {sortedData.map((customer) => (
        <CustomerCard
          key={customer.customer}
          data={customer}
          handleCheckboxChange={handleCheckboxChange}
          selectedCustomerIds={selectedCustomerIds}
          selectedChartPeriod={selectedChartPeriod}
        />
      ))}
    </>
  )
}

export default CustomerCardSort
