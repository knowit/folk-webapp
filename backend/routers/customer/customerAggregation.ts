import { getStorageUrl, createCvLinks } from '../employees/aggregationHelpers'
import {
  EmployeeForCustomerList,
  CustomerWithEmployees,
  EmployeeWithPrimaryCustomer,
  CustomerCardsData,
  BilledCustomerHours,
} from './customerTypes'
import { EmployeeInformation } from '../employees/employeesTypes'
import { mergeCustomersForEmployees } from '../employees/aggregationHelpers'

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
        value: employee.navn,
        email: employee.email,
        image: getStorageUrl(employee.image_key),
        user_id: employee.user_id,
      },
      employee.title,
      `${employee.customer_name}: ${employee.work_order_description}`,
      createCvLinks(employee.link),
    ],
  }
}

export function createCustomerCardData(
  projects: BilledCustomerHours[],
  employees: EmployeeInformation[]
): CustomerCardsData[] {
  const results = {}

  projects.forEach((elem) => {
    const curr_el = results[elem.customer]
    if (!curr_el) {
      results[elem.customer] = {
        customer: elem.customer,
        billedLastPeriod: elem.hours,
        billedTotal: elem.hours,
        reg_period: elem.reg_period,
      }
    } else {
      results[elem.customer]['billedTotal'] =
        curr_el['billedTotal'] + elem.hours
      if (elem.reg_period > curr_el['reg_period']) {
        results[elem.customer]['billedLastPeriod'] = elem.hours
        results[elem.customer]['reg_period'] = elem.reg_period
      } else if (elem.reg_period === curr_el['reg_period']) {
        results[elem.customer]['billedLastPeriod'] =
          curr_el['billedLastPeriod'] + elem.hours
      }
    }
  })

  const employeesWithMergedCustomers = mergeCustomersForEmployees(employees)
  const customerList = employeesWithMergedCustomers.map((a) => a.customers)
  Object.keys(results).forEach((customer) => {
    let consultants = 0
    customerList.forEach((customers) => {
      if (customers.find((el) => el.customer === customer)) {
        consultants = consultants + 1
      }
    })
    results[customer]['consultants'] = consultants
  })
  return Object.values(results)
}
