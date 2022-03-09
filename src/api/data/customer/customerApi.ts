import { getAtApi } from '../../client'
import { BarChartData, LineChartData } from '../chartResponses'
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

// API V2
export const getHoursBilledPerCustomerBar = () =>
  getAtApi<BarChartData>('/v2/customer/hoursBilledPerCustomer/bar')

export const getHoursBilledPerWeekLine = () =>
  getAtApi<LineChartData[]>('/v2/customer/hoursBilledPerWeek/line')
