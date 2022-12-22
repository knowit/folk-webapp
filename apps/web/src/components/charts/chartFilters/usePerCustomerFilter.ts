import { SingularChartData } from '../../../../../../packages/folk-common/types/chartTypes'
import { useState } from 'react'
import { FilteredData } from './useFilteredData'

export type PerCustomerFilterOptions =
  | 'Siste uke'
  | 'Siste måned'
  | 'Siste kvartal'
  | 'Hittil i år'
  | 'Totalt'

// Can be used to override date to set an older date, for testing purposes
const overrideDate = new Date(2021, 10, 13)

/** Returns the ISO week of current date or from optional param @fromDate */
function getWeek(fromDate?: Date): number {
  const weekDate = new Date(fromDate ? fromDate : overrideDate || new Date())
  weekDate.setHours(0, 0, 0, 0)
  // Thursday in current week decides the year
  weekDate.setDate(weekDate.getDate() + 3 - ((weekDate.getDay() + 6) % 7))
  // January 4 is always in week 1
  const firstWeek = new Date(weekDate.getFullYear(), 0, 4)
  // Adjust to Thursday in week 1 and count number of weeks from date to week 1
  return (
    1 +
    Math.round(
      ((weekDate.getTime() - firstWeek.getTime()) / 86400000 -
        3 +
        ((firstWeek.getDay() + 6) % 7)) /
        7
    )
  )
}

/** Returns number of first week of current quarter */
function getWeekOfQuarter(): number {
  const currDate = overrideDate || new Date()
  const quarter = Math.ceil(currDate.getMonth() / 3) - 1
  const month = [0, 3, 6, 9][quarter]

  return getWeek(new Date(currDate.getFullYear(), month, 1))
}

/** Returns number of first week of current month */
function getWeekOfMonth(): number {
  const currDate = overrideDate || new Date()

  return getWeek(new Date(currDate.getFullYear(), currDate.getMonth(), 1))
}

/** Returns a list of sequential reg periods (year + week number), starting from @fromWeek to current reg period */
function getRegPeriodsFromWeek(fromWeek: number): string[] {
  const currDate = overrideDate || new Date()
  const currYear = currDate.getFullYear()
  const currWeek = getWeek()
  const length = currWeek - fromWeek + 1
  const weekDates = length
    ? [...new Array(length)].map((_, i) => `${currYear}${fromWeek + i}`)
    : []

  return weekDates
}

function getRegPeriods(filter: PerCustomerFilterOptions): string[] {
  switch (filter) {
    case 'Siste måned':
      return getRegPeriodsFromWeek(getWeekOfMonth())
    case 'Siste kvartal':
      return getRegPeriodsFromWeek(getWeekOfQuarter())
    case 'Hittil i år':
      return getRegPeriodsFromWeek(1)
    default:
      return getRegPeriodsFromWeek(getWeek())
  }
}

const usePerCustomerFilter = (data: SingularChartData): FilteredData => {
  const filterOptions: PerCustomerFilterOptions[] = [
    'Siste uke',
    'Siste måned',
    'Siste kvartal',
    'Hittil i år',
    'Totalt',
  ]

  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0])

  const getFilteredData = (): SingularChartData => {
    const regPeriods = getRegPeriods(selectedFilter)

    if (regPeriods === undefined || regPeriods.length === 0) return data

    if (data && data.type === 'BarChart' && selectedFilter !== 'Totalt') {
      const aggregatedData: { customer: string; hours: number }[] = []

      data.data.forEach((customer) => {
        if (aggregatedData.indexOf(customer) < 0) {
          aggregatedData.push({ customer: customer.customer, hours: 0 })
          if (data.weeklyData) {
            const currentCustomer = data.weeklyData.data.find(
              (item) => item.id === customer.customer
            )
            currentCustomer?.data.forEach((regPeriod) => {
              if (regPeriods.includes(regPeriod.x)) {
                const customerIndex = aggregatedData.findIndex(
                  (c) => c.customer === currentCustomer.id
                )
                aggregatedData[customerIndex].hours += regPeriod.y
              }
            })
          }
        }
      })

      const filteredData = aggregatedData
        .filter((customer) => customer.hours !== 0)
        .sort((a, b) => (a.hours < b.hours ? 1 : -1))

      return {
        type: data.type,
        indexBy: data.indexBy,
        keys: data.keys,
        data: filteredData,
      }
    } else {
      return data
    }
  }

  return { filterOptions, selectedFilter, setSelectedFilter, getFilteredData }
}

export default usePerCustomerFilter
