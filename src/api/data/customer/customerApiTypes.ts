import { CvLinks } from '../employee/employeeApiTypes'

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

export type EmployeeForCustomerList = {
  rowId: string
  rowData: [
    info: {
      email: string
      value: string // Employee name
      image?: string
      user_id: string
    },
    jobTitle: string | null,
    customerAndProject: string,
    cvLinks: CvLinks
  ]
}

// hoursBilledPerCustomer
interface BilledCustomer {
  kunde: string
  timer: number
}

export interface HoursBilledPerCustomerResponse {
  setNames: string[]
  sets: Record<string, BilledCustomer[]>
}

// hoursBilledPerWeek
interface BilledWeek {
  id: string
  data: { x: number; y: number }[]
}

export interface HoursBilledPerWeekResponse {
  setNames: string[]
  sets: Record<string, BilledWeek[]>
}
