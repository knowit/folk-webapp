import * as React from 'react'
import { useState } from 'react'
import { Box } from '@mui/material'
import { BaseSkeleton } from '../../../components/skeletons/BaseSkeleton'
import { GridItem } from '../../../components/gridItem/GridItem'
import { useEmployeesByCustomer } from '../../../api/data/customer/customerQueries'
import CustomerAccordion from './CustomerAccordion'
import { CustomerFilter } from './CustomerFilter'
import { searchEmployeesByCustomer } from '../util/search-employees-by-customer'
import { RowCount } from '../../../components/sortableTable/RowCount'
import { FallbackMessage } from '../../employee/components/FallbackMessage'
import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import { getEmployeeForCustomerSearchableColumns } from '../../employee/table/SortableEmployeeTable'

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
export default function CustomerList() {
  const [searchTerm, setSearchTerm] = useState('')
  const { data, error } = useEmployeesByCustomer()
  const isLoading = !data
  const [sortIndex, setSortIndex] = React.useState(0)
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
      if (sortIndex === 1) {
        return sortOrder === 'ASC'
          ? a.employees.length - b.employees.length
          : b.employees.length - a.employees.length
      } else if (sortIndex === 0) {
        const nameA = a.customer_name.toUpperCase()
        const nameB = b.customer_name.toUpperCase()
        if (nameA < nameB) {
          return sortOrder === 'ASC' ? -1 : 1
        }
        if (nameA > nameB) {
          return sortOrder === 'ASC' ? 1 : -1
        }
        return 0
      }
    })

    return sortedData.map((customer) => customer.accordion)
  }

  const sortIcon = (columnIndex, sortIndex, currentOrder) => {
    if (columnIndex !== sortIndex) return null
    switch (currentOrder) {
      case 'DESC':
        return <ArrowUpward />
      case 'ASC':
        return <ArrowDownward />
      default:
        return null
    }
  }
  const switchSort = (columnIndex) => {
    if (sortIndex === columnIndex) {
      setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC')
    } else {
      setSortIndex(columnIndex)
      setSortOrder(columnIndex === 0 ? 'ASC' : 'DESC')
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
            onClick={() => switchSort(0)}
          >
            <span>Kunde</span>
            {sortIcon(0, sortIndex, sortOrder)}
          </AccordionListHeader>
          <AccordionListHeader
            style={{
              padding: '10px 0',
              fontSize: '18px',
              paddingLeft: '15px',
            }}
            onClick={() => switchSort(1)}
          >
            <span>Antall konsulenter</span>
            {sortIcon(1, sortIndex, sortOrder)}
          </AccordionListHeader>
          <AccordionListHeader
            style={{
              padding: '10px 0',
              fontSize: '18px',
              paddingLeft: '15px',
            }}
          >
            <span>Kundeansvarlig</span>
          </AccordionListHeader>
        </Box>
      </AccordionHeaderListWrapper>
      {getCustomerAccordions()}
    </Box>
  )
}
