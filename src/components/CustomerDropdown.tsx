import React, { useEffect, useState } from 'react'
import { GridItem } from './GridItem'
import { Add, Minimize, OpenInNew } from '@material-ui/icons'
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { SimpleDDItem } from '../data/SimpleDDItem'
import {
  ConsultantCell,
  CustomerStatusCell, CvCell,
} from '../data/components/table/DataCells'
import EmployeeInfo from './EmployeeInfo'
import CustomerTable from './CustomerTable'
import CenteredHeaderCell from '../data/components/table/cells/CenteredHeaderCell'


const useStyles = makeStyles(() =>
  createStyles({
    accordionSummary: {
      width: '100%',
      backgroundColor: '#E4E1DB',
      fontSize: '18px'
    }
  })
);

interface CustomerDropdownProps {
  customerName: string;
  employees: { [key: string]: any };
  expand?: boolean;
  callback(columns: any[]): void;
}


export default function CustomerDropdown({customerName, employees, expand, callback}: CustomerDropdownProps) {
  const [expanded, setExpanded] = useState(false)
  const classes = useStyles();

  useEffect(() => {
    setExpanded(!!expand)
  }, [expand])

  return (
      <GridItem fullSize={true}> { /* todo styling i egen class? */}
        <Accordion
          style={{paddingTop: '5px', width: '100%'}}
          expanded={expanded}
          onChange={() => setExpanded(!expanded)}
          square={true}>
          <AccordionSummary
            className={classes.accordionSummary}
            expandIcon={expanded ? <Minimize /> : <Add />}>
            {customerName}
            <OpenInNew
              className={'openNewIconAccordion'}
              style={{marginLeft: '15px'}}
              onClick={e => {e.stopPropagation(); /* todo Route til kundeflik */}}/>
          </AccordionSummary>
          <AccordionDetails>
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
                    getSearchValue: (consultant: { value: string }) => {
                      return consultant.value;
                    },
                    renderCell: ConsultantCell,
                    renderExpanded: EmployeeInfo,
                  },
                  { title: 'Tittel' },
                  {
                    title: 'Kunde',
                    renderCell: CustomerStatusCell,
                  },
                  {
                    title: 'CV',
                    renderCell: CvCell,
                    headerRenderCell: CenteredHeaderCell
                  },
                ],
              }}
            />
          </AccordionDetails>
        </Accordion>
      </GridItem>
  )

}
