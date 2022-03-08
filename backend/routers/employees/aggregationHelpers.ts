import {
  CategoryScores,
  Customer,
  CvLinks,
  EmployeeInformation,
  EmployeeMotivationAndCompetence,
  EmployeeSkills,
  EmployeeWithMergedCustomers,
  JobRotation,
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

export function findPrimaryCustomerForEmployee(customers: Customer[]) {
  if (!customers || customers.length === 0) {
    return
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

export const findProjectStatusForEmployee = (
  jobRotationEmployees: JobRotation[],
  email: string
): ProjectStatus => {
  const [wantNewProject, openForNewProject]: JobRotationStatus =
    jobRotationStatus(jobRotationEmployees, email)

  const inProjectStatus = false
  const statusColor = statusColorCode(
    wantNewProject,
    openForNewProject,
    inProjectStatus
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

const statusColorCode = (
  wantNewProject: number,
  openForNewProject: number,
  inProject: boolean
): ProjectStatus => {
  const projectStatus = inProject ? 'red' : 'green'
  const color = wantNewProject > openForNewProject ? 'yellow' : 'orange'
  const statusColor =
    (wantNewProject || openForNewProject) > 0 ? color : projectStatus

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

export function createCvLinks(linkTemplate?: string): CvLinks | undefined {
  if (!linkTemplate) {
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
