import { useEffect, useState } from 'react'
import { GridItemHeader } from '../../../components/gridItem/GridItemHeader'
import SearchInput from '../../../components/SearchInput'
import SortButton from '../cards/SortButton'
import { Grid, styled } from '@mui/material'
import CustomerCard, { CustomerData } from '../cards/CustomerCard'
import { makeStyles } from '@mui/styles'
import { SortCustomerCards } from '../util/sort-customer-cards'

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

const useStyles = makeStyles({
  root: {
    borderRadius: '0px 0px 6px 6px',
    overflow: 'hidden',
    height: '100%',
  },
  title: {
    height: 10,
  },
})

const CustomerCardSort = ({
  data,
  handleCheckboxChange,
  selectedCustomerIds,
}: Props) => {
  const classes = useStyles()
  const [searchTerm, setSearchTerm] = useState('')
  const [activeSortButton, setActiveSortBotton] = useState('Alfabetisk')
  const [sortOrder, setSortOrder] = useState('ASC')
  const [sortedData, setSortedData] = useState<CustomerData[]>([])

  const buttons = ['Alfabetisk', 'Antall konsulenter', 'Antall timer']

  const changeSortType = (type: string) => {
    if (type === activeSortButton && activeSortButton === 'Alfabetisk') {
      sortOrder === 'ASC' ? setSortOrder('DESC') : setSortOrder('ASC')
    } else {
      setSortOrder('ASC')
    }
    setActiveSortBotton(type)
    setSortedData(SortCustomerCards(data, type, sortOrder))
  }

  useEffect(() => {
    const filtredRows = data.filter((term) => {
      return term.customer.toLowerCase().includes(searchTerm)
    })
    setSortedData(filtredRows)
  }, [searchTerm, data])

  useEffect(() => {
    setSortedData(SortCustomerCards(data, 'Alfabetisk', 'ASC'))
  }, [data])

  return (
    <>
      <Grid item xs={12}>
        <div className={classes.root}>
          <h2>Øvrige kunder</h2>
          <GridItemHeader title="Sortering: ">
            <ButtonWrapper>
              {buttons.map((title) => (
                <SortButton
                  key={title}
                  title={title}
                  order={title === 'Alfabetisk' && sortOrder}
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
        </div>
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
