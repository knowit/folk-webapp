import { CompetenceAreasResponse } from '../competence/competenceApiTypes'
import { getAtApi } from '../../client'
import {
  EmployeeProfileResponse,
  EmployeeExperienceResponse,
  EmployeeTableResponse,
} from './employeeApiTypes'

export const getEmployeeTable = () =>
  getAtApi<EmployeeTableResponse[]>('/data/employeeTable')

// ! This might not be typed correctly
export const getEmployeeExperience = (url: string, userId: string) =>
  getAtApi<EmployeeExperienceResponse>('/data/employeeExperience', {
    params: { user_id: userId },
  })

// ! This might not be typed correctly
export const getEmployeeRadar = (url: string, email: string) =>
  getAtApi<CompetenceAreasResponse>('/data/employeeRadar', {
    params: { email },
  })

export const getEmployeeProfile = (url: string, email: string) =>
  getAtApi<EmployeeProfileResponse>('/data/employeeProfile', {
    params: { email },
  })
