import useSWR from 'swr'
import {
  getCustomerCards,
  getEmployeesByCustomer,
  getHoursBilledPerCustomerCharts,
  getHoursBilledPerWeekCharts,
  getEmployeesPerWeekCharts,
} from './customerApi'

export const useCustomerCards = () =>
  useSWR('/customerCards', getCustomerCards, {
    revalidateOnFocus: false,
  })

export const useEmployeesByCustomer = () =>
  useSWR('/employeesByCustomer', getEmployeesByCustomer, {
    revalidateOnFocus: false,
  })

export const useHoursBilledPerCustomerCharts = () =>
  useSWR('/hoursBilledPerCustomerCharts', getHoursBilledPerCustomerCharts, {
    revalidateOnFocus: false,
  })

export const useHoursBilledPerWeekCharts = () =>
  useSWR('/hoursBilledPerWeekCharts', getHoursBilledPerWeekCharts, {
    revalidateOnFocus: false,
  })

export const useEmployeesPerWeekCharts = () =>
  useSWR('/employeesPerWeekCharts', getEmployeesPerWeekCharts, {
    revalidateOnFocus: false,
  })
