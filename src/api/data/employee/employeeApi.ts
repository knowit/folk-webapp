import { getDataAt } from '../dataClient'
import { EmployeeTableResponse } from './employeeApiTypes'

export const getEmployeeTable = () =>
  getDataAt<EmployeeTableResponse>('/employeeTable')

// TODO: Type correctly
export const getEmployeeExperience = (url: string, user_id: string) =>
  getDataAt<any>('/employeeExperience', { params: { user_id } })

// TODO: Type correctly
export const getEmployeeRadar = (url: string, email: string) =>
  getDataAt<any>('/employeeRadar', { params: { email } })

// TODO: Type correctly
export const getEmpData = (url: string, email: string) =>
  getDataAt<any>('/empData', {
    params: {
      email,
    },
  })
