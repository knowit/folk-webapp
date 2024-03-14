import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Paper,
} from '@mui/material'

import { Minimize, Add } from '@mui/icons-material'
import React, { useState } from 'react'
import { EmployeeForCustomerList } from '../../../api/data/customer/customerApiTypes'
import { Link } from 'react-router-dom'
import { OpenInNewIcon } from '../../../assets/Icons'
import { styled } from '@mui/material/styles'
import { EmployeeTableForCustomer } from '../../employee/table/SortableEmployeeTable'
import { useCustomerCards } from '../../../api/data/customer/customerQueries'

interface CustomerDropdownProps {
  customerName: string
  employees: EmployeeForCustomerList[]
  expand?: boolean
}

const CustomerColumn = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}))

const CustomerAccordion = ({
  customerName,
  employees,
  expand = false,
}: CustomerDropdownProps) => {
  const customerCards = useCustomerCards()
  const [expanded, setExpanded] = useState(expand)
  const accountManager = customerCards.find(
    (cc) => cc.customer === customerName
  )?.accountManager

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
              width: '100%',
              gridTemplateColumns: '2fr 1fr 1fr',
            }}
          >
            <CustomerColumn>
              {customerName}
              {customerName != 'Uten prosjekt' && (
                <Link
                  to={`/kunder/${customerName}`}
                  target={`customer_${customerName}`}
                >
                  <OpenInNewIcon />
                </Link>
              )}
            </CustomerColumn>
            <div style={{ marginLeft: 15 }}>
              Antall konsulenter: {employees.length}
            </div>
            <div style={{ marginLeft: 15 }}>{accountManager || 'Ukjent'}</div>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Paper
            elevation={0}
            style={{
              height: '100%',
              width: '100%',
            }}
            sx={{ backgroundColor: 'background.default' }}
          >
            <EmployeeTableForCustomer data={employees} />
          </Paper>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default React.memo(CustomerAccordion)
