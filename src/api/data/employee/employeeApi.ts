import { CompetenceAreasResponse } from '../competence/competenceApiTypes'
import { getAtApi } from '../../client'
import {
  EmployeeProfileResponse,
  EmployeeExperienceResponse,
  EmployeeTableResponse,
} from './employeeApiTypes'

export const getEmployeeTable = () =>
  getAtApi<EmployeeTableResponse[]>('/data/employeeTable')

export const getEmployeeProfile = (endpoint: string, email: string) =>
  getAtApi<EmployeeProfileResponse>(`/data${endpoint}`, {
    params: { email },
  })

export const getEmployeeExperience = (endpoint: string, user_id: string) =>
  getAtApi<EmployeeExperienceResponse>(`/data${endpoint}`, {
    params: { user_id },
  })

// ! This might not be typed correctly
export const getEmployeeRadar = (endpoint: string, email: string) =>
  getAtApi<CompetenceAreasResponse>(`/data${endpoint}`, {
    params: { email },
  })
