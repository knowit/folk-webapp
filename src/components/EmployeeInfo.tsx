import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Skeleton } from '@material-ui/lab'
import { useFetchedData } from '../hooks/service'
import { NoData } from './ErrorText'
import { ExperienceData, ProjectExperience } from '../pages/EmployeeProfile'
import Chart from '../data/components/chart/Chart'
import { useEmployeeRadar } from '../api/data/employee/employeeQueries'
import { formatMonthYearRange } from '../utils/formatMonthYearRange'
import { WorkExperience } from '../api/data/employee/employeeApiTypes'
import { getStartedInKnowit } from '../utils/getStartedInKnowit'
import { getTotalWorkExperience } from '../utils/getTotalWorkExperience'

interface MotivationMap {
  [category: string]: number
}

interface EmployeeInfoData {
  motivation: MotivationMap
  tags: {
    languages: string[]
    skills: string[]
    roles: string[]
  }
  workExperience: WorkExperience[]
  manager: string
  guid: string
}

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
  data: {
    competenceUrl: string
    user_id: string
    email_id: string
    degree: string
  }
  id: string
  setRowHeight: (id: string, height: number) => void
}

export default function EmployeeInfo({ data }: EmployeeInfoProps) {
  const classes = useStyles()
  const url = data.competenceUrl
  const [empData, pending] = useFetchedData<EmployeeInfoData>({ url })
  const user_id = data.user_id
  const [expData, expPending] = useFetchedData<ExperienceData>({
    url: `/api/data/employeeExperience?user_id=${user_id}`,
  })

  const { data: employeeChartData } = useEmployeeRadar(data.email_id)

  const getStringFromList = (
    list: string[] | null | undefined,
    listName: 'skills' | 'roles' | 'languages'
  ) => {
    if (!list) return <NoData />
    return list.length > 0 ? (
      `${Array.from(new Set(empData?.tags[listName]))
        .filter((x) => x)
        .join(', ')}.`
    ) : (
      <NoData />
    )
  }

  return (
    <div className={classes.root}>
      <div className={classes.info}>
        <div className={classes.cell}>
          <b>Utdanning: </b>
          {data.degree}
        </div>
        <div className={classes.cell}>
          {pending ? (
            <Skeleton variant="rect" width={340} height={15} animation="wave" />
          ) : (
            <>
              <b>Hovedkompetanse: </b>
              {getStringFromList(empData?.tags.skills, 'skills')}
            </>
          )}
        </div>
        <div className={classes.cell}>
          {pending ? (
            <Skeleton variant="rect" width={340} height={15} animation="wave" />
          ) : (
            <>
              <b>Roller: </b>
              {getStringFromList(empData?.tags.roles, 'roles')}
            </>
          )}
        </div>
        <div className={classes.cell}>
          {pending ? (
            <Skeleton variant="rect" width={340} height={15} animation="wave" />
          ) : (
            <>
              <b>Startet i Knowit:</b>{' '}
              {getStartedInKnowit(empData?.workExperience)}
            </>
          )}
        </div>
        <div className={classes.cell}>
          {pending ? (
            <Skeleton variant="rect" width={340} height={15} animation="wave" />
          ) : (
            <div title="Beregnet ut i fra første jobb på CV">
              <b>Beregnet arbeidserfaring: </b>
              {getTotalWorkExperience(empData?.workExperience)}
            </div>
          )}
        </div>
        <div className={classes.cell}>
          {pending ? (
            <Skeleton variant="rect" width={340} height={15} animation="wave" />
          ) : (
            <>
              <b>Språk: </b>
              {getStringFromList(empData?.tags.languages, 'languages')}
            </>
          )}
        </div>
        <div className={classes.cell}>
          {pending ? (
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
        {pending ? (
          <Skeleton variant="rect" width={340} height={15} animation="wave" />
        ) : (
          <GetWorkExperience workExp={empData?.workExperience} />
        )}
        <h3> Prosjekterfaring </h3>
        {expPending ? (
          <Skeleton variant="rect" width={340} height={15} animation="wave" />
        ) : (
          <GetProjects expData={expData} />
        )}
      </div>
      <div className={classes.oversikt}>
        {employeeChartData ? (
          <Chart
            payload={employeeChartData}
            title="Motivasjon"
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
            fullsize={true}
          />
        ) : (
          <Skeleton variant="rect" height={320} width={400} animation="wave" />
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

export const GetProjects = (expData: { expData: ExperienceData | null }) => {
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
  projectA: ProjectExperience,
  projectB: ProjectExperience
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
