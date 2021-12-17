import { getDataAt } from '../dataClient'
import {
  CustomerCardResponse,
  HoursBilledPerCustomerResponse,
  HoursBilledPerWeekResponse,
} from './customerApiTypes'

export const getCustomerCards = async () =>
  await getDataAt<CustomerCardResponse>('/customerCards')

export const getHoursBilledPerCustomer = async () =>
  await getDataAt<HoursBilledPerCustomerResponse>('/hoursBilledPerCustomer')

export const getHoursBilledPerWeek = async () =>
  await getDataAt<HoursBilledPerWeekResponse>('/hoursBilledPerWeek')
