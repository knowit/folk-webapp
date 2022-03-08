import * as React from 'react'
import { formatMonthYearRange } from '../../../utils/formatMonthYearRange'
import { makeStyles } from '@material-ui/core/styles'
import { useEmployeeExperience } from '../../../api/data/employee/employeeQueries'
import { MultiLineSkeleton } from '../../../components/skeletons/MultiLineSkeleton'
import { FallbackMessage } from '../../../components/FallbackMessage'
import { ExperienceList } from './ExperienceList'
import { ExperienceListItem } from './ExperienceListItem'

const useStyles = makeStyles({
  timeRange: {
    fontWeight: 'bold',
  },
  projectTitle: {
    fontStyle: 'italic',
  },
})

interface Props {
  user_id?: string
}

export function ProjectExperienceList({ user_id }: Props) {
  const classes = useStyles()

  const { data, error } = useEmployeeExperience(user_id)

  if (error) {
    return (
      <FallbackMessage
        isError
        message="Noe gikk galt ved henting av prosjekter."
      />
    )
  }

  if (!data) {
    return <MultiLineSkeleton />
  }

  const { experience: projectExperience } = data

  if (!projectExperience || projectExperience.length === 0) {
    return <FallbackMessage message="Fant ingen prosjekter å vise." />
  }

  const sortedProjects = projectExperience.sort((projectA, projectB) => {
    const aDate = new Date(projectA.time_from || projectA.time_to)
    const bDate = new Date(projectB.time_from || projectB.time_to)
    return aDate.valueOf() - bDate.valueOf()
  })

  return (
    <ExperienceList>
      {sortedProjects.map(({ project, customer, time_from, time_to }) => (
        <ExperienceListItem key={project + time_from}>
          <time className={classes.timeRange}>
            {formatTimeRange(time_from, time_to)}
          </time>
          {': '}
          {customer}
          {' – '}
          <span className={classes.projectTitle}>{project}</span>
        </ExperienceListItem>
      ))}
    </ExperienceList>
  )
}

function formatTimeRange(fromDate: string, toDate: string) {
  const [fromYear, fromMonth] = fromDate.split('/').map(Number)
  const [toYear, toMonth] = toDate.split('/').map(Number)
  return formatMonthYearRange(fromMonth, fromYear, toMonth, toYear)
}
