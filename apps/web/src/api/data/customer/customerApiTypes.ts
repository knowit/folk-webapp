import { ConsultantInfo, CvLinks } from '../employee/employeeApiTypes'
import { TableRow } from '../tableResponses'

// customerCards
interface CustomerCardData {
  customer: string
  consultants: number
  billedLastPeriod: number
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
