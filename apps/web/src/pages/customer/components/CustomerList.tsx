import * as React from 'react'
import { useState } from 'react'
import { Box } from '@mui/material'
import { BaseSkeleton } from '../../../components/skeletons/BaseSkeleton'
import { GridItem } from '../../../components/gridItem/GridItem'
import {
  CenteredHeaderCell,
  ConsultantCell,
  CvCell,
  SortableHeaderCell,
} from '../../../components/table/DataCells'
import { useEmployeesByCustomer } from '../../../api/data/customer/customerQueries'
import CustomerAccordion from './CustomerAccordion'
import { Column } from '../../../components/table/tableTypes'
import { CustomerFilter } from './CustomerFilter'
import { getSearchableColumns } from '../../../components/table/DDTable'
import { searchEmployeesByCustomer } from '../util/search-employees-by-customer'
import { RowCount } from '../../../components/table/RowCount'
import { ConsultantInfo } from '../../../api/data/employee/employeeApiTypes'
import { EmployeeTableExpandedInfo } from '../../employee/table/EmployeeTableExpandedInfo'
import { FallbackMessage } from '../../employee/components/FallbackMessage'
import { tableStyles } from '../../../components/table/DataTable'
import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { styled } from '@mui/material/styles'

const AccordionHeaderListWrapper = styled('div')(({ theme }) => ({
  width: '100%',
  background: theme.palette.background.default,
  paddingLeft: 45,
  paddingRight: 69,
  backgroundColor: theme.palette.background.darker,
}))
const AccordionListHeader = styled('div')({
  justifyContent: 'space-between',
  cursor: 'pointer',
})

const customerColumns: Column[] = [
  {
    title: 'Konsulent',
    width: 385,
    isExpandable: true,
    getValue: (consultant: ConsultantInfo) => {
      return consultant.name
    },
    renderCell: ConsultantCell,
    renderExpanded: EmployeeTableExpandedInfo,
    headerCell: SortableHeaderCell,
  },
  { title: 'Tittel', width: 222 },
  {
    title: 'Kunde',
    width: 480,
    getValue: (customerProject: string) => {
      return customerProject
    },
    headerCell: SortableHeaderCell,
  },
  {
    title: 'CV',
    width: 53,
    renderCell: CvCell,
    headerCell: CenteredHeaderCell,
  },
]

export default function CustomerList() {
  const [searchTerm, setSearchTerm] = useState('')
  const { data, error } = useEmployeesByCustomer()
  const isLoading = !data
  const classes = tableStyles()
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
            columns={customerColumns}
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
        getSearchableColumns(customerColumns),
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
            gridTemplateColumns: '1fr 1fr',
            flex: '1',
            width: '85%',
          }}
        >
          <AccordionListHeader
            className={classes.tableHead}
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
            className={classes.tableHead}
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
        </Box>
      </AccordionHeaderListWrapper>
      {getCustomerAccordions()}
    </Box>
  )
}
