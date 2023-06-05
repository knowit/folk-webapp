import { useEffect, useState } from 'react'
import { GridItemHeader } from '../../../components/gridItem/GridItemHeader'
import SearchInput from '../../../components/SearchInput'
import SortButton from '../cards/SortButton'
import { Grid, styled } from '@mui/material'
import CustomerCard, { CustomerData } from '../cards/CustomerCard'
import { SortCustomerCards } from '../util/sort-customer-cards'
import { useMatomo } from '@jonkoops/matomo-tracker-react'

interface Props {
  data: CustomerData[]
  handleCheckboxChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    customerId: string
  ) => void
  selectedCustomerIds: string[]
}

const ButtonWrapper = styled('div')({
  display: 'flex',
  paddingRight: '260px;',
})

const CustomerCardSort = ({
  data,
  handleCheckboxChange,
  selectedCustomerIds,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeSortButton, setActiveSortBotton] = useState('Alfabetisk')
  const [sortOrder, setSortOrder] = useState('ASC')
  const [sortedData, setSortedData] = useState<CustomerData[]>([])
  const { trackEvent } = useMatomo()

  const buttons = ['Alfabetisk', 'Antall konsulenter', 'Antall timer']
  const showHeader =
    selectedCustomerIds !== null && selectedCustomerIds.length > 0

  const changeSortType = (type: string) => {
    trackEvent({
      category: `sortering-kunder-${type.replace(/\s/g, '').toLowerCase()}`,
      action: 'click-event',
    })
    const order =
      type === activeSortButton && activeSortButton === 'Alfabetisk'
        ? sortOrder === 'ASC'
          ? 'DESC'
          : 'ASC'
        : 'ASC'

    setSortOrder(order)
    setActiveSortBotton(type)
    setSortedData(SortCustomerCards(data, type, order))
  }

  useEffect(() => {
    const filtredRows = data.filter((term) => {
      return term.customer.toLowerCase().includes(searchTerm)
    })
    setSortedData(filtredRows)
  }, [searchTerm, data])

  useEffect(() => {
    setSortedData(SortCustomerCards(data, activeSortButton, sortOrder))
  }, [data, activeSortButton, sortOrder])

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
        />
      ))}
    </>
  )
}

export default CustomerCardSort
