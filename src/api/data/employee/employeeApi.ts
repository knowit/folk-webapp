import { CompetenceAreasResponse } from '../competence/competenceApiTypes'
import { getAt } from '../../client'
import {
  EmpDataResponse,
  EmployeeExperienceResponse,
  EmployeeTableResponse,
} from './employeeApiTypes'

export const getEmployeeTable = () =>
  getAt<EmployeeTableResponse>('/data/employeeTable')

// ! This might not be typed correctly
export const getEmployeeExperience = (url: string, userId: string) =>
  getAt<EmployeeExperienceResponse>('/data/employeeExperience', {
    params: { user_id: userId },
  })

// ! This might not be typed correctly
export const getEmployeeRadar = (url: string, email: string) =>
  getAt<CompetenceAreasResponse>('/data/employeeRadar', { params: { email } })

// ! This might not be typed correctly
export const getEmpData = (url: string, email: string) =>
  getAt<EmpDataResponse>('/data/empData', {
    params: {
      email,
    },
  })
