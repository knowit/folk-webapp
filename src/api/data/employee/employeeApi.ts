import { getAtApi, getAtApiV2 } from '../../client'
import { ChartData } from '../chartTypes'
import { CompetenceAreasResponse } from '../competence/competenceApiTypes'
import {
  EmployeeExperienceResponse,
  EmployeeProfileResponse,
  EmployeeTableResponse,
} from './employeeApiTypes'

export const getEmployeeTable = () =>
  getAtApiV2<EmployeeTableResponse[]>('/employees/employeeTable')

export const getEmployeeProfile = (url: string, email: string) =>
  getAtApiV2<EmployeeProfileResponse>(`/employees/employeeProfile`, {
    params: { email },
  })

export const getEmployeeExperience = (url: string, user_id: string) =>
  getAtApiV2<EmployeeExperienceResponse>(`/employees/employeeExperience`, {
    params: { user_id },
  })

// TODO: Fik ordentlig endepunkt for denne
export const getEmployeeRadar = (url: string, email: string) =>
  getAtApi<CompetenceAreasResponse>(`/data/employeeRadar`, {
    params: { email },
  })

export const getEmployeeMotivationAndCompetence = (
  url: string,
  email: string
) =>
  getAtApiV2<ChartData>('/employees/employeeMotivationAndCompetence', {
    params: { email },
  })
