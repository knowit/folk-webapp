import { CvLinks } from '../employees/employeesTypes'

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

export type EmployeeForCustomerList = {
  rowId: string
  rowData: [
    info: {
      email: string
      value: string // Employee name
      image?: string
      user_id: string
    },
    jobTitle: string | undefined,
    customerAndProject: string,
    cvLinks: CvLinks
  ]
}

export type CustomerCardsData = {
  customer: string
  consultants: number
  billedLastPeriod: number
  billedTotal: number
}
