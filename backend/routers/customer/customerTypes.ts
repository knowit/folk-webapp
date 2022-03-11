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
