import { styled } from '@mui/material/styles'
import * as React from 'react'
import { useEmployeeCompetence } from '../../../api/data/employee/employeeQueries'
import { CompetenceSummary } from '../components/CompetenceSummary'
import EmployeeCompetenceCard from '../cards/EmployeeMotivationAndCompetenceCard'
import { ProjectExperienceList } from '../components/ProjectExperienceList'
import { WorkExperienceList } from '../components/WorkExperienceList'

const ComponentRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  background: theme.palette.background.paper,
  fontSize: 13,
  height: 450,
}))
const ComponentSummary = styled('section')(() => ({
  padding: 15,
  borderRight: '1px solid rgba(0, 0, 0, 0)',
  overflowY: 'auto',
  width: 395,
  lineHeight: '1.5em',
}))
const ComponentExperience = styled('section')(() => ({
  padding: 15,
  borderRight: '1px solid rgba(0, 0, 0, 0)',
  overflowY: 'auto',
  width: 369,
  '& > *': {
    paddingBottom: '1em',
  },
  '& > h3': {
    margin: 0,
    padding: 0,
    fontSize: '1.2em',
    paddingBottom: '0.5em',
  },
}))
const ComponentCompetence = styled('div')(() => ({
  borderRight: '1px solid rgba(0, 0, 0, 0)',
  overflowY: 'auto',
  width: 390,
  padding: 0,
}))

interface Props {
  data: {
    email: string
  }
}

export function EmployeeTableExpandedInfo({ data }: Props) {
  const { data: employee, error } = useEmployeeCompetence(data.email)
  const isLoading = !employee

  return (
    <ComponentRoot>
      <ComponentSummary>
        <CompetenceSummary
          employee={employee}
          isLoading={isLoading}
          error={error}
        />
      </ComponentSummary>
      <ComponentExperience>
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
      </ComponentExperience>
      <ComponentCompetence>
        <EmployeeCompetenceCard employeeEmail={data.email} />
      </ComponentCompetence>
    </ComponentRoot>
  )
}
