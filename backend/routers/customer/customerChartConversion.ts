import { BarChartData } from '../chartTypes'
import { BilledCustomerHours } from './customerTypes'

export const hoursBilledPerCustomerBar = (data: BilledCustomerHours[]) => {
  const aggregatedData = {}

  for (const { customer, hours } of data) {
    if (!(customer in aggregatedData)) {
      aggregatedData[customer] = { customer, hours }
    } else {
      aggregatedData[customer].hours += hours
    }
  }

  return {
    indexBy: 'customer',
    keys: ['hours'],
    data: Object.values(aggregatedData),
  } as BarChartData
}
