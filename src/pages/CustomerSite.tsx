import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { ArrowBack } from '@material-ui/icons'
import { SimpleDDItem } from '../data/SimpleDDItem'
import CustomerTable from '../components/CustomerTable'
import {
  CenteredHeaderCell,
  ConsultantCell,
  CvCell,
} from '../data/components/table/DataCells'
import EmployeeInfo from '../components/EmployeeInfo'
import { Payload } from '../components/CustomerList'
import { useFetchedData } from '../hooks/service'
import { Skeleton } from '@material-ui/lab'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { CenteredDataCell } from '../data/components/table/cells/CenteredHeaderCell'
import { Grid } from '@material-ui/core'
import { GridItem } from '../components/GridItem'
import DDItem, { DDChart } from '../data/DDItem'
import { ChartSkeleton } from './EmployeeSite'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      marginTop: '-70px',
    },
    header: {
      gap: '15px',
      lineHeight: '2em',
      textDecoration: 'underline',
      fontSize: '24px',
      display: 'flex',
      alignItems: 'center',
    },
    arrowBack: {
      cursor: 'pointer',
      verticalAlign: 'middle',
      height: '40px',
      width: '40px',
    },
    bold: {
      fontWeight: 'bold',
    },
    factBox: {
      marginTop: '15px',
      display: 'flex',
      flexDirection: 'column',
    },
    chartContainer: {
      marginTop: '15px',
    },
  })
)

export default function CustomerSite() {
  const history = useHistory()
  const customerName = history.location.pathname.split('/')[2]
  const routeOnClick = useCallback(() => history.push('/kunder'), [history])
  const classes = useStyles()
  const ubwMessage =
    'Dataene er fra første registrering i UBW og kan derfor være unøyaktige.'

  const [custEmps, custEmpsPending] = useFetchedData<Payload>({
    url: '/api/data/customerSiteTable?customer=' + customerName,
  })

  const [projects, projectsPending] = useFetchedData<Payload>({
    url: '/api/data/projectsCustomer?customer=' + customerName,
  })

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <ArrowBack
          className={classes.arrowBack}
          onClick={() => routeOnClick()}
        />
        <h1>{customerName}</h1>
      </div>
      <div style={{ marginBottom: '15px' }}>
        {!custEmpsPending && custEmps && (
          <SimpleDDItem
            fullSize
            payload={custEmps}
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
                { title: 'Prosjekt' },
                {
                  title: 'CV',
                  renderCell: CvCell,
                  headerRenderCell: CenteredHeaderCell,
                },
              ],
            }}
          />
        )}
      </div>
      {custEmpsPending && <Skeleton width={'100%'} animation="wave" />}
      {!projectsPending && projects && customerName != 'Uten prosjekt' && (
        <SimpleDDItem
          fullSize
          payload={projects}
          Component={CustomerTable}
          dataComponentProps={{
            columns: [
              { title: 'Prosjekt' },
              {
                title: 'Antall konsulenter på prosjekt',
                headerRenderCell: CenteredHeaderCell,
                renderCell: CenteredDataCell,
              },
              {
                title: 'Antall timer siste perioden',
                headerRenderCell: CenteredHeaderCell,
                renderCell: CenteredDataCell,
              },
              {
                title: 'Antall timer totalt',
                headerRenderCell: CenteredHeaderCell,
                renderCell: CenteredDataCell,
              },
            ],
            smallTable: true,
          }}
        />
      )}
      {projectsPending && <Skeleton width={'100%'} animation="wave" />}
      <div className={classes.factBox}>
        <div>
          <span className={classes.bold}>Antall konsulenter hos kunden: </span>
          {custEmps && custEmps.length}
        </div>
        {projects && (
          <div>
            <span className={classes.bold}>
              Antall timer brukt hos kunden:{' '}
            </span>
            {projects
              .map((row: { rowData: any[] }) => row.rowData[3])
              .reduce((a: number, b: number) => a + b, 0)}{' '}
            {/* rowData[3] is total hours per project */}
          </div>
        )}
      </div>
      <Grid className={classes.chartContainer} container>
        <GridItem>
          <DDItem
            url={
              '/api/data/customerMotivationKnowledge?customer=' + customerName
            }
            title={'Kompetansemendge hos ' + customerName}
            Component={DDChart}
            SkeletonComponent={ChartSkeleton}
            fullSize
            description={ubwMessage}
            dataComponentProps={{
              chartVariants: [
                {
                  type: 'Bar',
                  props: {
                    dataKey: 'category',
                    yLabels: ['motivationSum', 'knowledgeSum'],
                    margin: { top: 40, right: 20, bottom: 65, left: 40 },
                  },
                },
              ],
            }}
          />
        </GridItem>
        <GridItem>
          <DDItem
            url={'/api/data/customerHoursBilled?customer=' + customerName}
            title="Timer brukt; historiske data"
            Component={DDChart}
            SkeletonComponent={ChartSkeleton}
            fullSize
            dataComponentProps={{
              chartVariants: [
                {
                  type: 'Bar',
                  props: {
                    dataKey: 'reg_period',
                    yLabels: ['hours'],
                    margin: { top: 40, right: 20, bottom: 65, left: 40 },
                  },
                },
              ],
            }}
          />
        </GridItem>
      </Grid>
    </div>
  )
}
