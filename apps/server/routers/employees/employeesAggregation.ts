import {
  createCvLinks,
  getCategoryScoresForEmployee,
  getExperienceForEmployee,
  getProjectStatusForEmployee,
  getStorageUrl,
  mapEmployeeTags,
  mapProjectExperience,
  mapWorkExperience,
} from './aggregationHelpers'
import {
  BasicEmployeeInformation,
  EmployeeCompetenceResponse,
  EmployeeExperience,
  EmployeeMotivationAndCompetence,
  EmployeeProfileInformation,
  EmployeeProfileResponse,
  EmployeeSkills,
  EmployeeTableResponse,
  EmployeeWorkStatus,
  JobRotationInformation,
  ProjectExperience,
  WorkExperience,
  EmployeeNode,
} from './employeesTypes'
import { EmployeeCustomers } from '../customer/customerTypes'
import { groupBy } from '../../repository/util'

export const aggregateEmployeeTable = (
  basicEmployeeInformation: BasicEmployeeInformation[],
  employeeMotivationAndCompetence: EmployeeMotivationAndCompetence[],
  jobRotationInformation: JobRotationInformation[],
  employeeWorkStatus: EmployeeWorkStatus[]
): EmployeeTableResponse => {
  return basicEmployeeInformation.map((employee) => {
    const [motivationScores, competenceScores] = getCategoryScoresForEmployee(
      employee.email,
      employeeMotivationAndCompetence
    )
    return {
      rowId: employee.email,
      rowData: [
        {
          user_id: employee.user_id,
          name: employee.name,
          email: employee.email,
          image_url: getStorageUrl(employee.image_key),
        },
        employee.title || 'Ansatt',
        getProjectStatusForEmployee(
          jobRotationInformation,
          employeeWorkStatus,
          employee.guid
        ),
        {
          customer: employee.primary_customer,
          workOrderDescription: employee.primary_work_order_description,
        },
        createCvLinks(employee.link),
        motivationScores,
        competenceScores,
      ],
    }
  })
}

export const aggregateEmployeeCompetence = (
  employeeProfileInformation: EmployeeProfileInformation[],
  employeeSkills: EmployeeSkills[],
  workExperience: WorkExperience[],
  projectExperience: ProjectExperience[],
  employeeExperience: EmployeeExperience[]
): EmployeeCompetenceResponse => {
  if (employeeProfileInformation.length === 0) {
    return
  }

  const employee = employeeProfileInformation[0]

  return {
    email: employee.email,
    degree: employee.degree,
    manager: employee.manager,
    tags: mapEmployeeTags(employeeSkills[0]),
    workExperience: mapWorkExperience(workExperience),
    projectExperience: mapProjectExperience(projectExperience),
    employeeExperience: getExperienceForEmployee(
      employee.email,
      employeeExperience
    ),
  }
}

export const aggregateEmployeeCompetenceAndMotivation = (
  data: EmployeeMotivationAndCompetence[]
) => {
  const categoriesMap = { Hovedkategorier: {} }

  data.forEach((row) => {
    const {
      category,
      subCategory,
      categoryCompetenceAvg,
      categoryMotivationAvg,
      competence: subCategoryCompetence,
      motivation: subCategoryMotivation,
    } = row

    if (!(category in categoriesMap)) {
      categoriesMap[category] = {}
    }

    categoriesMap[category][subCategory] = {
      category: subCategory,
      motivation: subCategoryMotivation,
      competence: subCategoryCompetence,
    }

    categoriesMap['Hovedkategorier'][category] = {
      category,
      motivation: categoryMotivationAvg,
      competence: categoryCompetenceAvg,
    }
  })

  const output = {}
  for (const category of Object.keys(categoriesMap)) {
    output[category] = Object.values(categoriesMap[category])
  }

  return output
}

export const aggregateEmployeeProfile = (
  employeeProfileInformation: EmployeeProfileInformation[],
  employeeSkills: EmployeeSkills[],
  workExperience: WorkExperience[],
  projectExperience: ProjectExperience[],
  employeeCustomers: EmployeeCustomers[]
): EmployeeProfileResponse => {
  if (employeeProfileInformation.length === 0) {
    return
  }

  const employee = employeeProfileInformation[0]

  return {
    user_id: employee.user_id,
    email: employee.email,
    name: employee.name,
    title: employee.title,
    phone: employee.phone,
    degree: employee.degree,
    manager: employee.manager,
    image: getStorageUrl(employee.image_key),
    tags: mapEmployeeTags(employeeSkills[0]),
    links: createCvLinks(employee.link),
    workExperience: mapWorkExperience(workExperience),
    projectExperience: mapProjectExperience(projectExperience),
    customers: employeeCustomers.map((customer) => ({
      customer: customer.customer,
      workOrderDescription: customer.work_order_description,
    })),
  }
}

function buildHierarchy(
  employees: Record<string, EmployeeProfileInformation[]>,
  employee: EmployeeProfileInformation
): EmployeeNode {
  const children: EmployeeNode[] = []
  for (const email in employees) {
    const potentialChild = employees[email][0]
    if (potentialChild.manager_email === employee.email) {
      children.push(buildHierarchy(employees, potentialChild))
    }
  }
  return children.length ? { employee, children } : { employee }
}

function transformEmployees(
  employees: Record<string, EmployeeProfileInformation[]>
): EmployeeNode {
  for (const email in employees) {
    const employee = employees[email][0]
    if (!employee.manager_email) {
      return buildHierarchy(employees, employee)
    }
  }
}

export const aggregateStructure = (
  employeeStructureResponse: EmployeeProfileInformation[]
): EmployeeNode => {
  const groupedByEmail = groupBy(employeeStructureResponse, (i) => i.email)

  const rootNode = transformEmployees(groupedByEmail)

  return rootNode
}
