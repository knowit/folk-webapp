import { getAtApi, getAtApiV2 } from '../../client'
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
  getAtApiV2<BarChartData>('/customer/hoursBilledPerCustomer/bar')

export const getHoursBilledPerWeekLine = () =>
  getAtApiV2<LineChartData>('/customer/hoursBilledPerWeek/line')
