import useSWR from 'swr'
import {
  getCustomerCards,
  getEmployeesByCustomer,
  getHoursBilledPerCustomerCharts,
  getHoursBilledPerWeekCharts,
} from './customerApi'
import { CustomerData } from '../../../pages/customer/cards/CustomerCard'

export const useCustomerCardsQuery = () =>
  useSWR('/customerCards', getCustomerCards, {
    revalidateOnFocus: false,
  })

export const useCustomerCards = () => {
  const { data } = useCustomerCardsQuery()
  return data || []
}

export const useEmployeesByCustomer = () =>
  useSWR('/employeesByCustomer', getEmployeesByCustomer, {
    revalidateOnFocus: false,
  })

export const useHoursBilledPerCustomerCharts = () =>
  useSWR('/hoursBilledPerCustomerCharts', getHoursBilledPerCustomerCharts, {
    revalidateOnFocus: false,
  })

export const useAllCustomerData = (): CustomerData[] => {
  const { data: hoursBilledPerCustomer } = useHoursBilledPerCustomerCharts()
  return hoursBilledPerCustomer ? hoursBilledPerCustomer?.data : []
}

export const useHoursBilledPerWeekCharts = () =>
  useSWR('/hoursBilledPerWeekCharts', getHoursBilledPerWeekCharts, {
    revalidateOnFocus: false,
  })
