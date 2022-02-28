import * as React from 'react'
import { WorkExperience } from '../../../api/data/employee/employeeApiTypes'
import { formatMonthYearRange } from '../../../utils/formatMonthYearRange'
import { makeStyles } from '@material-ui/core/styles'
import { MultiLineSkeleton } from '../../../components/skeletons/MultiLineSkeleton'
import { FallbackMessage } from './FallbackMessage'
import { ExperienceList } from './ExperienceList'
import { ExperienceListItem } from './ExperienceListItem'

const useStyles = makeStyles({
  timeRange: {
    fontWeight: 'bold',
  },
})

interface Props {
  workExperience?: WorkExperience[]
  isLoading?: boolean
}

export function WorkExperienceList({ workExperience, isLoading }: Props) {
  const classes = useStyles()

  if (isLoading) {
    return <MultiLineSkeleton />
  }

  if (!workExperience || workExperience.length === 0) {
    return <FallbackMessage message="Fant ingen arbeidserfaring å vise." />
  }

  const jobsSortedByDate = workExperience.sort((jobA, jobB) => {
    const dateA = new Date(jobB.year_from, jobB.month_from)
    const dateB = new Date(jobA.year_from, jobA.month_from)
    return dateA.valueOf() - dateB.valueOf()
  })

  return (
    <ExperienceList>
      {jobsSortedByDate.map((job) => {
        const timeRange = formatMonthYearRange(
          job.month_from,
          job.year_from,
          job.month_to,
          job.year_to
        )

        return (
          <ExperienceListItem key={job.employer + job.year_from}>
            <time className={classes.timeRange}>{timeRange}</time>
            {': '}
            {job.employer}
          </ExperienceListItem>
        )
      })}
    </ExperienceList>
  )
}
