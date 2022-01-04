import {
  makeStyles,
  createStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core'
import { Minimize, Add, OpenInNew } from '@material-ui/icons'
import React, { useState } from 'react'
import EmployeeInfo from '../../components/EmployeeInfo'
import { GridItem } from '../../components/GridItem'
import {
  ConsultantCell,
  CustomerStatusCell,
  CvCell,
  CenteredHeaderCell,
} from '../../data/components/table/DataCells'
import { SimpleDDItem } from '../../data/SimpleDDItem'
import CustomerTable from './CustomerTable'
import { CustomerStatusData } from '../../data/components/table/cells/CustomerStatusCell'

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
  employees: { [key: string]: any }
  expand?: boolean
  callback(columns: any[]): void
}

export default function CustomerDropdown({
  customerName,
  employees,
  expand = false,
  callback,
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
          <SimpleDDItem
            fullSize
            callback={callback}
            payload={employees}
            Component={CustomerTable}
            dataComponentProps={{
              columns: [
                {
                  title: 'Konsulent',
                  searchable: true,
                  expandable: true,
                  getSearchValue: (consultant: { value: string }) => {
                    return consultant.value
                  },
                  renderCell: ConsultantCell,
                  renderExpanded: EmployeeInfo,
                },
                { title: 'Tittel' },
                {
                  title: 'Kunde',
                  renderCell: CustomerStatusCell,
                  searchable: true,
                  getSearchValue: (customer: CustomerStatusData) => {
                    return `${customer.customer} ${customer.workOrderDescription}`
                  },
                },
                {
                  title: 'CV',
                  renderCell: CvCell,
                  headerRenderCell: CenteredHeaderCell,
                },
              ],
            }}
          />
        </AccordionDetails>
      </Accordion>
    </GridItem>
  )
}
