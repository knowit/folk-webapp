import { makeStyles } from '@material-ui/core'
import * as React from 'react'
import { useEmployeeProfile } from '../../../api/data/employee/employeeQueries'
import { CompetenceSummary } from './CompetenceSummary'
import { CustomersForEmployee } from './CustomersForEmployee'
import { CvDownloadList } from './CvDownloadList'
import { EmployeeAvatar } from './EmployeeAvatar'
import { EmployeeByline } from './EmployeeByline'
import EmployeeCompetenceCard from './EmployeeMotivationAndCompetenceCard'
import { EmployeeNotFound } from './EmployeeNotFound'
import { FallbackMessage } from './FallbackMessage'
import { ProjectExperienceList } from './ProjectExperienceList'
import { WorkExperienceList } from './WorkExperienceList'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    lineHeight: '1.25em',
    fontSize: '16px',
    flexDirection: 'column',
    padding: '10px',
  },
  header: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    '& > *:not(:first-child)': {
      marginLeft: '25px',
      flexGrow: 1,
    },
  },
  body: {
    display: 'flex',
    padding: '10px',
    flexDirection: 'row',
    '& section': {
      marginTop: '25px',
    },
  },
  column: {
    flexGrow: 1,
    flexBasis: '50%',
    maxWidth: '50%', // Chart does not honor flexBasis
    '&:not(:first-child)': {
      marginLeft: '50px',
    },
  },
})

interface Props {
  employeeEmail: string
}

export function EmployeeProfileContent({ employeeEmail }: Props) {
  const classes = useStyles()

  const { data: employee, error } = useEmployeeProfile(employeeEmail)
  const isLoading = !employee

  if (error && error.status === 404) {
    return <EmployeeNotFound employeeId={employeeEmail} />
  }

  if (error) {
    return (
      <FallbackMessage
        isError
        message="Noe gikk galt ved henting av informasjon for ansatt."
      />
    )
  }

  return (
    <article className={classes.root}>
      <div className={classes.header}>
        <EmployeeAvatar imageUrl={employee?.image} isLoading={isLoading} />
        <EmployeeByline employee={employee} isLoading={isLoading} />
      </div>
      <div className={classes.body}>
        <div className={classes.column}>
          <section>
            <CompetenceSummary employee={employee} isLoading={isLoading} />
          </section>
          <section>
            <h2>Kunder siste måned</h2>
            <CustomersForEmployee
              customers={employee?.customers}
              isLoading={isLoading}
            />
          </section>
          <section>
            <h2>Arbeidserfaring</h2>
            <WorkExperienceList
              workExperience={employee?.workExperience}
              isLoading={isLoading}
            />
          </section>
          <section>
            <h2>Prosjekterfaring</h2>
            <ProjectExperienceList
              projectExperience={employee?.projectExperience}
              isLoading={isLoading}
            />
          </section>
          <section>
            <h2>Last ned CV</h2>
            <CvDownloadList links={employee?.links} isLoading={isLoading} />
          </section>
        </div>
        <div className={classes.column}>
          <EmployeeCompetenceCard employeeEmail={employeeEmail} />
        </div>
      </div>
    </article>
  )
}
