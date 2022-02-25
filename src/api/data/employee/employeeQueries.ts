import useSWR from 'swr'
import {
  getEmployeeProfile,
  getEmployeeExperience,
  getEmployeeRadar,
  getEmployeeTable,
} from './employeeApi'

export const useEmployeeTable = () =>
  useSWR('/employeeTable', getEmployeeTable, {
    revalidateOnFocus: false,
  })

export const useEmployeeProfile = (email: string) =>
  useSWR(['/employeeProfile', email], getEmployeeProfile, {
    revalidateOnFocus: false,
  })

/**
 * @param user_id Optional parameter, SWR waits until it is defined to fetch data
 */
export const useEmployeeExperience = (user_id?: string) =>
  useSWR(
    user_id ? ['/employeeExperience', user_id] : null,
    getEmployeeExperience,
    {
      revalidateOnFocus: false,
    }
  )

/**
 * @param email Optional parameter, SWR waits until it is defined to fetch data
 */
export const useEmployeeRadar = (email?: string) =>
  useSWR(email ? ['/employeeRadar', email] : null, getEmployeeRadar, {
    revalidateOnFocus: false,
  })
