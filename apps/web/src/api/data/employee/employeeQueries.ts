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
  useSWR(
    ['/employeeProfile', email],
    ([url, email]) => getEmployeeProfile(url, email),
    {
      revalidateOnFocus: false,
    }
  )

export const useEmployeeCompetence = (email: string) =>
  useSWR(
    ['/employeeCompetence', email],
    ([url, email]) => getEmployeeCompetence(url, email),
    {
      revalidateOnFocus: false,
    }
  )

/**
 * @param email Optional parameter, SWR waits until it is defined to fetch data
 */
export const useEmployeeMotivationAndCompetenceCharts = (email?: string) =>
  useSWR(
    email ? ['/employeeMotivationAndCompetenceCharts', email] : null,
    ([url, email]) => getEmployeeMotivationAndCompetenceCharts(url, email),
    {
      revalidateOnFocus: false,
    }
  )
