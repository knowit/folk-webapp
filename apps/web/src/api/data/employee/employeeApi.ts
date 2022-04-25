import { getAtApiV2 } from '../../client'
import { ChartData } from '../chartTypes'
import {
  EmployeeCompetenceResponse,
  EmployeeProfileResponse,
  EmployeeTableResponse,
} from './employeeApiTypes'

export const getEmployeeTable = () =>
  getAtApiV2<EmployeeTableResponse[]>('/employees/employeeTable')

export const getEmployeeProfile = (url: string, email: string) =>
  getAtApiV2<EmployeeProfileResponse>(`/employees/employeeProfile`, {
    params: { email },
  })

export const getEmployeeCompetence = (url: string, email: string) =>
  getAtApiV2<EmployeeCompetenceResponse>(`/employees/employeeCompetence`, {
    params: { email },
  })

export const getEmployeeMotivationAndCompetenceCharts = (
  url: string,
  email: string
) =>
  getAtApiV2<ChartData>('/employees/employeeMotivationAndCompetence', {
    params: { email },
  })
