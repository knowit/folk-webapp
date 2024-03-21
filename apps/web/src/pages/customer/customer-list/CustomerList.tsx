import * as React from 'react'
import { useState } from 'react'
import { Box } from '@mui/material'
import { BaseSkeleton } from '../../../components/skeletons/BaseSkeleton'
import { GridItem } from '../../../components/gridItem/GridItem'
import {
  useCustomerCards,
  useEmployeesByCustomer,
} from '../../../api/data/customer/customerQueries'
import CustomerAccordion from './CustomerAccordion'
import { CustomerFilter } from './CustomerFilter'
import { searchEmployeesByCustomer } from '../util/search-employees-by-customer'
import { RowCount } from '../../../components/sortableTable/RowCount'
import { FallbackMessage } from '../../employee/components/FallbackMessage'
import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import { getEmployeeForCustomerSearchableColumns } from '../../employee/table/SortableEmployeeTable'

enum ColumnName {
  KUNDE = 'KUNDE',
  KONSULENTER = 'KONSULENTER',
  KUNDEANSVARLIG = 'KUNDEANSVARLIG',
}

export default function CustomerList() {
  const customerCards = useCustomerCards()
  const [searchTerm, setSearchTerm] = useState('')
  const { data, error } = useEmployeesByCustomer()
  const isLoading = !data
  const [sortColumn, setSortColumn] = useState(ColumnName.KUNDE)
  const [sortOrder, setSortOrder] = React.useState<'ASC' | 'DESC'>('ASC')

  const memoizedData = React.useMemo(() => {
    if (!data) return []
    return data.map((customer) => {
      return {
        ...customer,
        accordion: (
          <CustomerAccordion
            key={customer.customer_name}
            customerName={customer.customer_name}
            employees={customer.employees}
          />
        ),
      }
    })
  }, [data])

  if (error) {
    return <FallbackMessage error={error} />
  }

  const filteredData = memoizedData
    ? searchEmployeesByCustomer(
        memoizedData,
        getEmployeeForCustomerSearchableColumns(),
        searchTerm
      )
    : []

  const getCustomerAccordions = () => {
    if (isLoading) {
      return <BaseSkeleton variant="rectangular" height={500} width={'100%'} />
    }

    if (filteredData.length === 0) {
      return (
        <GridItem fullSize>
          <div style={{ padding: '5px' }}>Ingen treff.</div>
        </GridItem>
      )
    }

    const sortedData = filteredData.sort((a, b) => {
      const accountManagerA =
        customerCards.find((cc) => cc.customer === a.customer_name)
          ?.accountManager || 'å'
      const accountManagerB =
        customerCards.find((cc) => cc.customer === b.customer_name)
          ?.accountManager || 'å'
      switch (sortColumn) {
        case ColumnName.KUNDE:
          return a.customer_name.localeCompare(b.customer_name, 'no', {
            ignorePunctuation: true,
          })
        case ColumnName.KUNDEANSVARLIG:
          return accountManagerA.localeCompare(accountManagerB, 'no', {
            ignorePunctuation: true,
          })
        case ColumnName.KONSULENTER:
          return a.employees.length - b.employees.length
      }
    })
    if (sortOrder === 'DESC') {
      sortedData.reverse()
    }

    return sortedData.map((customer) => customer.accordion)
  }

  const sortIcon = (columnName, currentOrder) => {
    if (sortColumn !== columnName) return null
    switch (currentOrder) {
      case 'DESC':
        return <ArrowUpward />
      case 'ASC':
        return <ArrowDownward />
      default:
        return null
    }
  }
  const switchSort = (columnName: ColumnName) => {
    if (sortColumn === columnName) {
      setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC')
    } else {
      setSortColumn(columnName)
      switch (columnName) {
        case ColumnName.KUNDE:
        case ColumnName.KUNDEANSVARLIG:
          return setSortOrder('ASC')
        default:
          return setSortOrder('DESC')
      }
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CustomerFilter currentSearchTerm={searchTerm} onSearch={setSearchTerm} />
      <RowCount>
        Viser {filteredData?.length || 0} av {data?.length || 0} kunder
      </RowCount>
      <AccordionHeaderListWrapper>
        <Box
          sx={{
            display: 'grid',
            flexDirection: 'row',
            gridTemplateColumns: '2fr 1fr 1fr',
            flex: '1',
            width: '100%',
          }}
        >
          <AccordionListHeader
            style={{
              padding: '10px 0',
              fontSize: '18px',
              borderLeft: '0px solid white',
              paddingTop: '14px',
              paddingBottom: '14px',
            }}
            onClick={() => switchSort(ColumnName.KUNDE)}
          >
            <span>Kunde</span>
            {sortIcon(ColumnName.KUNDE, sortOrder)}
          </AccordionListHeader>
          <AccordionListHeader
            style={{
              padding: '10px 0',
              fontSize: '18px',
              paddingLeft: '15px',
            }}
            onClick={() => switchSort(ColumnName.KONSULENTER)}
          >
            <span>Antall konsulenter</span>
            {sortIcon(ColumnName.KONSULENTER, sortOrder)}
          </AccordionListHeader>
          <AccordionListHeader
            style={{
              padding: '10px 0',
              fontSize: '18px',
              paddingLeft: '15px',
            }}
            onClick={() => switchSort(ColumnName.KUNDEANSVARLIG)}
          >
            <span>Kundeansvarlig</span>
            {sortIcon(ColumnName.KUNDEANSVARLIG, sortOrder)}
          </AccordionListHeader>
        </Box>
      </AccordionHeaderListWrapper>
      {getCustomerAccordions()}
    </Box>
  )
}

const AccordionHeaderListWrapper = styled('div')(({ theme }) => ({
  width: '100%',
  background: theme.palette.background.default,
  paddingLeft: 45,
  paddingRight: 69,
  backgroundColor: theme.palette.background.darker,
}))
const AccordionListHeader = styled('div')(({ theme }) => ({
  justifyContent: 'space-between',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: 16,
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  borderBottom: `1px solid ${theme.palette.background.paper}`,
  borderLeft: `1px solid ${theme.palette.background.paper}`,
  padding: 0,
  paddingRight: 15,
  paddingLeft: 15,
}))
