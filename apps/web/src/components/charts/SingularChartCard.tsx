import { SingularChartData } from '../../../../../packages/folk-common/types/chartTypes'
import React, { useState } from 'react'
import { GridItem } from '../gridItem/GridItem'
import { GridItemHeader } from '../gridItem/GridItemHeader'
import DropdownPicker from './DropdownPicker'
import { GridItemContent } from '../gridItem/GridItemContent'
import { ChartDisplayOptions } from './ChartDisplayOptions'
import { ToggleBigChartButton } from './ToggleBigChartButton'
import BigChart from './BigChart'
import { SingularChart } from './ChartCard'

interface SingularChartCardProps {
  title: string
  description?: string
  fullSize: boolean
  data: SingularChartData
  showFilter?: boolean
}

type FilterOptions =
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
const getWeekOfQuarter = () => {
  const currDate = overrideDate || new Date()
  const quarter = Math.ceil(currDate.getMonth() / 3) - 1
  const month = [0, 3, 6, 9][quarter]

  return getWeek(new Date(currDate.getFullYear(), month, 1))
}

/** Returns number of first week of current month */
const getWeekOfMonth = () => {
  const currDate = overrideDate || new Date()

  return getWeek(new Date(currDate.getFullYear(), currDate.getMonth(), 1))
}

/** Returns a list of sequential reg periods (year + week number), starting from @fromWeek to current reg period */
const getRegPeriodsFromWeek = (fromWeek: number): string[] => {
  const currDate = overrideDate || new Date()
  const currYear = currDate.getFullYear()
  const currWeek = getWeek()
  const length = currWeek - fromWeek + 1
  const weekDates = length
    ? [...new Array(length)].map((_, i) => `${currYear}${fromWeek + i}`)
    : []

  return weekDates
}

function getRegPeriods(filter: FilterOptions) {
  switch (filter) {
    case 'Siste uke':
      return getRegPeriodsFromWeek(getWeek())
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

/**
 * A card for rendering a single card.
 */
const SingularChartCard = ({
  title,
  description,
  fullSize = false,
  showFilter,
  data,
}: SingularChartCardProps) => {
  const [isBig, setIsBig] = useState(false)
  const filterValues: FilterOptions[] = [
    'Siste uke',
    'Siste måned',
    'Siste kvartal',
    'Hittil i år',
    'Totalt',
  ]
  const [selectedFilter, setSelectedFilter] = useState(filterValues[0])

  function getFilterData(filter: FilterOptions): SingularChartData {
    if (
      (data && data.type === 'LineChart') ||
      (data && data.type === 'BarChart')
    ) {
      return filter === 'Totalt'
        ? data
        : findFilteredData(getRegPeriods(filter))
    } else {
      return data
    }
  }

  //Generic function to filter data based on regPeriods provided.
  const findFilteredData = (regPeriods?: string[]): SingularChartData => {
    if (regPeriods === undefined || regPeriods.length === 0) {
      return data
    }

    if (data && data.type === 'LineChart') {
      const monthData = data.data.map((customer) => {
        const filteredData = customer.data
          .filter((week) =>
            Object.keys(week).reduce((acc) => {
              return acc || regPeriods.includes(week.x)
            }, false)
          )
          .sort((a, b) =>
            Number(a.x.trim().toLowerCase()) > Number(b.x.trim().toLowerCase())
              ? 1
              : -1
          )
        return {
          ...customer,
          data: filteredData,
        }
      })

      const weekChartObject: SingularChartData = {
        ...data,
        data: monthData,
      }
      return weekChartObject
    }

    if (data && data.type === 'BarChart') {
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

      const chartData: SingularChartData = {
        type: data.type,
        indexBy: data.indexBy,
        keys: data.keys,
        data: filteredData,
      }
      return chartData
    } else {
      return data
    }
  }

  return (
    <GridItem fullSize={fullSize}>
      <GridItemHeader title={title} description={description}>
        {showFilter && (
          <DropdownPicker
            values={filterValues}
            selected={selectedFilter}
            onChange={setSelectedFilter}
          />
        )}
      </GridItemHeader>
      <GridItemContent>
        {/* Sub header containing only the increase size-button */}
        <ChartDisplayOptions>
          <ToggleBigChartButton big={isBig} onChange={() => setIsBig(!isBig)} />
        </ChartDisplayOptions>

        {/* The small chart */}
        <SingularChart
          isBig={false}
          chartData={showFilter ? getFilterData(selectedFilter) : data}
        />

        {/* The big chart */}
        <BigChart open={isBig} onClose={() => setIsBig(false)}>
          <SingularChart
            isBig={isBig}
            chartData={showFilter ? getFilterData(selectedFilter) : data}
          />
        </BigChart>
      </GridItemContent>
    </GridItem>
  )
}

export default SingularChartCard
