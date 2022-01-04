import {
  makeStyles,
  createStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  withStyles,
} from '@material-ui/core'
import { Minimize, Add, Link as LinkIcon } from '@material-ui/icons'
import React, { useState } from 'react'
import EmployeeInfo from '../../components/EmployeeInfo'
import { GridItem } from '../../components/GridItem'
import {
  ConsultantCell,
  CustomerStatusCell,
  CvCell,
} from '../../data/components/table/DataCells'
import { SimpleDDItem } from '../../data/SimpleDDItem'
import CustomerTable from './CustomerTable'
import { CustomerStatusData } from '../../data/components/table/cells/CustomerStatusCell'
import { Link } from 'react-router-dom'

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
    openNewIcon: {
      color: '#707070',
      cursor: 'pointer',
      marginLeft: '15px',
      '&:hover': {
        color: '#333333',
      },
    },
  })
)

const LinkStyled = withStyles({
  root: {
    marginLeft: '10px',
    color: '#707070',
    cursor: 'pointer',
    '&:hover': {
      color: '#333333',
    },
  },
})(LinkIcon)

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
          {customerName != 'Uten prosjekt' && (
            <Link to={'/kunder/' + customerName}>
              <LinkStyled />
            </Link>
          )}
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
                  centeredHeader: true,
                  renderCell: CvCell,
                },
              ],
            }}
          />
        </AccordionDetails>
      </Accordion>
    </GridItem>
  )
}
