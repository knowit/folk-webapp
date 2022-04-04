import * as React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { CompetenceSummary } from './CompetenceSummary'
import { WorkExperienceList } from './WorkExperienceList'
import { ProjectExperienceList } from './ProjectExperienceList'
import { CompetenceChart } from './CompetenceChart'
import { useEmployeeCompetence } from '../../../api/data/employee/employeeQueries'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      background: `${theme.palette.background.paper}`,
      fontSize: '13px',
      height: '450px',
    },
    column: {
      padding: '15px',
      borderRight: '1px solid white',
      overflowY: 'auto',
    },
    summary: {
      width: '385px',
      lineHeight: '1.5em',
    },
    experience: {
      width: '365px',
      '& > *': {
        paddingBottom: '1em',
      },
      '& > h3': {
        margin: '0',
        padding: '0',
        fontSize: '1.2em',
        paddingBottom: '0.5em',
      },
    },
    competenceMotivation: {
      width: '390px',
      padding: '0',
    },
  })
)

interface Props {
  data: {
    email: string
  }
}

export function EmployeeTableExpandedInfo({ data }: Props) {
  const classes = useStyles()

  const { data: employee, error } = useEmployeeCompetence(data.email)
  const isLoading = !employee
  const isError = Boolean(error)

  // TODO: maybe not memoize here? Check render performance
  const memoizedCompetenceChart = React.useMemo(
    () => <CompetenceChart employeeEmail={data.email} />,
    [data]
  )

  return (
    <div className={classes.root}>
      <section className={[classes.column, classes.summary].join(' ')}>
        <CompetenceSummary
          employee={employee}
          isLoading={isLoading}
          isError={isError}
        />
      </section>
      <section className={[classes.column, classes.experience].join(' ')}>
        <h3>Arbeidserfaring</h3>
        <WorkExperienceList
          workExperience={employee?.workExperience}
          isLoading={isLoading}
          isError={isError}
        />
        <h3>Prosjekterfaring</h3>
        <ProjectExperienceList
          projectExperience={employee?.projectExperience}
          isLoading={isLoading}
          isError={isError}
        />
      </section>
      <div className={[classes.column, classes.competenceMotivation].join(' ')}>
        {memoizedCompetenceChart}
      </div>
    </div>
  )
}
