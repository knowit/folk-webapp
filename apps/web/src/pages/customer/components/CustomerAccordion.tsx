import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from '@mui/material'
import { Minimize, Add, OpenInNew } from '@mui/icons-material'
import React, { useState } from 'react'
import { EmployeeForCustomerList } from '../../../api/data/customer/customerApiTypes'
import DataTable from '../../../components/table/DataTable'
import { Column } from '../../../components/table/tableTypes'

interface CustomerDropdownProps {
  customerName: string
  employees: EmployeeForCustomerList[]
  expand?: boolean
  columns: Column[]
}

const CustomerAccordion = ({
  customerName,
  employees,
  expand = false,
  columns,
}: CustomerDropdownProps) => {
  const [expanded, setExpanded] = useState(expand)

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
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}
        square={true}
      >
        <AccordionSummary expandIcon={expanded ? <Minimize /> : <Add />}>
          <Box
            sx={{
              display: 'grid',
              flexDirection: 'row',
              width: '85%',
              gridTemplateColumns: '1fr 1fr',
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
            <div style={{ marginLeft: '15px' }}>
              Antall konsulenter: {employees.length}
            </div>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <DataTable columns={columns} rows={employees} />
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default React.memo(CustomerAccordion)
