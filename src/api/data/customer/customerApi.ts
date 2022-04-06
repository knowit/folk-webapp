import { getAtApi, getAtApiV2 } from '../../client'
import { BarChartData, LineChartData } from '../chartResponses'
import {
  CustomerCardResponse,
  EmployeesByCustomerResponse,
  HoursBilledPerCustomerResponse,
  HoursBilledPerWeekResponse,
} from './customerApiTypes'

export const getCustomerCards = () =>
  getAtApi<CustomerCardResponse>('/data/customerCards')

export const getEmployeesByCustomer = () =>
  getAtApiV2<EmployeesByCustomerResponse>('/customer/employeesByCustomer')

export const getHoursBilledPerCustomer = () =>
  getAtApi<HoursBilledPerCustomerResponse>('/data/hoursBilledPerCustomer')

export const getHoursBilledPerWeek = () =>
  getAtApi<HoursBilledPerWeekResponse>('/data/hoursBilledPerWeek')

// API V2
export const getHoursBilledPerCustomerCharts = () =>
  getAtApiV2<BarChartData>('/customer/hoursBilledPerCustomer')

export const getHoursBilledPerWeekLine = () =>
  getAtApiV2<LineChartData>('/customer/hoursBilledPerWeek/line')
