import { createCvLinks, getStorageUrl } from '../employees/aggregationHelpers'
import {
  EmployeeForCustomerList,
  CustomerWithEmployees,
  EmployeeWithPrimaryCustomer,
  CustomerCardsData,
  BilledCustomerHours,
  EmployeeCustomers,
} from './customerTypes'

export async function groupEmployeesByCustomer(
  employeesWithPrimaryCustomer: EmployeeWithPrimaryCustomer[]
): Promise<CustomerWithEmployees[]> {
  const customersWithEmployees: Record<string, EmployeeForCustomerList[]> = {}
  const employeePromises = employeesWithPrimaryCustomer.map(
    async (employee) => {
      const { customer_name } = employee
      if (!customersWithEmployees[customer_name]) {
        customersWithEmployees[customer_name] = []
      }
      const employeeRow = createEmployeeForCustomerList(employee)
      customersWithEmployees[customer_name].push(await employeeRow)
    }
  )
  await Promise.all(employeePromises)

  return Object.entries(customersWithEmployees).map(
    ([customerName, employees]) => ({
      customer_name: customerName,
      employees,
    })
  )
}

async function createEmployeeForCustomerList(
  employee: EmployeeWithPrimaryCustomer
): Promise<EmployeeForCustomerList> {
  return {
    rowId: employee.email,
    rowData: [
      {
        name: employee.navn,
        email: employee.email,
        image_url: await getStorageUrl(employee.image_key),
        user_id: employee.user_id,
      },
      employee.title || 'Ansatt',
      `${employee.customer_name}: ${employee.work_order_description}`,
      createCvLinks(employee.link),
    ],
  }
}

export function createCustomerCardData(
  projects: BilledCustomerHours[],
  employeesCustomer: EmployeeCustomers[]
): CustomerCardsData[] {
  const results = {}

  const last_reg_periods = [
    ...new Set(
      projects.map(function (o) {
        return o.reg_period
      })
    ),
  ]
    .sort()
    .slice(-3)

  projects.forEach((elem) => {
    const curr_el = results[elem.customer]
    if (!curr_el) {
      results[elem.customer] = {
        customer: elem.customer,
        billedLastPeriod: 0,
        billedTotal: 0,
      }
    }
    if (elem.reg_period == last_reg_periods[last_reg_periods.length - 1]) {
      results[elem.customer]['billedLastPeriod'] =
        results[elem.customer]['billedLastPeriod'] + elem.hours
    }
    results[elem.customer]['billedTotal'] =
      results[elem.customer]['billedTotal'] + elem.hours
  })

  Object.keys(results).forEach((customer) => {
    const consultants = new Set()
    employeesCustomer.forEach((employeeCustomer) => {
      if (employeeCustomer.customer == customer) {
        const reg_periods =
          employeeCustomer?.reg_periods
            .toString()
            .split(';')
            .map((period) => Number(period)) || []
        if (last_reg_periods.some((p) => reg_periods.includes(p))) {
          consultants.add(employeeCustomer.user_id)
        }
      }
    })
    if (consultants.size === 0) delete results[customer]
    else results[customer]['consultants'] = consultants.size
  })

  return Object.values(results)
}
