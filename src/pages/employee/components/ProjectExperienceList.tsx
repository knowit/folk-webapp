import * as React from 'react'
import { formatMonthYearRange } from '../../../utils/formatMonthYearRange'
import { makeStyles } from '@material-ui/core/styles'
import { MultiLineSkeleton } from '../../../components/skeletons/MultiLineSkeleton'
import { FallbackMessage } from './FallbackMessage'
import { ExperienceList } from './ExperienceList'
import { ExperienceListItem } from './ExperienceListItem'
import { ProjectExperience } from '../../../api/data/employee/employeeApiTypes'

const useStyles = makeStyles({
  timeRange: {
    fontWeight: 'bold',
  },
  projectTitle: {
    fontStyle: 'italic',
  },
})

interface Props {
  projectExperience?: ProjectExperience[]
  isLoading?: boolean
  isError?: boolean
}

export function ProjectExperienceList({
  projectExperience,
  isLoading,
  isError,
}: Props) {
  const classes = useStyles()

  if (isError) {
    return (
      <FallbackMessage
        isError
        message="Noe gikk galt ved henting av prosjekter."
      />
    )
  }

  if (isLoading) {
    return <MultiLineSkeleton />
  }

  if (!projectExperience || projectExperience.length === 0) {
    return <FallbackMessage message="Fant ingen prosjekter å vise." />
  }

  const sortedProjects = projectExperience.sort(compareProjects)

  return (
    <ExperienceList>
      {sortedProjects.map(
        ({ customer, project, year_to, month_to, year_from, month_from }) => (
          <ExperienceListItem key={project + year_from + month_from}>
            <time className={classes.timeRange}>
              {formatMonthYearRange(month_from, year_from, month_to, year_to)}
            </time>
            {': '}
            {customer}
            {' – '}
            <span className={classes.projectTitle}>{project}</span>
          </ExperienceListItem>
        )
      )}
    </ExperienceList>
  )
}

function compareProjects(
  projectA: ProjectExperience,
  projectB: ProjectExperience
) {
  const aDate = createComparableProjectDate(projectA)
  const bDate = createComparableProjectDate(projectB)
  return aDate.valueOf() - bDate.valueOf()
}

function createComparableProjectDate(project: ProjectExperience) {
  const { year_from, month_from, year_to, month_to } = project
  if (!year_from || year_from <= 0) {
    return new Date(year_to, month_to)
  }
  return new Date(year_from, month_from)
}
