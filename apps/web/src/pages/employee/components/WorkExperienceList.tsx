import * as React from 'react'
import { WorkExperience } from '../../../api/data/employee/employeeApiTypes'
import { formatMonthYearRange } from '../utils/format-month-year-range'
import { styled } from '@mui/styles'
import { MultiLineSkeleton } from '../../../components/skeletons/MultiLineSkeleton'
import { FallbackMessage } from './FallbackMessage'
import { ExperienceList } from './ExperienceList'
import { ExperienceListItem } from './ExperienceListItem'
import { compareExperienceDesc } from '../utils/compare-experience-desc'

const TimeStyled = styled('time')(() => ({
  fontWeight: 'bold',
}))

interface Props {
  workExperience?: WorkExperience[]
  isLoading?: boolean
  error?: object
}

export function WorkExperienceList({
  workExperience,
  isLoading,
  error,
}: Props) {
  if (error) {
    return <FallbackMessage error={error} />
  }

  if (isLoading) {
    return <MultiLineSkeleton />
  }

  if (!workExperience || workExperience.length === 0) {
    return <FallbackMessage message="Fant ingen arbeidserfaring å vise." />
  }

  const jobsSortedByDateDesc = workExperience.sort(compareExperienceDesc)

  return (
    <ExperienceList>
      {jobsSortedByDateDesc.map((job) => {
        const timeRange = formatMonthYearRange(
          job.month_from,
          job.year_from,
          job.month_to,
          job.year_to
        )

        return (
          <ExperienceListItem key={job.employer + job.year_from}>
            <TimeStyled>{timeRange}</TimeStyled>
            {': '}
            {job.employer}
          </ExperienceListItem>
        )
      })}
    </ExperienceList>
  )
}
