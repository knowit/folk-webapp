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
} from './employeesTypes'
import { EmployeeCustomers } from '../customer/customerTypes'
import { NetworkData, NetworkLink, NetworkNode } from '../chartTypes'
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
        employee.title || null,
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

export const aggregateStructure = (
  employeeStructureResponse: EmployeeProfileInformation[]
): NetworkData => {
  const groupedByEmail = groupBy(employeeStructureResponse, (i) => i.email)

  const color = [
    'rgba(75, 100, 85, 1)',
    'rgba(165, 177, 170, 1)',
    'rgba(183, 222, 189, 1)',
    'rgba(219, 238, 222, 1)',
    'rgba(219, 238, 222, 1)',
  ]

  const findHirearchyLevel = (
    person: EmployeeProfileInformation,
    personsGroupedByEmail: Record<string, EmployeeProfileInformation[]>,
    level = 0
  ): number => {
    const manager = personsGroupedByEmail[person.manager_email]?.[0]
    if (manager) {
      level++
      return findHirearchyLevel(manager, personsGroupedByEmail, level)
    } else {
      return level
    }
  }

  const links: NetworkLink[] = employeeStructureResponse
    .map((singleEmployeeStructure) => ({
      target: singleEmployeeStructure.manager_email,
      source: singleEmployeeStructure.email,
      distance:
        110 + 15 * findHirearchyLevel(singleEmployeeStructure, groupedByEmail),
      color:
        color?.[findHirearchyLevel(singleEmployeeStructure, groupedByEmail)] ||
        color[color.length - 1],
    }))
    .filter((link) => groupedByEmail[link.target])

  const nodes: NetworkNode[] = employeeStructureResponse.map(
    (singleEmployeeStructure) => ({
      id: singleEmployeeStructure.email,
      height: 0,
      size:
        40 - 4 * findHirearchyLevel(singleEmployeeStructure, groupedByEmail),
      color: color[findHirearchyLevel(singleEmployeeStructure, groupedByEmail)],
      name: singleEmployeeStructure.name,
      managerName: singleEmployeeStructure.manager,
      title: singleEmployeeStructure.title,
      image_url: getStorageUrl(singleEmployeeStructure.image_key),
    })
  )

  return {
    nodes,
    links,
  }
}
