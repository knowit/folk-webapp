import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Skeleton } from '@material-ui/lab'
import * as React from 'react'
import {
  ConsultantInfo,
  EmployeeExperienceResponse,
  EmployeeExperience,
  WorkExperience,
} from '../../../api/data/employee/employeeApiTypes'
import {
  useEmployeeExperience,
  useEmployeeMotivationAndCompetenceCharts,
  useEmployeeProfile,
} from '../../../api/data/employee/employeeQueries'
import ChartCard from '../../../components/charts/ChartCard'
import { NoData } from '../../../components/ErrorText'
import { formatMonthYearRange } from '../../../utils/formatMonthYearRange'
import { getStartedInKnowit } from '../../../utils/getStartedInKnowit'
import { getTotalWorkExperience } from '../../../utils/getTotalWorkExperience'

export const months = [
  'Januar',
  'Februar',
  'Mars',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Desember',
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    info: {
      paddingTop: '15px',
      width: '385px',
      lineHeight: '1.2em',
      whiteSpace: 'normal',
    },
    cell: {
      marginBottom: '12px',
      padding: '0 15px',
      lineHeight: '18px',
    },
    prosjektliste: {
      lineHeight: '18px',
      paddingBottom: '12px',
    },
    erfaring: {
      width: '365px',
      borderLeft: `1px solid white`,
      paddingLeft: '15px',
      overflowY: 'auto',
      paddingBottom: '15px',
    },
    oversikt: {
      width: '390px',
      borderLeft: `1px solid white`,
    },
    root: {
      display: 'flex',
      flexDirection: 'row',
      background: `${theme.palette.background.paper}`,
      borderLeft: '1px solid white',
      borderRight: '1px solid white',
      fontSize: '12px',
      height: '450px',
    },
  })
)

interface EmployeeInfoProps {
  data: Pick<ConsultantInfo, 'email' | 'user_id'>
  id: string
  setRowHeight: (id: string, height: number) => void
}

function getStringFromList(list: string[] | undefined) {
  if (!list || list.length === 0) return <NoData />
  return Array.from(new Set(list))
    .filter((item) => Boolean(item))
    .join(', ')
}

export default function EmployeeInfo({ data }: EmployeeInfoProps) {
  const classes = useStyles()

  const { data: empData } = useEmployeeProfile(data.email)
  const { data: expData } = useEmployeeExperience(data.user_id)
  const { data: employeeChartData } = useEmployeeMotivationAndCompetenceCharts(
    data.email
  )

  return (
    <div className={classes.root}>
      <div className={classes.info}>
        <div className={classes.cell}>
          {!empData ? (
            <Skeleton variant="rect" width={340} height={15} animation="wave" />
          ) : (
            <>
              <b>Utdanning: </b>
              {empData?.degree ?? <NoData />}
            </>
          )}
        </div>
        <div className={classes.cell}>
          {!empData ? (
            <Skeleton variant="rect" width={340} height={15} animation="wave" />
          ) : (
            <>
              <b>Hovedkompetanse: </b>
              {getStringFromList(empData?.tags.skills)}
            </>
          )}
        </div>
        <div className={classes.cell}>
          {!empData ? (
            <Skeleton variant="rect" width={340} height={15} animation="wave" />
          ) : (
            <>
              <b>Roller: </b>
              {getStringFromList(empData?.tags.roles)}
            </>
          )}
        </div>
        <div className={classes.cell}>
          {!empData ? (
            <Skeleton variant="rect" width={340} height={15} animation="wave" />
          ) : (
            <>
              <b>Startet i Knowit:</b>{' '}
              {getStartedInKnowit(empData?.workExperience)}
            </>
          )}
        </div>
        <div className={classes.cell}>
          {!empData ? (
            <Skeleton variant="rect" width={340} height={15} animation="wave" />
          ) : (
            <div title="Beregnet ut i fra første jobb på CV">
              <b>Beregnet arbeidserfaring: </b>
              {getTotalWorkExperience(empData?.workExperience)}
            </div>
          )}
        </div>
        <div className={classes.cell}>
          {!empData ? (
            <Skeleton variant="rect" width={340} height={15} animation="wave" />
          ) : (
            <>
              <b>Språk: </b>
              {getStringFromList(empData?.tags.languages)}
            </>
          )}
        </div>
        <div className={classes.cell}>
          {!empData ? (
            <Skeleton variant="rect" width={340} height={15} animation="wave" />
          ) : (
            <>
              <b>Nærmeste leder: </b>
              {empData?.manager}
            </>
          )}
        </div>
      </div>
      <div className={classes.erfaring}>
        <h3> Arbeidserfaring</h3>
        {!empData ? (
          <Skeleton variant="rect" width={340} height={15} animation="wave" />
        ) : (
          <GetWorkExperience workExp={empData?.workExperience} />
        )}
        <h3> Prosjekterfaring </h3>
        {!expData ? (
          <Skeleton variant="rect" width={340} height={15} animation="wave" />
        ) : (
          <GetProjects expData={expData} />
        )}
      </div>
      <div className={classes.oversikt}>
        {employeeChartData && (
          <ChartCard title="Kompetansemengde" data={employeeChartData} />
        )}
      </div>
    </div>
  )
}

export const GetWorkExperience = (workExp: {
  workExp: WorkExperience[] | undefined
}) => {
  if (!workExp.workExp) return <div> Fant ingen arbeidserfaring </div>

  workExp.workExp.sort((jobA, jobB) => {
    const dateA = new Date(jobB.year_from, jobB.month_from)
    const dateB = new Date(jobA.year_from, jobA.month_from)
    return dateA.valueOf() - dateB.valueOf()
  })

  return (
    <>
      {workExp.workExp.map((exp, index) => (
        <div key={index}>
          {formatMonthYearRange(
            exp.month_from,
            exp.year_from,
            exp.month_to,
            exp.year_to
          )}
          {': '}
          {exp.employer}
        </div>
      ))}
    </>
  )
}

export const GetProjects = (expData: {
  expData: EmployeeExperienceResponse | null
}) => {
  const classes = useStyles()
  if (!expData || !expData.expData || !expData.expData.experience)
    return <div> Fant ingen prosjekter </div>
  expData.expData.experience.sort(compareProjectDates)
  return (
    <>
      {expData.expData.experience.map((exp, index) => (
        <div className={classes.prosjektliste} key={index}>
          {formatDateRange(exp.time_from, exp.time_to)}
          {': '}
          {exp.customer} - <i>{exp.project}</i>
        </div>
      ))}
    </>
  )
}

function compareProjectDates(
  projectA: EmployeeExperience,
  projectB: EmployeeExperience
) {
  const aDate = new Date(projectA.time_from || projectA.time_to)
  const bDate = new Date(projectB.time_from || projectB.time_to)
  return aDate.valueOf() - bDate.valueOf()
}

function formatDateRange(fromDate: string, toDate: string) {
  const [fromYear, fromMonth] = fromDate.split('/').map(Number)
  const [toYear, toMonth] = toDate.split('/').map(Number)
  return formatMonthYearRange(fromMonth, fromYear, toMonth, toYear)
}
