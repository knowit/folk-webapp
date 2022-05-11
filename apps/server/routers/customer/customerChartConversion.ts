import { BarChartData, LineChartData } from '../chartTypes'
import { BilledCustomerHours } from './customerTypes'

function aggregateData(data: BilledCustomerHours[]) {
  const aggregatedData = {}
  for (const { customer, reg_period, hours } of data) {
    if (!(customer in aggregatedData)) {
      aggregatedData[customer] = {}
    }
    if (!(reg_period in aggregatedData[customer])) {
      aggregatedData[customer][reg_period] = hours
    } else {
      aggregatedData[customer][reg_period] += hours
    }
  }
  return aggregatedData
}

function formatData(data: Record<string, Record<string, number>>) {
  const output: LineChartData['data'] = []
  for (const [customer, values] of Object.entries(data)) {
    const dataList = []
    for (const [x, y] of Object.entries(values)) {
      dataList.push({ x, y })
    }
    output.push({ id: customer, data: dataList })
  }
  return output
}

export const hoursBilledPerCustomer = (
  data: BilledCustomerHours[]
): BarChartData => {
  // Build map of customers and aggregate all hours for all weeks
  const aggregationMap: Record<string, Record<string, number>> = aggregateData(
    data
  )
  // Generate output fitting desired format
  const output: LineChartData['data'] = formatData(aggregationMap)

  return {
    type: 'BarChart',
    indexBy: 'customer',
    keys: ['hours'],
    data: output,
  }
}

export const hoursBilledPerWeek = (
  data: BilledCustomerHours[]
): LineChartData => {
  // Build map of customers and aggregate all hours for all weeks
  const aggregationMap: Record<string, Record<string, number>> = aggregateData(
    data
  )
  // Generate output fitting desired format
  const output: LineChartData['data'] = formatData(aggregationMap)

  return { type: 'LineChart', data: output }
}
