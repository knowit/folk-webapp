import { getAtApiV2 } from '../../client'
import { ChartData } from '../chartTypes'
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

export const getEmployeeMotivationAndCompetenceCharts = (
  url: string,
  email: string
) =>
  getAtApiV2<ChartData>('/employees/employeeMotivationAndCompetence', {
    params: { email },
  })
