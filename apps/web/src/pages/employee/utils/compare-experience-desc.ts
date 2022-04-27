import {
  ProjectExperience,
  WorkExperience,
} from '../../../api/data/employee/employeeApiTypes'

type Experience = ProjectExperience | WorkExperience

export function compareExperienceDesc(
  experienceA: Experience,
  experienceB: Experience
) {
  const aDate = createComparableDate(experienceA)
  const bDate = createComparableDate(experienceB)
  return bDate.valueOf() - aDate.valueOf()
}

function createComparableDate(experience: Experience) {
  const { year_from, month_from, year_to, month_to } = experience
  if (!year_to || year_to <= 0) {
    return new Date(year_from, month_from)
  }
  return new Date(year_to, month_to)
}
