import { createStyles, makeStyles, DefaultTheme } from '@mui/styles'
import * as React from 'react'
import { useEmployeeCompetence } from '../../../api/data/employee/employeeQueries'
import { CompetenceSummary } from '../components/CompetenceSummary'
import EmployeeCompetenceCard from '../cards/EmployeeMotivationAndCompetenceCard'
import { ProjectExperienceList } from '../components/ProjectExperienceList'
import { WorkExperienceList } from '../components/WorkExperienceList'

const useStyles = makeStyles((theme: DefaultTheme) =>
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

  return (
    <div className={classes.root}>
      <section className={[classes.column, classes.summary].join(' ')}>
        <CompetenceSummary
          employee={employee}
          isLoading={isLoading}
          error={error}
        />
      </section>
      <section className={[classes.column, classes.experience].join(' ')}>
        <h3>Arbeidserfaring</h3>
        <WorkExperienceList
          workExperience={employee?.workExperience}
          isLoading={isLoading}
          error={error}
        />
        <h3>Prosjekterfaring</h3>
        <ProjectExperienceList
          projectExperience={employee?.projectExperience}
          isLoading={isLoading}
          error={error}
        />
      </section>
      <div className={[classes.column, classes.competenceMotivation].join(' ')}>
        <EmployeeCompetenceCard employeeEmail={data.email} />
      </div>
    </div>
  )
}
