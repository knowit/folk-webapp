import useSWR from 'swr'
import {
  getEmployeeCompetence,
  getEmployeeMotivationAndCompetenceCharts,
  getEmployeeProfile,
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

export const useEmployeeCompetence = (email: string) =>
  useSWR(['/employeeCompetence', email], getEmployeeCompetence, {
    revalidateOnFocus: false,
  })

/**
 * @param email Optional parameter, SWR waits until it is defined to fetch data
 */
export const useEmployeeMotivationAndCompetenceCharts = (email?: string) =>
  useSWR(
    email ? ['/employeeMotivationAndCompetenceCharts', email] : null,
    getEmployeeMotivationAndCompetenceCharts,
    {
      revalidateOnFocus: false,
    }
  )
