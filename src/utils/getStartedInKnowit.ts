import { WorkExperience } from '../api/data/employee/employeeApiTypes'
import { formatMonthYear } from './formatMonthYear'

export function getStartedInKnowit(jobs: WorkExperience[] = []) {
  const jobInKnowit = jobs.find(({ employer }) =>
    employer?.toLowerCase().match(/(knowit|objectnet|know)/)
  )

  if (!jobInKnowit || jobInKnowit.year_from < 0) {
    return
  }

  return formatMonthYear(jobInKnowit.month_from, jobInKnowit.year_from)
}
