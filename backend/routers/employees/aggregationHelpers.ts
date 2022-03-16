import {
  CategoryScores,
  Customer,
  EmployeeInformation,
  EmployeeMotivationAndCompetence,
  EmployeeSkills,
  EmployeeWithMergedCustomers,
  EmployeeWorkStatus,
  JobRotation,
  JobRotationStatus,
  Tags,
} from './employeesTypes'

export const cvs = [
  ['no', 'pdf'],
  ['int', 'pdf'],
  ['no', 'word'],
  ['int', 'word'],
]

export const getStorageUrl = (key: string) => {
  if (key !== undefined) {
    return `${process.env.STORAGE_URL}/${key}`
  } else {
    return undefined
  }
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

export function findCustomerWithHighestWeight(customers: Customer[]) {
  if (!customers || customers.length === 0) {
    return {}
  }

  return customers.reduce((prevCustomer, thisCustomer) => {
    if (thisCustomer.weight < prevCustomer.weight) {
      return thisCustomer
    } else {
      return prevCustomer
    }
  })
}

export function mapEmployeeTags(employeeSkills?: EmployeeSkills): Tags {
  const { skill, language, role } = employeeSkills ?? {}

  return {
    skills: skill?.split(';') ?? [],
    languages: language?.split(';') ?? [],
    roles: role?.split(';') ?? [],
  }
}

export const getYear = (): number => {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()

  return Number(currentYear)
}

export const getWeek = (): string => {
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

export const findProjectStatusForEmployee = (
  jobRotationEmployees: JobRotation[],
  employeeWorkStatus: EmployeeWorkStatus[],
  guid: string
): string => {
  const currentRegPeriod = parseInt(getYear() + getWeek(), 10)

  const work = getEmployeeWork(employeeWorkStatus, guid)

  const [wantNewProject, openForNewProject]: JobRotationStatus =
    jobRotationStatus(jobRotationEmployees, guid)

  let inProjectStatus = false
  let isInternal = false

  if (work) {
    inProjectStatus = currentRegPeriod - work.last_reg_period < 5
    isInternal = !work.project_type.toLowerCase().includes('external')
  }

  const statusColor = statusColorCode(
    wantNewProject,
    openForNewProject,
    inProjectStatus,
    isInternal
  )

  return statusColor
}

const jobRotationStatus = (
  jobRotations: JobRotation[],
  email: string
): JobRotationStatus => {
  let wantNewProject, openForNewProject: number

  jobRotations.forEach((employee) => {
    if (employee.email == email) {
      employee.index === 1 && (wantNewProject = employee.customscalevalue)
      employee.index === 2 && (openForNewProject = employee.customscalevalue)
    }
  })

  return [wantNewProject, openForNewProject]
}

export const statusColorCode = (
  wantNewProject: number,
  openForNewProject: number,
  inProject: boolean,
  isInternal: boolean
): string => {
  const getProjectColor = (): string => {
    if (!inProject) return 'red'
    if (isInternal) return 'blue'
    return 'green'
  }
  const getNewProjectColor = (): string => {
    if (wantNewProject >= openForNewProject) return 'orange'
    return 'yellow'
  }

  const getStatusColor = (projecStatus: string, newProject: string): string => {
    if (projecStatus === 'red') return projecStatus
    if (wantNewProject > 0 || openForNewProject > 0) return newProject
    return projecStatus
  }

  const projectStatus = getProjectColor()
  const newProject = getNewProjectColor()
  const statusColor = getStatusColor(projectStatus, newProject)

  return statusColor
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

export const makeCvLink = (
  lang: string,
  format: string,
  linkTemplate?: string
) => {
  return linkTemplate?.replace('{LANG}', lang).replace('{FORMAT}', format)
}
