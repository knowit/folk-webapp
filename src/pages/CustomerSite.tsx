import React, { useCallback, } from 'react';
import { Redirect, useHistory, useLocation, withRouter, useParams } from 'react-router-dom';
import { ArrowBack } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';
import { SimpleDDItem } from '../data/SimpleDDItem';
import CustomerTable from '../components/CustomerTable';
import { CenteredHeaderCell, ConsultantCell, CvCell } from '../data/components/table/DataCells';
import EmployeeInfo from '../components/EmployeeInfo';
import { Payload } from '../components/CustomerList';
import { useFetchedData } from '../hooks/service';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    paddingRight: '10px',
    paddingBottom: '20px',
    gap: '15px',
    lineHeight: '2em',
    textDecoration: 'underline',
    fontSize: '24px',
  },
  pointer: {
    cursor: 'pointer',
  },
  bold: {
    fontWeight: 'bold',
  },
  factBox: {
    marginTop: '15px',
    display: 'flex',
    flexDirection: 'column',
  }
});

type Project = {
  customer: string,
  email: string,
  guid: string,
  hours: number,
  manager: string,
  project_type: string,
  reg_period: number,
  timestamp: number,
  work_order: string,
  work_order_description: string
}

export default function CustomerSite() {
  const history = useHistory()
  const customerName = history.location.pathname.split("/")[2]
  const routeOnClick = useCallback(() => history.push("/kunder"), [history]);
  const classes = useStyles()
  const payload = history.location.state as Payload

  console.log(history)
  const lolc = useLocation()
  console.log(lolc)

  const [projects, projectsPending] = useFetchedData<Payload>({
    url: '/api/data/projectsOverview',
  });

  const [ubw, ubwPending] = useFetchedData<Payload>({
    url: '/api/data/ubwEmployee',
  });

  if (!projectsPending && !ubwPending) {
    console.log(projects)
    console.log(ubw)
  }

  console.log(payload)

  function groupByProject(payload: Payload) {
    return payload.reduce(
      (
        groups: { [x: string]: any },
        projectOverview: Project
      ) => {
          const key = projectOverview.work_order
          if (!groups[key]) {
            groups[key] = []
          }

          groups[key].push(projectOverview)
        return groups
      }, {})
  }

  const grouped = groupByProject(payload)
  console.log(grouped)

  return (
    <div>
      <div className={classes.header}>
        <ArrowBack
          className={classes.pointer}
          onClick={() => routeOnClick()}
        />
        <h1>{customerName}</h1>
      </div>
      <SimpleDDItem
        fullSize
        payload={payload}
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
              title: 'CV',
              renderCell: CvCell,
              headerRenderCell: CenteredHeaderCell,
            },
          ],
        }}
      />
      <div className={classes.factBox}>
        <div><span className={classes.bold}>Antall konsulenter hos kunden:</span> {payload.length}</div>
        <div><span className={classes.bold}>Antall timer brukt hos kunden:</span> {payload.length}</div>
        <div><span className={classes.bold}>Første prosjekts startdato:</span> {payload.length}</div>
      </div>
    {/* todo legg til minikort etter issue #512 er ferdig  */}
    </div>
  )
}
