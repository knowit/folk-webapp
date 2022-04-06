import { getAtApi, getAtApiV2 } from '../../client'
import { ChartData } from '../chartTypes'
import { CompetenceAreasResponse } from '../competence/competenceApiTypes'
import {
  EmployeeExperienceResponse,
  EmployeeProfileResponse,
  EmployeeTableResponse,
} from './employeeApiTypes'

export const getEmployeeTable = () =>
  getAtApi<EmployeeTableResponse[]>('/data/employeeTable')

export const getEmployeeProfile = (url: string, email: string) =>
  getAtApi<EmployeeProfileResponse>(`/data/employeeProfile`, {
    params: { email },
  })

export const getEmployeeExperience = (url: string, user_id: string) =>
  getAtApi<EmployeeExperienceResponse>(`/data/employeeExperience`, {
    params: { user_id },
  })

// ! This might not be typed correctly
export const getEmployeeRadar = (url: string, email: string) =>
  getAtApi<CompetenceAreasResponse>(`/data/employeeRadar`, {
    params: { email },
  })

// API V2
export const getEmployeeMotivationAndCompetence = (
  url: string,
  email: string
) =>
  getAtApiV2<ChartData>('/employees/employeeMotivationAndCompetence', {
    params: { email },
  })
