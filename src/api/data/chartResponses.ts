export type MultipleChartResponse<K extends string, T> = Record<K, T>

export interface BarChartData {
  indexBy: string
  keys: string[]
  data: any[]
}

export interface RadarChartData {
  indexBy: string
  keys: string[]
  data: any[]
}

export type LineChartData = {
  id: string | number
  data: Array<{
    x: number | string | Date
    y: number | string | Date
  }>
}[]

export interface PieChartData {
  id: string
  value: string
  data: any[]
}

export interface SunburstChartData {
  id: string
  value: string
  data: any[]
}
