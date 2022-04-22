import { WorkExperience } from '../../../api/data/employee/employeeApiTypes'

export function getTotalWorkExperience(jobs: WorkExperience[] = []) {
  const years: number[] = []
  jobs.forEach((job) => {
    if (job.year_from !== -1) years.push(job.year_from)
    if (job.year_to !== -1) years.push(job.year_to)
  })

  const firstYear = Math.min(...years)

  if (!firstYear) {
    return
  }

  return `${new Date().getFullYear() - firstYear} år`
}
