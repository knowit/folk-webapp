import { EmployeeInformation, EmployeeSkills } from './data'
import AWS from 'aws-sdk'
AWS.config.update({ region: 'eu-central-1' })

export const range = (x: number, y: number) =>
  Array.from(
    (function* () {
      while (x <= y) yield x++
    })()
  )

type EmployeeWithMergedCustomers = EmployeeInformation & {
  customers: Customer[]
}

export type Customer = {
  customer: string
  workOrderDescription: string
  weight: number
}

export type ProjectStatus = 'red' | 'green' | 'yellow' | 'orange'

export const getYear = (): number => {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()

  return Number(currentYear)
}

export const getWeek = (): string => {
  const currentDate = new Date()
  const oneJan = new Date(getYear(), 0, 1)
  const numberOfDays = Math.floor(
    (Number(currentDate) - Number(oneJan)) / (24 * 60 * 60 * 1000)
  )
  const currentWeekNumber = Math.floor(
    (currentDate.getDay() + 1 + numberOfDays) / 7
  )

  return currentWeekNumber.toString()
}

/**
 * Receives a list of employees, where each employee is listed once for each
 * customer it is related to. This means that an employee might be listed more
 * than once. The function merges the received employees and returns a list of
 * distinct employees, each with a merged list of their related customers.
 */
export const mergeCustomersForEmployees = (
  employees: EmployeeInformation[]
): EmployeeWithMergedCustomers[] => {
  const employeesWithMergedCustomers = {}

  employees.forEach((employee) => {
    const employeeToMerge =
      employeesWithMergedCustomers[employee.guid] ?? employee
    const customersForEmployee = employeeToMerge.customers ?? []

    if (employee.customer) {
      const thisCustomer = {
        customer: employee.customer,
        workOrderDescription: employee.work_order_description,
        weight: employee.weight,
      }
      customersForEmployee.push(thisCustomer)
    }

    employeesWithMergedCustomers[employee.guid] = {
      ...employeeToMerge,
      customers: customersForEmployee,
    }
  })

  return Object.values(employeesWithMergedCustomers)
}

export function findPrimaryCustomerForEmployee(customers: Customer[]) {
  if (!customers || customers.length === 0) {
    return
  }

  return customers.reduce((prevCustomer, thisCustomer) => {
    if (thisCustomer.weight < prevCustomer.weight) {
      return thisCustomer
    } else {
      return prevCustomer
    }
  })
}

export function mapEmployeeTags(employeeSkills?: EmployeeSkills) {
  const { skill, language, role } = employeeSkills ?? {}

  return {
    skills: skill?.split(';') ?? [],
    languages: language?.split(';') ?? [],
    roles: role?.split(';') ?? [],
  }
}

export const statusColorCode = (
  wantNewProject: number,
  openForNewProject: number,
  inProject: boolean
): ProjectStatus => {
  const projectStatus = inProject ? 'green' : 'red'
  const color = wantNewProject > openForNewProject ? 'yellow' : 'orange'
  const statusColor =
    (wantNewProject || openForNewProject) > 0 ? color : projectStatus

  return statusColor
}

export const sum = (data, property) => {
  return data.reduce((a, b) => {
    return a + b[property]
  }, 0)
}

export function getEventSet(events: { time_from: string; time_to: string }[]) {
  // Finds earliest and latest dates for creating a range of years

  const firstYear = new Date(
    Math.min(...events.map((event) => new Date(event.time_from).getTime()))
  ).getFullYear()
  const lastYear = new Date(
    Math.max(...events.map((event) => new Date(event.time_to).getTime()))
  ).getFullYear()

  const years: number[] = [] // Range of years in dataset, [2015, 2016, 2017, etc...]
  for (let year = firstYear; year <= lastYear; year++) years.push(year)

  const set = []
  years.map((year) =>
    set.push({
      id: year,
      data: [
        { x: 'Jan', y: 0 },
        { x: 'Feb', y: 0 },
        { x: 'Mar', y: 0 },
        { x: 'Apr', y: 0 },
        { x: 'Mai', y: 0 },
        { x: 'Jun', y: 0 },
        { x: 'Jul', y: 0 },
        { x: 'Aug', y: 0 },
        { x: 'Sep', y: 0 },
        { x: 'Okt', y: 0 },
        { x: 'Nov', y: 0 },
        { x: 'Des', y: 0 },
      ],
    })
  )

  events.map((event) => {
    // Gets the start and end times for an event, 2020-01-01 - 2020-02-03
    const [fromDate] = event.time_from.split(' ')
    const [toDate] = event.time_to.split(' ')

    // Returns each month the event spans across. 2020-01-01 - 2020-02-03 would return [1, 2]
    const dates = dateRange(fromDate, toDate)

    const year = parseInt(dates[0].substring(0, 4))
    const numMonths = dates.map((date) => parseInt(date.substring(5, 7)))

    // Stores the year of the event and the spanning months
    const dataObject = {
      year: year,
      months: numMonths,
    }

    // Maps each event to a specific year and increases the event counter for the relevant months
    set.map((i) => {
      if (i.id === dataObject.year) {
        dataObject.months.map((j) => {
          i.data[j - 1].y++
        })
      }
    })
  })

  return set
}

function dateRange(startDate: string, endDate: string) {
  const start = startDate.split('-')
  const end = endDate.split('-')
  const startYear = parseInt(start[0])
  const endYear = parseInt(end[0])
  const dates = []

  for (let i = startYear; i <= endYear; i++) {
    const endMonth = i !== endYear ? 11 : parseInt(end[1]) - 1
    const startMon = i === startYear ? parseInt(start[1]) - 1 : 0
    for (let j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
      const month = j + 1
      const displayMonth = month < 10 ? '0' + month : month
      dates.push([i, displayMonth, '01'].join('-'))
    }
  }

  return dates
}
