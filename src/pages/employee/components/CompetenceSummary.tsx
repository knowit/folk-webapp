import * as React from 'react'
import { makeStyles } from '@material-ui/core'
import { EmployeeProfileResponse } from '../../../api/data/employee/employeeApiTypes'
import { getStartedInKnowit } from '../../../utils/getStartedInKnowit'
import { getTotalWorkExperience } from '../../../utils/getTotalWorkExperience'
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
  employee?: EmployeeProfileResponse
  isLoading?: boolean
  isError?: boolean
}

export function CompetenceSummary({ employee, isLoading, isError }: Props) {
  const classes = useStyles()

  if (isError) {
    return (
      <FallbackMessage
        isError
        message="Noe gikk galt ved henting av informasjon for ansatt."
      />
    )
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
      <CompetenceSummaryItem
        label="Beregnet arbeidserfaring"
        value={getTotalWorkExperience(employee?.workExperience)}
        description="Beregnet ut i fra første jobb på CV"
      />
      <CompetenceSummaryItem
        label="Språk"
        value={employee?.tags.languages.join(', ')}
      />
      <CompetenceSummaryItem label="Nærmeste leder" value={employee?.manager} />
    </dl>
  )
}
