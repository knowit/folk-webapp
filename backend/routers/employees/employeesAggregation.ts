import {
  mapEmployeeTags,
  getProjectStatusForEmployee,
  getCategoryScoresForEmployee,
  getStorageUrl,
  createCvLinks,
} from './aggregationHelpers'
import {
  BasicEmployeeInformation,
  EmployeeExperience,
  EmployeeProfileInformation,
  EmployeeMotivationAndCompetence,
  EmployeeProfileResponse,
  EmployeeSkills,
  EmployeeTableResponse,
  EmployeeWorkStatus,
  JobRotationInformation,
  WorkExperience,
} from './employeesTypes'
import { EmployeeCustomers } from '../customer/customerTypes'

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
  employeeInformation: EmployeeProfileInformation[],
  employeeCustomers: EmployeeCustomers[]
): EmployeeProfileResponse => {
  if (employeeInformation.length === 0) {
    return
  }

  const employee = employeeInformation[0]

  return {
    user_id: employee.user_id,
    email: employee.email,
    name: employee.name,
    title: employee.title,
    phone: employee.phone,
    degree: employee.degree,
    manager: employee.manager,
    image: getStorageUrl(employee.image_key),
    workExperience,
    tags: mapEmployeeTags(employeeSkills[0]),
    links: createCvLinks(employee.link),
    customers: employeeCustomers.map((customer) => ({
      customer: customer.customer,
      workOrderDescription: customer.work_order_description,
    })),
  }
}
