import useSWR from 'swr'
import {
  getEmployeeCompetence,
  getEmployeeExperience,
  getEmployeeMotivationAndCompetenceCharts,
  getEmployeeProfile,
  getEmployeeStructure,
  getEmployeeTable,
} from './employeeApi'

export const useEmployeeTable = () =>
  useSWR('/employeeTable', getEmployeeTable, {
    revalidateOnFocus: false,
  })

export const useEmployeeProfile = (email: string) =>
  useSWR(['/employeeProfile', email], ([email]) => getEmployeeProfile(email), {
    revalidateOnFocus: false,
  })

export const useEmployeeCompetence = (email: string) =>
  useSWR(
    ['/employeeCompetence', email],
    ([url, email]) => getEmployeeCompetence(url, email),
    {
      revalidateOnFocus: false,
    }
  )

export const useEmployeeExperience = (email: string) =>
  useSWR(['/employeeExperience', email], getEmployeeExperience, {
    revalidateOnFocus: false,
  })

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

export const useEmployeeStructure = () =>
  useSWR('/employeeStructure', getEmployeeStructure, {
    revalidateOnFocus: false,
  })
