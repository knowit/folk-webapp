import useSWR from 'swr'
import { getEmployeeTable } from './employeeApi'

export const useEmployeeTable = () =>
  useSWR('/employeeTableCacheKey', getEmployeeTable, {
    revalidateOnFocus: false,
  })
