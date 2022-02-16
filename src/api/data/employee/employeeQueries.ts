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

export const useEmployeeExperience = (user_id: string) =>
  useSWR(['/employeeExperience', user_id], getEmployeeExperience, {
    revalidateOnFocus: false,
  })

export const useEmployeeProfile = (email: string) =>
  useSWR(['/employeeProfile', email], getEmployeeProfile, {
    revalidateOnFocus: false,
  })

export const useEmployeeRadar = (email: string) =>
  useSWR(['/employeeRadar', email], getEmployeeRadar, {
    revalidateOnFocus: false,
  })
