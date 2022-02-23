import { v4 as uuid } from 'uuid'
import {
  cvs,
  findProjectStatusForEmployee,
  getCategoryScoresForEmployee,
  getStorageUrl,
  mergeEmployees,
} from './aggregationHelpers'
import { EmployeeExperience } from './employeesTypes'

export const aggregateEmployeeTable = (
  employeeInformation,
  employeeMotivationAndCompetence,
  jobRotationInformation
) => {
  const mergedEmployees = mergeEmployees(employeeInformation)
  return mergedEmployees.map((employee) => ({
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
      employee.customerArray.reduce((prevCustomer, thisCustomer) => {
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

// export const aggregateEmployeeRadar = (data: any) => {
//   const categoriesMap = { mainCategories: {} }
//   data.forEach((row) => {
//     const {
//       category,
//       subCategory,
//       categoryCompetenceAvg,
//       categoryMotivationAvg,
//       competence,
//       motivation,
//     } = row
//     if (!(category in categoriesMap)) {
//       categoriesMap[category] = {}
//     }
//     categoriesMap[category][subCategory] = {
//       category: subCategory,
//       motivation,
//       competence,
//     }
//     categoriesMap['mainCategories'][category] = {
//       category,
//       motivation: categoryMotivationAvg,
//       competence: categoryCompetenceAvg,
//     }
//   })
//   const output = {}
//   for (const category of Object.keys(categoriesMap)) {
//     output[category] = Object.values(categoriesMap[category])
//   }
//   return {
//     setNames: Object.keys(output),
//     sets: output,
//   }
// }

export const aggregateEmployeeCompetenceAndMotivation = (data: any) => {
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

export const aggregateEmpData = (
  employeeSkills,
  workExperience,
  employeeInformation
) => {
  const emp = mergeEmployees(employeeInformation)[0]

  return {
    email_id: emp.email,
    user_id: emp.user_id,
    employee: emp,
    image: getStorageUrl(emp.image_key),
    workExperience: workExperience,
    tags: employeeSkills[0],
    degree: employeeInformation[0].degree,
    manager: employeeInformation[0].manager,
    links: Object.fromEntries(
      cvs.map(([lang, format]) => [
        `${lang}_${format}`,
        emp.link.replace('{LANG}', lang).replace('{FORMAT}', format),
      ])
    ),
    customerArray: emp.customerArray,
  }
}
