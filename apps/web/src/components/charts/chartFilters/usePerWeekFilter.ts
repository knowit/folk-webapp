import { SingularChartData } from '../../../../../../packages/folk-common/types/chartTypes'
import { useState } from 'react'
import { FilteredData } from './useFilteredData'

export type PerWeekFilterOptions = 'Uke' | 'Måned' | 'Kvartal' | 'År'

type DateDisplay = {
  month: string
  year: string
  week: string
  quarter: string
  date: Date
}

function getDateDisplay(regPeriod: string): DateDisplay {
  const y = Number(regPeriod.slice(0, 4))
  const w = Number(regPeriod.slice(-2))
  const date = new Date(y, 0, 1 + (w - 1) * 7)
  date.setDate(date.getDate() + (1 - date.getDay()))

  const month = date.toLocaleString('no-NO', { month: 'short' })
  const quarter = Math.ceil(date.getMonth() / 3) - 1

  return {
    month: `${y} - ${month}`,
    year: `${y}`,
    week: `${y} - Uke ${w}`,
    quarter: `${y} - Q${quarter}`,
    date: date,
  }
}

const usePerWeekFilter = (data: SingularChartData): FilteredData => {
  const filterOptions: PerWeekFilterOptions[] = [
    'Uke',
    'Måned',
    'Kvartal',
    'År',
  ]

  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0])

  const getFilteredData = (): SingularChartData => {
    if (data && data.type === 'LineChart') {
      const filteredData = data.data.map((customer) => {
        const filteredData = customer.data
          .map((v) => {
            const date = getDateDisplay(v.x)
            const value = { ...v, date: date.date }

            switch (selectedFilter) {
              case 'Uke':
                return { ...value, x: date.week }
              case 'Måned':
                return { ...value, x: date.month }
              case 'Kvartal':
                return { ...value, x: date.quarter }
              case 'År':
                return { ...value, x: date.year }
              default:
                return value
            }
          })
          .reduce((list, value) => {
            const sum = list
              .filter((o) => o.x === value.x)
              .reduce((v, o) => o.y + v, 0)

            return [
              ...list.filter((o) => o.x !== value.x),
              { ...value, y: sum + value.y },
            ]
          }, [])
          .sort((a, b) => a.date - b.date)

        // Filter out empty data
        return filteredData.length
          ? {
              ...customer,
              data: filteredData,
            }
          : null
      })

      return {
        ...data,
        data: filteredData,
      }
    } else {
      return data
    }
  }

  return { filterOptions, selectedFilter, setSelectedFilter, getFilteredData }
}

export default usePerWeekFilter
