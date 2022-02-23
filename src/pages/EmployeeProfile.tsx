import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import Chart from '../data/components/chart/Chart'
import { useFetchedData } from '../hooks/service'
import { GetProjects, GetWorkExperience } from '../components/EmployeeInfo'
import { ReactComponent as FallbackUserIcon } from '../assets/fallback_user.svg'
import { CustomerStatusData } from '../data/components/table/cells/CustomerStatusCell'
import { useEmployeeRadar } from '../api/data/employee/employeeQueries'
import { EmployeeProfileResponse } from '../api/data/employee/employeeApiTypes'
import { getStartedInKnowit } from '../utils/getStartedInKnowit'
import { getTotalWorkExperience } from '../utils/getTotalWorkExperience'

export interface ProjectExperience {
  customer: string
  project: string
  time_to: string
  time_from: string
}

export interface ExperienceData {
  name: string
  experience: ProjectExperience[]
}

const useStyles = makeStyles({
  root: {
    lineHeight: '1.2em',
    whiteSpace: 'normal',
    marginTop: '10px',
    paddingLeft: '25px',
    fontSize: '16px',
    display: 'flex',
    flexDirection: 'column',
  },
  firstPart: {
    display: 'flex',
    flexDirection: 'row',
    gap: '70px',
  },
  left: {
    width: '50%',
  },
  right: {
    width: '50%',
  },
  image: {
    borderRadius: '50%',
    backgroundColor: '#C4C4C4',
    height: '158px',
    width: '158px',
  },
  cell: {
    marginBottom: '12px',
    lineHeight: '20px',
  },
  header: {
    display: 'flex',
    paddingRight: '10px',
    paddingBottom: '20px',
    gap: '15px',
    lineHeight: '2em',
  },
  nextPart: {},
})

export const ChartSkeleton = () => (
  <Skeleton variant="rect" height={320} width={400} animation="wave" />
)

export default function EmployeeProfile() {
  const location = useLocation()
  const email = location.pathname.split('/')[2]
  const idRegex = /^(\w+\.?)*@knowit.no$/
  const url = '/api/data/employeeProfile?email=' + email
  const [data, pending] = useFetchedData<EmployeeProfileResponse>({ url })

  const classes = useStyles()

  const user_id = data ? data.user_id : null
  const emp = data ?? null
  const tags = data ? data.tags : null
  const [expData, expPending] = useFetchedData<ExperienceData>({
    url: `/api/data/employeeExperience?user_id=${user_id}`,
  })
  const employeeChartData = useEmployeeRadar(email).data
  if (!email.match(idRegex)) {
    return <Navigate replace to={{ pathname: '/404' }} />
  }

  return (
    <div className={classes.root}>
      <div className={classes.firstPart}>
        <div className={classes.left}>
          {pending ? (
            <Skeleton variant="rect" width={340} height={15} animation="wave" />
          ) : (
            <div className={classes.header}>
              {data?.image ? (
                <img
                  className={classes.image}
                  src={data?.image}
                  alt={emp?.navn}
                />
              ) : (
                <FallbackUserIcon />
              )}
              <div>
                <h1>{emp?.navn}</h1>
                <h2>{emp?.title}</h2>
              </div>
            </div>
          )}
          <div>
            <div className={classes.cell}>
              {pending ? (
                <Skeleton
                  variant="rect"
                  width={340}
                  height={15}
                  animation="wave"
                />
              ) : (
                <>
                  <b>Hovedkompetanse: </b>
                  {tags?.skills.join(', ')}
                </>
              )}
            </div>
            <div className={classes.cell}>
              {pending ? (
                <Skeleton
                  variant="rect"
                  width={340}
                  height={15}
                  animation="wave"
                />
              ) : (
                <>
                  <b>Roller: </b>
                  {tags?.roles.join(', ')}
                </>
              )}
            </div>
            <div className={classes.cell}>
              {pending ? (
                <Skeleton
                  variant="rect"
                  width={340}
                  height={15}
                  animation="wave"
                />
              ) : (
                <>
                  <b>Startet i Knowit: </b>{' '}
                  {getStartedInKnowit(data?.workExperience)}
                </>
              )}
            </div>
            <div className={classes.cell}>
              {pending ? (
                <Skeleton
                  variant="rect"
                  width={340}
                  height={15}
                  animation="wave"
                />
              ) : (
                <div title="Beregnet ut i fra første jobb på CV">
                  <b>Beregnet arbeidserfaring: </b>
                  {getTotalWorkExperience(data?.workExperience)}
                </div>
              )}
            </div>
            <div className={classes.cell}>
              {pending ? (
                <Skeleton
                  variant="rect"
                  width={340}
                  height={15}
                  animation="wave"
                />
              ) : (
                <>
                  <b>Språk: </b>
                  {tags?.languages.join(', ')}
                </>
              )}
            </div>
            <div className={classes.cell}>
              {pending ? (
                <Skeleton
                  variant="rect"
                  width={340}
                  height={15}
                  animation="wave"
                />
              ) : (
                <>
                  <b>Utdanning: </b>
                  {data?.degree}
                </>
              )}
            </div>
            <div className={classes.cell}>
              {pending ? (
                <Skeleton
                  variant="rect"
                  width={340}
                  height={15}
                  animation="wave"
                />
              ) : (
                <>
                  <b>Nærmeste leder: </b>
                  {data?.manager}
                </>
              )}
            </div>
          </div>
        </div>
        <div className={classes.right}>
          <p>
            <b>Kompetansekartlegging</b>
          </p>
          {employeeChartData ? (
            <Chart
              payload={employeeChartData}
              title="Motivasjon"
              fullsize={true}
              props={{
                chartVariants: [
                  {
                    type: 'Bar',
                    props: {
                      dataKey: 'category',
                      yLabels: ['motivation', 'competence'],
                      maxValue: 5,
                    },
                  },
                  {
                    type: 'Radar',
                    props: {
                      groupKey: 'category',
                      valueKey: ['motivation', 'competence'],
                      maxValue: 5,
                    },
                  },
                ],
              }}
            />
          ) : (
            <ChartSkeleton />
          )}
        </div>
      </div>
      <div className={classes.nextPart}>
        <h2>Kunde(r)</h2>
        {pending ? (
          <p>loading....</p>
        ) : (
          <PrintCustomers customers={data?.customers} />
        )}
        <h2>Arbeidserfaring</h2>
        {pending ? (
          <p>loading....</p>
        ) : (
          <GetWorkExperience workExp={data?.workExperience} />
        )}

        <h2>Prosjekterfaring</h2>
        {!expPending && expData ? (
          <GetProjects expData={expData} />
        ) : (
          <p>loading....</p>
        )}
        <h2>Download CV</h2>
        {pending || !data ? (
          <p>loading....</p>
        ) : (
          data &&
          Object.entries(data.links).map((link) => (
            <p key={link[1]}>
              <a href={link[1]}>{link[0]}</a>
            </p>
          ))
        )}
      </div>
    </div>
  )
}

const PrintCustomers = (props: { customers?: CustomerStatusData[] }) => {
  if (!props.customers || props.customers.length === 0) return <div>-</div>
  props.customers.sort(
    (customerA, customerB) => customerA.weight - customerB.weight
  )
  return (
    <>
      {props.customers.map((customer, index) => {
        return (
          <div key={index}>
            <b>{customer.customer}: </b>
            {customer.workOrderDescription}
          </div>
        )
      })}
    </>
  )
}
