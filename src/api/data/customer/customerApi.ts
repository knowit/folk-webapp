import { getAtApi } from '../../client'
import {
  CustomerCardResponse,
  HoursBilledPerCustomerResponse,
  HoursBilledPerWeekResponse,
} from './customerApiTypes'

export const getCustomerCards = () =>
  getAtApi<CustomerCardResponse>('/data/customerCards')

export const getHoursBilledPerCustomer = () =>
  getAtApi<HoursBilledPerCustomerResponse>('/data/hoursBilledPerCustomer')

export const getHoursBilledPerWeek = () =>
  getAtApi<HoursBilledPerWeekResponse>('/data/hoursBilledPerWeek')
