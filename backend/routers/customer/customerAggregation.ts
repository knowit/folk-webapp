import { getStorageUrl, createCvLinks } from '../employees/aggregationHelpers'
import {
  EmployeeForCustomerList,
  CustomerWithEmployees,
  EmployeeWithPrimaryCustomer,
} from './customerTypes'

export function groupEmployeesByCustomer(
  employeesWithPrimaryCustomer: EmployeeWithPrimaryCustomer[]
): CustomerWithEmployees[] {
  const customersWithEmployees: Record<string, EmployeeForCustomerList[]> = {}

  employeesWithPrimaryCustomer.forEach((employee) => {
    const { customer_name } = employee
    if (!customersWithEmployees[customer_name]) {
      customersWithEmployees[customer_name] = []
    }
    const employeeRow = createEmployeeForCustomerList(employee)
    customersWithEmployees[customer_name].push(employeeRow)
  })

  return Object.entries(customersWithEmployees).map(
    ([customerName, employees]) => ({
      customer_name: customerName,
      employees,
    })
  )
}

function createEmployeeForCustomerList(
  employee: EmployeeWithPrimaryCustomer
): EmployeeForCustomerList {
  return {
    rowId: employee.email,
    rowData: [
      {
        name: employee.navn,
        email: employee.email,
        image_url: getStorageUrl(employee.image_key),
      },
      employee.title,
      `${employee.customer_name}: ${employee.work_order_description}`,
      createCvLinks(employee.link),
    ],
  }
}
