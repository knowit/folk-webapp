import * as React from 'react'
import { makeStyles } from '@material-ui/core'
import { EmployeeCompetenceResponse } from '../../../api/data/employee/employeeApiTypes'
import { getStartedInKnowit } from '../utils/get-started-in-knowit'
import { MultiLineSkeleton } from '../../../components/skeletons/MultiLineSkeleton'
import { CompetenceSummaryItem } from './CompetenceSummaryItem'
import { FallbackMessage } from './FallbackMessage'

const useStyles = makeStyles({
  root: {
    padding: '0',
    margin: '0',
  },
})

interface Props {
  employee?: EmployeeCompetenceResponse
  isLoading?: boolean
  error?: object
}

export function CompetenceSummary({ employee, isLoading, error }: Props) {
  const classes = useStyles()

  if (error) {
    return <FallbackMessage error={error} />
  }

  if (isLoading) {
    return <MultiLineSkeleton lines={7} />
  }

  return (
    <dl className={classes.root}>
      <CompetenceSummaryItem label="Utdanning" value={employee?.degree} />
      <CompetenceSummaryItem
        label="Hovedkompetanse"
        value={employee?.tags.skills.join(', ')}
      />
      <CompetenceSummaryItem
        label="Roller"
        value={employee?.tags.roles.join(', ')}
      />
      <CompetenceSummaryItem
        label="Startet i Knowit"
        value={getStartedInKnowit(employee?.workExperience)}
      />
      {/*<CompetenceSummaryItem
        label='Beregnet arbeidserfaring'
        value={getTotalWorkExperience(employee?.workExperience)}
        description='Beregnet ut i fra første jobb på CV'
      /> */}
      <CompetenceSummaryItem
        label="Språk"
        value={employee?.tags.languages.join(', ')}
      />
      <CompetenceSummaryItem label="Nærmeste leder" value={employee?.manager} />
    </dl>
  )
}
