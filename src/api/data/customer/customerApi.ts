import { getDataAt } from '../dataClient'
import {
  CustomerCardResponse,
  HoursBilledPerCustomerResponse,
  HoursBilledPerWeekResponse,
} from './customerApiTypes'

export const getCustomerCards = () =>
  getDataAt<CustomerCardResponse>('/customerCards')

export const getHoursBilledPerCustomer = () =>
  getDataAt<HoursBilledPerCustomerResponse>('/hoursBilledPerCustomer')

export const getHoursBilledPerWeek = () =>
  getDataAt<HoursBilledPerWeekResponse>('/hoursBilledPerWeek')
