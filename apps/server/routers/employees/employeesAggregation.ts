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
  EmployeeNode,
  EmployeeProfileInformation,
  EmployeeProfileResponse,
  EmployeeSkills,
  EmployeeTableResponse,
  EmployeeWorkStatus,
  JobRotationInformation,
  ProjectExperience,
  WorkExperience,
} from './employeesTypes'
import { EmployeeCustomers } from '../customer/customerTypes'
import { groupBy } from '../../repository/util'

export const aggregateEmployeeTable = async (
  basicEmployeeInformation: BasicEmployeeInformation[],
  employeeMotivationAndCompetence: EmployeeMotivationAndCompetence[],
  jobRotationInformation: JobRotationInformation[],
  employeeWorkStatus: EmployeeWorkStatus[]
): Promise<EmployeeTableResponse> => {
  const basicEmployeeInformationPromises = basicEmployeeInformation.map(
    async (employee) => {
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
            image_url: await getStorageUrl(employee.image_key),
            role: employee.role,
            city: employee.city,
          },
          employee.title || 'Ansatt',
          getProjectStatusForEmployee(
            jobRotationInformation,
            employeeWorkStatus,
            employee.guid,
            employee.role
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
    }
  )
  let awaitedbasicEmployeeInformationPromises
  await Promise.all(basicEmployeeInformationPromises).then(
    (results) => (awaitedbasicEmployeeInformationPromises = results)
  )

  return awaitedbasicEmployeeInformationPromises
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
      motivation: Math.max(0, subCategoryMotivation),
      competence: Math.max(0, subCategoryCompetence),
    }

    categoriesMap['Hovedkategorier'][category] = {
      category,
      motivation: Math.max(0, categoryMotivationAvg),
      competence: Math.max(0, categoryCompetenceAvg),
    }
  })

  const output = {}
  for (const category of Object.keys(categoriesMap)) {
    output[category] = Object.values(categoriesMap[category])
  }

  return output
}

export const aggregateEmployeeProfile = async (
  employeeProfileInformation: EmployeeProfileInformation[],
  employeeSkills: EmployeeSkills[],
  workExperience: WorkExperience[],
  projectExperience: ProjectExperience[],
  employeeCustomers: EmployeeCustomers[]
): Promise<EmployeeProfileResponse> => {
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
    image: await getStorageUrl(employee.image_key),
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
  employees: EmployeeProfileInformation[],
  parent: EmployeeProfileInformation
): EmployeeNode {
  const children: EmployeeNode[] = []
  employees.map((em) => {
    if (em.manager_email === parent.email) {
      children.push(buildHierarchy(employees, em))
    }
  })

  return children.length ? { employee: parent, children } : { employee: parent }
}

export const aggregateStructure = (
  employeeStructureResponse: EmployeeProfileInformation[]
): EmployeeNode[] => {
  const rootNodes = employeeStructureResponse.filter(
    (em) =>
      !employeeStructureResponse.find((esr) => esr.email === em.manager_email)
  )
  return rootNodes.map((node) =>
    buildHierarchy(employeeStructureResponse, node)
  )
}
