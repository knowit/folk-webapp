import useSWR from 'swr'
import {
  getCustomerCards,
  getEmployeesByCustomer,
  getHoursBilledPerCustomer,
  getHoursBilledPerCustomerCharts,
  getHoursBilledPerWeek,
  getHoursBilledPerWeekCharts,
} from './customerApi'

export const useCustomerCards = () =>
  useSWR('/customerCard', getCustomerCards, {
    revalidateOnFocus: false,
  })

export const useEmployeesByCustomer = () =>
  useSWR('/employeesByCustomer', getEmployeesByCustomer, {
    revalidateOnFocus: false,
  })

export const useHoursBilledPerCustomer = () =>
  useSWR('/hoursBilledPerCustomer', getHoursBilledPerCustomer, {
    revalidateOnFocus: false,
  })

export const useHoursBilledPerWeek = () =>
  useSWR('/hoursBilledPerWeek', getHoursBilledPerWeek, {
    revalidateOnFocus: false,
  })

// API V2
export const useHoursBilledPerCustomerCharts = () =>
  useSWR('/hoursBilledPerCustomerCharts', getHoursBilledPerCustomerCharts, {
    revalidateOnFocus: false,
  })

export const useHoursBilledPerWeekCharts = () =>
  useSWR('/hoursBilledPerWeekCharts', getHoursBilledPerWeekCharts, {
    revalidateOnFocus: false,
  })
