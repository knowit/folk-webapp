import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from '@mui/material'

import { Minimize, Add } from '@mui/icons-material'
import React, { useState } from 'react'
import { EmployeeForCustomerList } from '../../../api/data/customer/customerApiTypes'
import DataTable from '../../../components/table/DataTable'
import { Column } from '../../../components/table/tableTypes'
import { Link } from 'react-router-dom'
import { OpenIneNewIcon } from '../../../assets/Icons'

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
        margin: 0,
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
              margin: 0,
              display: 'grid',
              flexDirection: 'row',
              width: '85%',
              gridTemplateColumns: '1fr 1fr',
            }}
          >
            <div>
              {customerName}
              {customerName != 'Uten prosjekt' && (
                <Link to={'/kunder/' + customerName}>
                  <OpenIneNewIcon />
                </Link>
              )}
            </div>
            <div style={{ marginLeft: 15 }}>
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
