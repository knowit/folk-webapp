import useSWR from 'swr'
import {
  getCustomerCards,
  getEmployeesByCustomer,
  getHoursBilledPerCustomerCharts,
  getHoursBilledPerWeekCharts,
} from './customerApi'
import { CustomerCardData } from './customerApiTypes'

export const useCustomerCards = () => {
  const { data } = useSWR('/customerCards', getCustomerCards, {
    revalidateOnFocus: false,
  })
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

export const useAllCustomerData = (): CustomerCardData[] => {
  const { data: hoursBilledPerCustomer } = useHoursBilledPerCustomerCharts()
  return (
    hoursBilledPerCustomer?.data?.map(
      (cd): CustomerCardData => ({
        customer: cd.customer,
        accountManager: undefined,
        consultantsLastPeriod: 0,
        consultantsLastLongPeriod: 0,
        billedLastPeriod: 0,
        billedLastLongPeriod: 0,
        billedTotal: 0,
      })
    ) || []
  )
}

export const useHoursBilledPerWeekCharts = () =>
  useSWR('/hoursBilledPerWeekCharts', getHoursBilledPerWeekCharts, {
    revalidateOnFocus: false,
  })
