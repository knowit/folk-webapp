import { getAt } from '../../client'
import {
  CustomerCardResponse,
  HoursBilledPerCustomerResponse,
  HoursBilledPerWeekResponse,
} from './customerApiTypes'

export const getCustomerCards = () =>
  getAt<CustomerCardResponse>('/data/customerCards')

export const getHoursBilledPerCustomer = () =>
  getAt<HoursBilledPerCustomerResponse>('/data/hoursBilledPerCustomer')

export const getHoursBilledPerWeek = () =>
  getAt<HoursBilledPerWeekResponse>('/data/hoursBilledPerWeek')
