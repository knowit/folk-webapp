import useSWR from 'swr'
import {
  getEmployeeCompetence,
  getEmployeeCompetenceScoreCharts,
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
  useSWR(
    { url: '/employeeProfile', email: email },
    (params) => getEmployeeProfile(params.email),
    {
      revalidateOnFocus: false,
    }
  )

export const useEmployeeCompetence = (email: string) =>
  useSWR(
    { url: '/employeeCompetence', email: email },
    (params) => getEmployeeCompetence(params.email),
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
    email
      ? { url: '/employeeMotivationAndCompetenceCharts', email: email }
      : null,
    (params) => getEmployeeMotivationAndCompetenceCharts(params.email),
    {
      revalidateOnFocus: false,
    }
  )

export const useEmployeeStructure = () =>
  useSWR('/employeeStructure', getEmployeeStructure, {
    revalidateOnFocus: false,
  })

export const useEmployeeCompetenceScoreCharts = (email?: string) =>
  useSWR(
    email ? { url: '/employeeCompetenceScoreCharts', email: email } : null,
    (params) => getEmployeeCompetenceScoreCharts(params.email),
    {
      revalidateOnFocus: false,
    }
  )
