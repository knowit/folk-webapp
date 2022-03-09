import { getAtApi } from '../../client'
import { BarChartDataResponse, RadarChartDataResponse } from '../chartResponses'
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
export const getEmployeeMotivationAndCompetenceBar = (
  url: string,
  email: string
) =>
  getAtApi<BarChartDataResponse>(
    '/v2/employees/employeeMotivationAndCompetence/bar',
    {
      params: { email },
    }
  )

export const getEmployeeMotivationAndCompetenceRadar = (
  url: string,
  email: string
) =>
  getAtApi<RadarChartDataResponse>(
    '/v2/employees/employeeMotivationAndCompetence/radar',
    {
      params: { email },
    }
  )
