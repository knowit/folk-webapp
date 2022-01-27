import {
  makeStyles,
  createStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core'
import { Minimize, Add, OpenInNew } from '@material-ui/icons'
import React, { useState } from 'react'
import { EmployeeTableResponse } from '../../api/data/employee/employeeApiTypes'
import { GridItem } from '../../components/GridItem'

import DataTable from '../../data/components/table/DataTable'
import { Columns } from '../../data/types'

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
  employees: EmployeeTableResponse[]
  expand?: boolean
  columns: Columns[]
}

export default function CustomerDropdown({
  customerName,
  employees,
  expand = false,
  columns,
}: CustomerDropdownProps) {
  const [expanded, setExpanded] = useState(expand)
  const classes = useStyles()

  return (
    <GridItem fullSize>
      <Accordion
        style={{ paddingTop: '5px', width: '100%' }}
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}
        square={true}
      >
        <AccordionSummary
          className={classes.accordionSummary}
          expandIcon={expanded ? <Minimize /> : <Add />}
        >
          {customerName}
          <OpenInNew
            className={'openNewIconAccordion'}
            style={{ marginLeft: '15px' }}
            onClick={(e) => {
              e.stopPropagation() /* todo show kundeflik */
            }}
          />
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          <GridItem fullSize={true}>
            <DataTable rows={employees} columns={columns} />
          </GridItem>
        </AccordionDetails>
      </Accordion>
    </GridItem>
  )
}
