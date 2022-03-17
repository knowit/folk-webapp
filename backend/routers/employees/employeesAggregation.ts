import { v4 as uuid } from 'uuid'
import {
  mapEmployeeTags,
  findCustomerWithHighestWeight,
  findProjectStatusForEmployee,
  getCategoryScoresForEmployee,
  getStorageUrl,
  mergeCustomersForEmployees,
  createCvLinks,
} from './aggregationHelpers'
import {
  EmployeeExperience,
  EmployeeInformation,
  EmployeeMotivationAndCompetence,
  EmployeeProfileResponse,
  EmployeeSkills,
  WorkExperience,
} from './employeesTypes'

export const aggregateEmployeeTable = (
  employeeInformation,
  employeeMotivationAndCompetence,
  jobRotationInformation
) => {
  const employeesWithMergedCustomers =
    mergeCustomersForEmployees(employeeInformation)
  return employeesWithMergedCustomers.map((employee) => ({
    rowId: uuid(),
    rowData: [
      {
        value: employee.navn,
        image: getStorageUrl(employee.image_key),
        competenceUrl: `/api/data/employeeCompetence?email=${encodeURIComponent(
          employee.email
        )}`,
        email: employee.email,
        email_id: employee.email,
        user_id: employee.user_id,
        degree: employee.degree,
      },
      employee.title,
      findProjectStatusForEmployee(jobRotationInformation, employee.email),
      findCustomerWithHighestWeight(employee.customers),
      createCvLinks(employee.link),
      getCategoryScoresForEmployee(
        employee.email,
        employeeMotivationAndCompetence
      )[0],
      getCategoryScoresForEmployee(
        employee.email,
        employeeMotivationAndCompetence
      )[1],
    ],
  }))
}

export const aggregateEmployeeExperience = (data: EmployeeExperience[]) => {
  const formatTime = (year: number, month: number) =>
    [
      year && year > 0 ? year : '',
      year && year > 0 && month && month > 0 ? `/${month}` : '',
    ].join('')

  return {
    name: data.length > 0 ? data[0].navn : '',
    experience: data.reverse().map((exp) => ({
      customer: exp.customer,
      project: exp.description,
      time_from: formatTime(exp.year_from, exp.month_from),
      time_to: formatTime(exp.year_to, exp.month_to),
    })),
  }
}

export const aggregateEmployeeCompetenceAndMotivation = (
  data: EmployeeMotivationAndCompetence[]
) => {
  const categoriesMap = { mainCategories: {} }

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

    categoriesMap['mainCategories'][category] = {
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
  employeeSkills: EmployeeSkills[],
  workExperience: WorkExperience[],
  employeeInformation: EmployeeInformation[]
): EmployeeProfileResponse => {
  if (employeeInformation.length === 0) {
    return
  }

  const employee = mergeCustomersForEmployees(employeeInformation)[0]

  return {
    user_id: employee.user_id,
    guid: employee.guid,
    navn: employee.navn,
    manager: employee.manager,
    title: employee.title,
    degree: employee.degree,
    email: employee.email,
    image: getStorageUrl(employee.image_key),
    customers: employee.customers,
    workExperience,
    tags: mapEmployeeTags(employeeSkills[0]),
    links: createCvLinks(employee.link),
  }
}
