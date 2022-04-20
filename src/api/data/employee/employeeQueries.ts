import useSWR from 'swr'
import {
  getEmployeeProfile,
  getEmployeeCompetence,
  getEmployeeRadar,
  getEmployeeTable,
  getEmployeeMotivationAndCompetenceBar,
  getEmployeeMotivationAndCompetenceRadar,
} from './employeeApi'

export const useEmployeeTable = () =>
  useSWR('/employeeTable', getEmployeeTable, {
    revalidateOnFocus: false,
  })

export const useEmployeeProfile = (email: string) =>
  useSWR(['/employeeProfile', email], getEmployeeProfile, {
    revalidateOnFocus: false,
  })

export const useEmployeeCompetence = (email: string) =>
  useSWR(['/employeeCompetence', email], getEmployeeCompetence, {
    revalidateOnFocus: false,
  })

/**
 * @param email Optional parameter, SWR waits until it is defined to fetch data
 */
export const useEmployeeRadar = (email?: string) =>
  useSWR(email ? ['/employeeRadar', email] : null, getEmployeeRadar, {
    revalidateOnFocus: false,
  })

// API V2
/**
 * @param email Optional parameter, SWR waits until it is defined to fetch data
 */
export const useEmployeeMotivationAndCompetenceBar = (email?: string) =>
  useSWR(
    email ? ['/employeeMotivationAndCompetenceBar', email] : null,
    getEmployeeMotivationAndCompetenceBar,
    {
      revalidateOnFocus: false,
    }
  )

/**
 * @param email Optional parameter, SWR waits until it is defined to fetch data
 */
export const useEmployeeMotivationAndCompetenceRadar = (email?: string) =>
  useSWR(
    email ? ['/employeeMotivationAndCompetenceRadar', email] : null,
    getEmployeeMotivationAndCompetenceRadar,
    {
      revalidateOnFocus: false,
    }
  )
