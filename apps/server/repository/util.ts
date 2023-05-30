import { config } from 'aws-sdk'
config.update({ region: 'eu-central-1' })

export const range = (x: number, y: number) =>
  Array.from(
    (function* () {
      while (x <= y) yield x++
    })()
  )

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

// prettier-ignore
export const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    (groups[key(item)] ||= []).push(item)
    return groups
  }, {} as Record<K, T[]>)
