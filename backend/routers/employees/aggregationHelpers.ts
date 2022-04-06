import {
  CategoryScores,
  CvLinks,
  EmployeeInformation,
  EmployeeMotivationAndCompetence,
  EmployeeSkills,
  EmployeeWithMergedCustomers,
  EmployeeWorkStatus,
  JobRotationInformation,
  JobRotationStatus,
  ProjectStatus,
  Tags,
} from './employeesTypes'

export const getStorageUrl = (key?: string) => {
  if (!key) {
    return
  }
  return `${process.env.STORAGE_URL}/${key}`
}

/**
 * Receives a list of employees, where each employee is listed once for each
 * customer it is related to. This means that an employee might be listed more
 * than once. The function merges the received employees and returns a list of
 * distinct employees, each with a merged list of their related customers.
 */
export const mergeCustomersForEmployees = (
  employees: EmployeeInformation[]
): EmployeeWithMergedCustomers[] => {
  const employeesWithMergedCustomers = {}

  employees.forEach((employee) => {
    const employeeToMerge: EmployeeWithMergedCustomers =
      employeesWithMergedCustomers[employee.guid] ?? employee
    const customersForEmployee = employeeToMerge.customers ?? []

    if (employee.customer) {
      const thisCustomer = {
        customer: employee.customer,
        workOrderDescription: employee.work_order_description,
        weight: employee.weight,
      }
      customersForEmployee.push(thisCustomer)
    }

    employeesWithMergedCustomers[employee.guid] = {
      ...employeeToMerge,
      customers: customersForEmployee,
    }
  })

  return Object.values(employeesWithMergedCustomers)
}

export function mapEmployeeTags(employeeSkills?: EmployeeSkills): Tags {
  const { skill, language, role } = employeeSkills ?? {}

  return {
    skills: skill?.split(';') ?? [],
    languages: language?.split(';') ?? [],
    roles: role?.split(';') ?? [],
  }
}

export const getProjectStatusForEmployee = (
  jobRotationInformation: JobRotationInformation[],
  employeeWorkStatus: EmployeeWorkStatus[],
  guid: string,
  currentRegPeriod: number
): ProjectStatus => {
  const [wantNewProject, openForNewProject] = jobRotationStatus(
    jobRotationInformation,
    guid
  )

  const work = getEmployeeWork(employeeWorkStatus, guid)

  let inProject = false
  let isInternal = false

  if (work) {
    inProject = currentRegPeriod - work.last_reg_period < 5
    isInternal = !work.project_type.toLowerCase().includes('external')
  }

  if ((wantNewProject || openForNewProject) > 0 && inProject) {
    return wantNewProject > openForNewProject
      ? ProjectStatus.WantChange
      : ProjectStatus.OpenForChange
  }

  return !inProject
    ? ProjectStatus.NoProject
    : isInternal
    ? ProjectStatus.InternalProject
    : ProjectStatus.ExternalProject
}

const getYear = (): number => {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()

  return Number(currentYear)
}

const getWeek = (): string => {
  const currentDate = new Date()
  const oneJan = new Date(getYear(), 0, 1)
  const numberOfDays = Math.floor(
    (Number(currentDate) - Number(oneJan)) / (24 * 60 * 60 * 1000)
  )
  const currentWeekNumber = Math.floor(
    (currentDate.getDay() + 1 + numberOfDays) / 7
  )

  return currentWeekNumber.toString()
}

const getEmployeeWork = (
  employeeWorkStatus: EmployeeWorkStatus[],
  guid: string
): EmployeeWorkStatus | undefined => {
  const work = employeeWorkStatus.filter((work) => work.guid === guid)

  if (work.length === 0) return undefined

  return work.reduce((prev: EmployeeWorkStatus, curr: EmployeeWorkStatus) => {
    if (prev.weight_sum === curr.weight_sum) {
      return prev.last_reg_period > curr.last_reg_period ? prev : curr
    }
    return prev.weight_sum < curr.weight_sum ? prev : curr
  })
}

const jobRotationStatus = (
  jobRotationInformation: JobRotationInformation[],
  guid: string
): JobRotationStatus => {
  let wantNewProject,
    openForNewProject = 0

  jobRotationInformation.forEach((employee) => {
    if (employee.guid == guid) {
      employee.index === 1 && (wantNewProject = employee.customscalevalue)
      employee.index === 2 && (openForNewProject = employee.customscalevalue)
    }
  })

  return [wantNewProject, openForNewProject]
}

export const getCategoryScoresForEmployee = (
  employeeEmail: string,
  categoryList: EmployeeMotivationAndCompetence[]
): CategoryScores => {
  const employeeCategories = categoryList.filter(
    (categoryRow) => categoryRow.email === employeeEmail
  )
  const employeeMotivation = {}
  const employeeCompetence = {}
  employeeCategories.forEach((employeeRow) => {
    employeeMotivation[employeeRow.subCategory] = employeeRow.motivation
    employeeCompetence[employeeRow.subCategory] = employeeRow.competence
  })

  return [employeeMotivation, employeeCompetence]
}

export function createCvLinks(linkTemplate: string): CvLinks {
  if (!linkTemplate) {
    // Just to be safe, should not happen
    return
  }
  return {
    no_pdf: createCvLink('no', 'pdf', linkTemplate),
    int_pdf: createCvLink('int', 'pdf', linkTemplate),
    no_word: createCvLink('no', 'word', linkTemplate),
    int_word: createCvLink('int', 'word', linkTemplate),
  }
}

function createCvLink(language: string, format: string, linkTemplate: string) {
  return linkTemplate.replace('{LANG}', language).replace('{FORMAT}', format)
}
