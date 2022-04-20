import { getAtApi, getAtApiV2 } from '../../client'
import {
  BarChartData,
  MultipleChartResponse,
  RadarChartData,
} from '../chartResponses'
import { CompetenceAreasResponse } from '../competence/competenceApiTypes'
import {
  EmployeeCompetenceResponse,
  EmployeeProfileResponse,
  EmployeeTableResponse,
} from './employeeApiTypes'

export const getEmployeeTable = () =>
  getAtApiV2<EmployeeTableResponse>('/employees/employeeTable')

export const getEmployeeProfile = (url: string, email: string) =>
  getAtApiV2<EmployeeProfileResponse>(`/employees/employeeProfile`, {
    params: { email },
  })

export const getEmployeeCompetence = (url: string, email: string) =>
  getAtApiV2<EmployeeCompetenceResponse>(`/employees/employeeCompetence`, {
    params: { email },
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
  getAtApiV2<MultipleChartResponse<BarChartData>>(
    '/employees/employeeMotivationAndCompetence/bar',
    {
      params: { email },
    }
  )

export const getEmployeeMotivationAndCompetenceRadar = (
  url: string,
  email: string
) =>
  getAtApiV2<MultipleChartResponse<RadarChartData>>(
    '/employees/employeeMotivationAndCompetence/radar',
    {
      params: { email },
    }
  )
