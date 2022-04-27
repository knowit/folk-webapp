import { BarChartData, LineChartData } from '../chartTypes'
import { BilledCustomerHours } from './customerTypes'

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

  return {
    type: 'BarChart',
    indexBy: 'customer',
    keys: ['hours'],
    data: Object.values(aggregatedData),
  }
}

export const hoursBilledPerWeek = (
  data: BilledCustomerHours[]
): LineChartData => {
  const aggregationMap: Record<string, Record<string, number>> = {}

  // Build map of customers and aggregate all hours for all weeks
  for (const { customer, reg_period, hours } of data) {
    if (!(customer in aggregationMap)) {
      aggregationMap[customer] = {}
    }

    if (!(reg_period in aggregationMap[customer])) {
      aggregationMap[customer][reg_period] = hours
    } else {
      aggregationMap[customer][reg_period] += hours
    }
  }

  const output: LineChartData['data'] = []
  // Generate output fitting desired format
  for (const [customer, values] of Object.entries(aggregationMap)) {
    const dataList = []
    for (const [x, y] of Object.entries(values)) {
      dataList.push({ x, y })
    }
    output.push({ id: customer, data: dataList })
  }

  return { type: 'LineChart', data: output }
}
