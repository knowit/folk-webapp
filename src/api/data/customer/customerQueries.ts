import useSWR from 'swr'
import {
  getCustomerCards,
  getHoursBilledPerCustomer,
  getHoursBilledPerWeek,
} from './customerApi'

export const useCustomerCards = () =>
  useSWR('/customerCard', getCustomerCards, {
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
