import { getDataAt } from '../dataClient'
import { EmployeeTableResponse } from './employeeApiTypes'

export const getEmployeeTable = async () =>
  await getDataAt<EmployeeTableResponse>('/employeeTable')
