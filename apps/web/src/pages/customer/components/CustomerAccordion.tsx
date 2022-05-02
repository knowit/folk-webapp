import {
  makeStyles,
  createStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core'
import { Minimize, Add, OpenInNew } from '@material-ui/icons'
import React, { useState } from 'react'
import { EmployeeForCustomerList } from '../../../api/data/customer/customerApiTypes'
import { GridItem } from '../../../components/gridItem/GridItem'
import DataTable from '../../../components/table/DataTable'
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
    content: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '65%',
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
          <div className={classes.content}>
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
          </div>
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
