import { v4 as uuid } from 'uuid'
import {
  cvs,
  findProjectStatusForEmployee,
  getCategoryScoresForEmployee,
  getStorageUrl,
  makeCvLink,
  mergeEmployeesByCustomers,
} from './aggregationHelpers'
import {
  EmployeeExperience,
  EmployeeInformation,
  EmployeeProfile,
  EmployeeSkills,
} from './employeesTypes'

export const aggregateEmployeeTable = (
  employeeInformation,
  employeeMotivationAndCompetence,
  jobRotationInformation
) => {
  const employeesWithMergedCustomers =
    mergeEmployeesByCustomers(employeeInformation)
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
      employee.customers.reduce((prevCustomer, thisCustomer) => {
        if (thisCustomer.weight < prevCustomer.weight) {
          return thisCustomer
        } else {
          return prevCustomer
        }
      }),
      Object.fromEntries(
        cvs.map(([lang, format]) => [
          `${lang}_${format}`,
          employee.link.replace('{LANG}', lang).replace('{FORMAT}', format),
        ])
      ),
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

export const aggregateEmployeeRadar = (data: any) => {
  const categoriesMap = { mainCategories: {} }
  data.forEach((row) => {
    const {
      category,
      subCategory,
      categoryCompetenceAvg,
      categoryMotivationAvg,
      competence,
      motivation,
    } = row
    if (!(category in categoriesMap)) {
      categoriesMap[category] = {}
    }
    categoriesMap[category][subCategory] = {
      category: subCategory,
      motivation,
      competence,
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
  return {
    setNames: Object.keys(output),
    sets: output,
  }
}

export const aggregateEmployeeProfile = (
  employeeSkills: EmployeeSkills[],
  workExperience: EmployeeExperience[],
  employeeInformation: EmployeeInformation[]
): EmployeeProfile => {
  const employee = mergeEmployeesByCustomers(employeeInformation)[0]
  const { skill, language, role } = employeeSkills[0] ?? {}
  const { link: cvLinkTemplate, image_key } = employeeInformation[0]

  return {
    ...employee,
    image: getStorageUrl(image_key),
    workExperience,
    tags: {
      skills: skill?.split(';') ?? [],
      languages: language?.split(';') ?? [],
      roles: role?.split(';') ?? [],
    },
    links: {
      no_pdf: makeCvLink('no', 'pdf', cvLinkTemplate),
      int_pdf: makeCvLink('int', 'pdf', cvLinkTemplate),
      no_word: makeCvLink('no', 'word', cvLinkTemplate),
      int_word: makeCvLink('int', 'word', cvLinkTemplate),
    },
  }
}
