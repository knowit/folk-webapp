import useSWR from 'swr'
import {
  getCustomerCards,
  getHoursBilledPerCustomer,
  getHoursBilledPerWeek,
} from './customerApi'

export const useCustomerCards = () =>
  useSWR('/customerCardCacheKey', getCustomerCards, {
    revalidateOnFocus: false,
  })

export const useHoursBilledPerCustomer = () =>
  useSWR('/hoursBilledPerCustomerCacheKey', getHoursBilledPerCustomer, {
    revalidateOnFocus: false,
  })

export const useHoursBilledPerWeek = () =>
  useSWR('/hoursBilledPerWeekCacheKey', getHoursBilledPerWeek, {
    revalidateOnFocus: false,
  })
