import { styled } from '@mui/material/styles'
import * as React from 'react'
import { useEmployeeProfile } from '../../../api/data/employee/employeeQueries'
import { CompetenceSummary } from './CompetenceSummary'
import { CustomersForEmployee } from './CustomersForEmployee'
import { CvDownloadList } from './CvDownloadList'
import { EmployeeAvatar } from './EmployeeAvatar'
import { EmployeeByline } from './EmployeeByline'
import EmployeeCompetenceCard from '../cards/EmployeeMotivationAndCompetenceCard'
import { EmployeeNotFound } from './EmployeeNotFound'
import { FallbackMessage } from './FallbackMessage'
import { ProjectExperienceList } from './ProjectExperienceList'
import { WorkExperienceList } from './WorkExperienceList'

const ComponentRoot = styled('article')(() => ({
  display: 'flex',
  lineHeight: '1.25em',
  fontSize: 16,
  flexDirection: 'column',
  padding: 10,
}))
const ComponentHeader = styled('div')(() => ({
  display: 'flex',
  flexFlow: 'row wrap',
  alignItems: 'center',
  '& > *:not(:first-child)': {
    marginLeft: 25,
    flexGrow: 1,
  },
}))
const ComponentBody = styled('div')(() => ({
  display: 'flex',
  padding: 10,
  flexDirection: 'row',
  '& section': {
    marginTop: 25,
  },
}))
const ComponentColumn = styled('div')(() => ({
  flexGrow: 1,
  flexBasis: '50%',
  maxWidth: '50%', // Chart does not honor flexBasis
  '&:not(:first-child)': {
    marginLeft: 50,
  },
}))

interface Props {
  employeeEmail: string
}

export function EmployeeProfileContent({ employeeEmail }: Props) {
  const { data: employee, error } = useEmployeeProfile(employeeEmail)
  const isLoading = !employee

  if (error && error.status === 404) {
    return <EmployeeNotFound employeeId={employeeEmail} />
  }

  if (error) {
    return <FallbackMessage error={error} />
  }

  return (
    <ComponentRoot>
      <ComponentHeader>
        <EmployeeAvatar imageUrl={employee?.image} isLoading={isLoading} />
        <EmployeeByline employee={employee} isLoading={isLoading} />
      </ComponentHeader>
      <ComponentBody>
        <ComponentColumn>
          <section>
            <CompetenceSummary employee={employee} isLoading={isLoading} />
          </section>
          <section>
            <h2>Kunder siste måned</h2>
            <CustomersForEmployee
              customers={employee?.customers}
              isLoading={isLoading}
              error={error}
            />
          </section>
          <section>
            <h2>Arbeidserfaring</h2>
            <WorkExperienceList
              workExperience={employee?.workExperience}
              isLoading={isLoading}
              error={error}
            />
          </section>
          <section>
            <h2>Prosjekterfaring</h2>
            <ProjectExperienceList
              projectExperience={employee?.projectExperience}
              isLoading={isLoading}
              error={error}
            />
          </section>
          <section>
            <h2>Last ned CV</h2>
            <CvDownloadList links={employee?.links} isLoading={isLoading} />
          </section>
        </ComponentColumn>
        <ComponentColumn>
          <EmployeeCompetenceCard employeeEmail={employeeEmail} />
        </ComponentColumn>
      </ComponentBody>
    </ComponentRoot>
  )
}
