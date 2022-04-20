import { getAtApiV2 } from '../../client'
import { BarChartData, LineChartData } from '../chartTypes'
import {
  CustomerCardResponse,
  EmployeesByCustomerResponse,
} from './customerApiTypes'

export const getCustomerCards = () =>
  getAtApiV2<CustomerCardResponse>('/customer/customerCards')

export const getEmployeesByCustomer = () =>
  getAtApiV2<EmployeesByCustomerResponse>('/customer/employeesByCustomer')

export const getHoursBilledPerCustomerCharts = () =>
  getAtApiV2<BarChartData>('/customer/hoursBilledPerCustomer')

export const getHoursBilledPerWeekCharts = () =>
  getAtApiV2<LineChartData>('/customer/hoursBilledPerWeek')
