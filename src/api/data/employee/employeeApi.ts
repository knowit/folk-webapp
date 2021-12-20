import { getDataAt } from '../dataClient'
import { EmployeeTableResponse } from './employeeApiTypes'

export const getEmployeeTable = async () =>
  await getDataAt<EmployeeTableResponse>('/employeeTable')

// TODO: Type correctly
export const getEmployeeExperience = async (user_id: string) =>
  await getDataAt<any>('/employeeExperience', { params: { user_id } })

// TODO: Type correctly
export const getEmpData = async (email: string) =>
  await getDataAt<any>('/empData', {
    params: {
      email,
    },
  })
