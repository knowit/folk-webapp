import { CvLinks, EmployeeInfo } from '../employees/employeesTypes'
import { TableRow } from '../datatypes/typeData'

export interface BilledCustomerHours {
  customer: string
  employees: number
  hours: number
  reg_period: number
  timestamp: number
}

export interface EmployeeWithPrimaryCustomer {
  user_id: string
  guid: string
  navn: string
  title?: string
  link: string
  email: string
  image_key?: string
  customer_name: string
  work_order_description: string
}

export interface CustomerWithEmployees {
  customer_name: string
  employees: EmployeeForCustomerList[]
}

export type EmployeeForCustomerList = TableRow<EmployeeForCustomerListRowData>

export type EmployeeForCustomerListRowData = [
  employeeInfo: EmployeeInfo,
  jobTitle: string | null,
  customerAndProject: string,
  cvLinks: CvLinks
]

export type CustomerCardsData = {
  customer: string
  accountManager: string | undefined
  consultantsLastPeriod: number
  consultantsLastLongPeriod: number
  consultantsLongPeriod: string[]
  consultants: string[]
  billedLastPeriod: number
  billedLastLongPeriod: number
  billedTotal: number
}

export type EmployeeCustomersReport = EmployeeCustomers[]
export type EmployeeCustomers = {
  user_id: string
  email: string
  customer: string
  work_order_description: string
  reg_periods: string
}

export interface CustomerCardData {
  customer: string
  consultants: number
  billedLastPeriod: number
  billedTotal: number
}
