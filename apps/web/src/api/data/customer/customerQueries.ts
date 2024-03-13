import useSWR from 'swr'
import {
  getCustomerCards,
  getEmployeesByCustomer,
  getHoursBilledPerCustomerCharts,
  getHoursBilledPerWeekCharts,
} from './customerApi'

export const useCustomerCards = () => {
  const { data } = useSWR('/customerCards', getCustomerCards, {
    revalidateOnFocus: false,
    keepPreviousData: true,
    revalidateIfStale: false,
  })
  return data || []
}

export const useEmployeesByCustomer = () =>
  useSWR('/employeesByCustomer', getEmployeesByCustomer, {
    revalidateOnFocus: false,
    keepPreviousData: true,
    revalidateIfStale: false,
  })

export const useHoursBilledPerCustomerCharts = () =>
  useSWR('/hoursBilledPerCustomerCharts', getHoursBilledPerCustomerCharts, {
    revalidateOnFocus: false,
    keepPreviousData: true,
    revalidateIfStale: false,
  })

export const useHoursBilledPerWeekCharts = () =>
  useSWR('/hoursBilledPerWeekCharts', getHoursBilledPerWeekCharts, {
    revalidateOnFocus: false,
    keepPreviousData: true,
    revalidateIfStale: false,
  })
