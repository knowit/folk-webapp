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
import { VirtualizedTable } from '../../../components/table/DataTable'
import { Column } from '../../../components/table/tableTypes'

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
          <VirtualizedTable rows={employees} columns={columns} />
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}
