import {
  CategoryScores,
  Customer,
  EmployeeInformation,
  EmployeeMotivationAndCompetence,
  EmployeeWithMergedCustomers,
  JobRotation,
  JobRotationStatus,
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

export const mergeEmployeesByCustomers = (
  employees: EmployeeInformation[]
): EmployeeWithMergedCustomers[] => {
  const employeesWithMergedCustomers = {}

  employees.forEach((employee) => {
    const thisCustomer: Customer = {
      customer: employee.customer,
      workOrderDescription: employee.work_order_description,
      weight: employee.weight,
    }

    const employeeToMerge: EmployeeWithMergedCustomers =
      employeesWithMergedCustomers[employee.guid] ?? employee
    const customersForEmployee = employeeToMerge.customers ?? []

    employeesWithMergedCustomers[employee.guid] = {
      ...employeeToMerge,
      customers: [thisCustomer, ...customersForEmployee],
    }
  })
  return Object.values(employeesWithMergedCustomers)
}

export const findProjectStatusForEmployee = (
  jobRotationEmployees: JobRotation[],
  email: string
): string => {
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
): string => {
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

export const makeCvLink = (
  lang: string,
  format: string,
  linkTemplate?: string
) => {
  return linkTemplate.replace('{LANG}', lang).replace('{FORMAT}', format)
}
