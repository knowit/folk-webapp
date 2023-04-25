import * as React from 'react'
import { formatMonthYearRange } from '../utils/format-month-year-range'
import { styled } from '@mui/material/styles'
import { MultiLineSkeleton } from '../../../components/skeletons/MultiLineSkeleton'
import { FallbackMessage } from './FallbackMessage'
import { ExperienceList } from './ExperienceList'
import { ExperienceListItem } from './ExperienceListItem'
import { ProjectExperience } from '../../../api/data/employee/employeeApiTypes'
import { compareExperienceDesc } from '../utils/compare-experience-desc'

const TimeStyled = styled('time')(() => ({
  fontWeight: 'bold',
}))
const SpanStyled = styled('span')(() => ({
  fontStyle: 'italic',
}))

interface Props {
  projectExperience?: ProjectExperience[]
  isLoading?: boolean
  error?: object
}

export function ProjectExperienceList({
  projectExperience,
  isLoading,
  error,
}: Props) {
  if (error) {
    return (
      <FallbackMessage
        error={error}
        message="Beklager, noe gikk galt ved henting av prosjekter."
      />
    )
  }

  if (isLoading) {
    return <MultiLineSkeleton />
  }

  if (!projectExperience || projectExperience.length === 0) {
    return <FallbackMessage message="Fant ingen prosjekter å vise." />
  }

  const projectsSortedByDateDesc = projectExperience.sort(compareExperienceDesc)

  return (
    <ExperienceList>
      {projectsSortedByDateDesc.map(
        ({ customer, project, year_to, month_to, year_from, month_from }) => (
          <ExperienceListItem key={project + year_from + month_from}>
            <TimeStyled>
              {formatMonthYearRange(month_from, year_from, month_to, year_to)}
            </TimeStyled>
            {': '}
            {customer}
            {' – '}
            <SpanStyled>{project}</SpanStyled>
          </ExperienceListItem>
        )
      )}
    </ExperienceList>
  )
}
