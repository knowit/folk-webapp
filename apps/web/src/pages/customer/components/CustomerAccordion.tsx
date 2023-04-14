import {
  makeStyles,
  createStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from '@material-ui/core'
import { Minimize, Add, OpenInNew } from '@material-ui/icons'
import React, { useState } from 'react'
import { EmployeeForCustomerList } from '../../../api/data/customer/customerApiTypes'
import DataTable from '../../../components/table/DataTable'
import { Column, ColumnSort } from '../../../components/table/tableTypes'
import { SortColumnInTable } from '../../../components/table/util/sort-column-in-table'

const useStyles = makeStyles(() =>
  createStyles({
    accordionSummary: {
      width: '100%',
      backgroundColor: '#E4E1DB',
      fontSize: '18px',
    },
    accordionDetails: {
      padding: '0px',
    },
  })
)

interface CustomerDropdownProps {
  customerName: string
  employees: EmployeeForCustomerList[]
  expand?: boolean
  columns: Column[]
}

export function CustomerAccordion({
  customerName,
  employees,
  expand = false,
  columns,
}: CustomerDropdownProps) {
  const [expanded, setExpanded] = useState(expand)
  const classes = useStyles()

  const [columnSort, setColumnSort] = useState<ColumnSort>({
    columnIndex: 0,
    sortOrder: 'NONE',
  })

  const sortedRows = SortColumnInTable(employees, columnSort)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'max-content',
        width: '100%',
        flex: '1',
      }}
    >
      <Accordion
        style={{ marginTop: '5px', width: '100%' }}
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}
        square={true}
      >
        <AccordionSummary
          className={classes.accordionSummary}
          expandIcon={expanded ? <Minimize /> : <Add />}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '65%',
            }}
          >
            <div>
              {customerName}
              <OpenInNew
                className={'openNewIconAccordion'}
                style={{ marginLeft: '15px' }}
                onClick={(e) => {
                  e.stopPropagation() /* todo show kundeflik */
                }}
              />
            </div>
            <div>Antall konsulenter: {employees.length}</div>
          </Box>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          <DataTable
            setColumnSort={setColumnSort}
            currentColumnSort={columnSort}
            columns={columns}
            rows={sortedRows}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}
