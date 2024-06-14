import { ChartData } from '@folk/common/types/chartTypes'
import { getAtApiV2 } from '../../client'
import {
  EmployeeCompetenceResponse,
  EmployeeProfileResponse,
  EmployeeTableResponse,
} from './employeeApiTypes'
import {
  EmployeeExperience,
  EmployeeNode,
} from 'server/routers/employees/employeesTypes'

export const getEmployeeTable = () =>
  getAtApiV2<EmployeeTableResponse[]>('/employees/employeeTable')

export const getEmployeeProfile = (email: string) =>
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

export const getEmployeeExperience = (email: string) =>
  getAtApiV2<EmployeeExperience>('/employees/employeeExperience', {
    params: { email },
  })

export const getEmployeeStructure = () => {
  return getAtApiV2<EmployeeNode[]>('/employees/employeeStructure')
}
