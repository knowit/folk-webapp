import { BarChartData, LineChartData } from '../chartTypes'
import { BilledCustomerHours } from './customerTypes'

function getHoursBilledOrEmployeesPerWeek(
  data: BilledCustomerHours[],
  hoursBilled: boolean
): LineChartData['data'] {
  const aggregationMap: Record<string, Record<string, number>> = {}
  const regPeriodsSet = new Set()

  if (hoursBilled) {
    // Build map of customers and aggregate for all weeks
    for (const { customer, reg_period, hours } of data) {
      if (!(customer in aggregationMap)) {
        aggregationMap[customer] = {}
      }

      if (!(reg_period in aggregationMap[customer])) {
        aggregationMap[customer][reg_period] = hours
      } else {
        aggregationMap[customer][reg_period] += hours
      }

      regPeriodsSet.add(reg_period)
    }
  } else {
    // Build map of customers and aggregate for all weeks
    for (const { customer, reg_period, employees } of data) {
      if (!(customer in aggregationMap)) {
        aggregationMap[customer] = {}
      }

      if (!(reg_period in aggregationMap[customer])) {
        aggregationMap[customer][reg_period] = employees
      } else {
        aggregationMap[customer][reg_period] += employees
      }

      regPeriodsSet.add(reg_period)
    }
  }

  const sortedRegPeriods = Array.from(regPeriodsSet).sort()
  const output: LineChartData['data'] = []

  // Generate output fitting desired format
  for (const [customer, values] of Object.entries(aggregationMap)) {
    // Ensure that all weeks are present in the data even if there are no hours billed
    sortedRegPeriods.forEach((regPeriod: string) => {
      if (!(regPeriod in values)) {
        values[regPeriod] = 0
      }
    })

    const dataList = []
    for (const [x, y] of Object.entries(values)) {
      dataList.push({ x, y })
    }

    dataList.sort((a, b) => parseInt(a.x) - parseInt(b.x))

    output.push({ id: customer, data: dataList })
  }
  return output
}

export const hoursBilledPerCustomer = (
  data: BilledCustomerHours[]
): BarChartData => {
  const aggregatedData = {}

  for (const { customer, hours } of data) {
    if (!(customer in aggregatedData)) {
      aggregatedData[customer] = { customer, hours }
    } else {
      aggregatedData[customer].hours += hours
    }
  }

  const weeklyData: LineChartData['data'] = getHoursBilledOrEmployeesPerWeek(
    data,
    true
  )
  const lineChartData: LineChartData = { type: 'LineChart', data: weeklyData }
  const output: BarChartData = {
    type: 'BarChart',
    indexBy: 'customer',
    keys: ['hours'],
    data: Object.values(aggregatedData),
    weeklyData: lineChartData,
  } as BarChartData

  return output
}

export const hoursBilledPerWeek = (
  data: BilledCustomerHours[]
): LineChartData => {
  const output: LineChartData['data'] = getHoursBilledOrEmployeesPerWeek(
    data,
    true
  )

  return { type: 'LineChart', data: output }
}

export const employeesPerWeek = (
  data: BilledCustomerHours[]
): LineChartData => {
  const output: LineChartData['data'] = getHoursBilledOrEmployeesPerWeek(
    data,
    false
  )

  return { type: 'LineChart', data: output }
}
