import useSWR from 'swr'
import {
  getEmpData,
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

// https://stackoverflow.com/questions/54938236/can-you-early-return-with-react-hooks/56976469#56976469
export const useEmpData = (email: string) =>
  useSWR(['/empData', email], getEmpData, {
    revalidateOnFocus: false,
  })

export const useEmployeeRadar = (email: string) =>
  useSWR(['/empData', email], getEmployeeRadar, {
    revalidateOnFocus: false,
  })
