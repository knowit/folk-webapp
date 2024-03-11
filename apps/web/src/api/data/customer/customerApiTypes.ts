import { ConsultantInfo, CvLinks } from '../employee/employeeApiTypes'
import { TableRow } from '../tableResponses'

// customerCards
export interface CustomerCardData {
  customer: string
  accountManager: string | undefined
  consultantsLastPeriod: number
  consultantsLastLongPeriod: number
  billedLastPeriod: number
  billedLastLongPeriod: number
  billedTotal: number
}

export type CustomerCardResponse = CustomerCardData[]

// employeesByCustomer (for CustomerList)
export type EmployeesByCustomerResponse = CustomerWithEmployees[]

export interface CustomerWithEmployees {
  customer_name: string
  employees: EmployeeForCustomerList[]
}

export interface CustomerWithAccordion extends CustomerWithEmployees {
  accordion: JSX.Element
}

export type EmployeeForCustomerList = TableRow<CustomerListTableRowData>

export type CustomerListTableRowData = [
  info: ConsultantInfo,
  jobTitle: string | null,
  customerAndProject: string,
  cvLinks: CvLinks
]
