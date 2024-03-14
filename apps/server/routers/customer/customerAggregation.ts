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

const addBy =
  <T extends string>(
    key: T
  ): ((acc: number, cp: { [key in T]: number }) => number) =>
  (acc, cp) =>
    acc + cp[key]
const unique = <T>(list: T[]): T[] => [...new Set(list)]
const getPeriods = (ec: EmployeeCustomers) =>
  ec.reg_periods
    .toString()
    .split(';')
    .map((period) => Number(period))
export function createCustomerCardData(
  projects: BilledCustomerHours[],
  employeesCustomer: EmployeeCustomers[],
  accountManagerTable: { customer: string; account_manager: string }[]
): CustomerCardsData[] {
  const accountManagerMap = accountManagerTable.reduce(
    (acc, row) => ({
      ...acc,
      [row.customer]: row.account_manager,
    }),
    {}
  )
  const last_reg_periods = unique(projects.map((o) => o.reg_period))
    .sort()
    .slice(-4)

  const result = unique(projects.map((ec) => ec.customer)).map((customer) => {
    const customerProjects = projects.filter((p) => p.customer === customer)
    const customerEmployees = employeesCustomer.filter(
      (ec) => ec.customer === customer
    )
    const employeesLastPeriod = customerEmployees
      .filter((ce) => getPeriods(ce).includes(last_reg_periods.at(-1)))
      .map((ce) => ce.email)
    const employeesLastLongPeriod = customerEmployees
      .filter((ce) =>
        getPeriods(ce).some((period) => last_reg_periods.includes(period))
      )
      .map((ce) => ce.email)

    return {
      customer,
      accountManager: accountManagerMap[customer],
      billedLastPeriod: customerProjects
        .filter((cp) => cp.reg_period === last_reg_periods.at(-1))
        .reduce(addBy('hours'), 0),
      billedLastLongPeriod: customerProjects
        .filter((cp) => last_reg_periods.includes(cp.reg_period))
        .reduce(addBy('hours'), 0),
      billedTotal: customerProjects.reduce(addBy('hours'), 0),
      consultantsLongPeriod: employeesLastLongPeriod,
      consultants: employeesLastPeriod,
      consultantsLastPeriod: unique(employeesLastPeriod).length,
      consultantsLastLongPeriod: unique(employeesLastLongPeriod).length,
    }
  })

  return result
}
