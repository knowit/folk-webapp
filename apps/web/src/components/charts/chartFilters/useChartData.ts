import { SingularChartData } from '@folk/common/types/chartTypes'
import { useMemo } from 'react'

export enum ChartPeriod {
  WEEK = 'WEEK',
  MONTH = 'MONTH',
}

type DateDisplay = {
  month: string
  week: string
  date: Date
}

/** Returns props of x scale displays and date based on regPeriod to compare sort */
function getDateDisplay(regPeriod: string): DateDisplay {
  const y = Number(regPeriod.slice(0, 4))
  const w = Number(regPeriod.slice(-2))
  const date = new Date(y, 0, 1 + (w - 1) * 7)
  date.setDate(date.getDate() + (1 - date.getDay()))

  const month = date.toLocaleString('no-NO', { month: 'short' })

  return {
    month: `${y} - ${month}`,
    week: `${y} - Uke ${w}`,
    date: date,
  }
}

const useChartData = (
  data: SingularChartData,
  chartPeriod: ChartPeriod
): SingularChartData => {
  const groupDataByTimePeriod = (
    data: SingularChartData,
    period: ChartPeriod
  ): SingularChartData => {
    if (data && data.type === 'LineChart') {
      const filteredData = data.data.map((customer) => {
        let monthValue = 0
        let month = null
        const filteredData = customer.data
          .map((v) => {
            const date = getDateDisplay(v.x)
            const value = { ...v, date: date.date }
            if (!month || date.month != month) {
              month = date.month
              monthValue = 0
            }
            monthValue += value.y
            switch (period) {
              case ChartPeriod.WEEK:
                return { ...value, x: date.week }
              case ChartPeriod.MONTH: {
                const monthDate = new Date(date.date)
                monthDate.setDate(1)
                return { date: monthDate, x: date.month, y: monthValue }
              }
              default:
                return value
            }
          })
          .reduce((list, value) => {
            const sum = list
              .filter((o) => o.x === value)
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

  const weeklyData = useMemo(
    () => groupDataByTimePeriod(data, ChartPeriod.WEEK),
    [data]
  )
  const monthlyData = useMemo(
    () => groupDataByTimePeriod(data, ChartPeriod.MONTH),
    [data]
  )

  return chartPeriod === ChartPeriod.WEEK ? weeklyData : monthlyData
}

export default useChartData
