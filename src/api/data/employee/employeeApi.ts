import { CompetenceAreasResponse } from '../competence/competenceApiTypes'
import { getDataAt } from '../dataClient'
import {
  EmpDataResponse,
  EmployeeExperienceResponse,
  EmployeeTableResponse,
} from './employeeApiTypes'

export const getEmployeeTable = () =>
  getDataAt<EmployeeTableResponse>('/employeeTable')

// ! This might not be typed correctly
export const getEmployeeExperience = (url: string, user_id: string) =>
  getDataAt<EmployeeExperienceResponse>('/employeeExperience', {
    params: { user_id },
  })

// ! This might not be typed correctly
export const getEmployeeRadar = (url: string, email: string) =>
  getDataAt<CompetenceAreasResponse>('/employeeRadar', { params: { email } })

// ! This might not be typed correctly
export const getEmpData = (url: string, email: string) =>
  getDataAt<EmpDataResponse>('/empData', {
    params: {
      email,
    },
  })
