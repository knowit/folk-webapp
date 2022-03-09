export interface BarChartData {
  indexBy: string
  keys: string[]
  data: any[]
}

export type BarChartDataResponse = Record<string, BarChartData>

export interface RadarChartData {
  indexBy: string
  keys: string[]
  data: any[]
}

export type RadarChartDataResponse = Record<string, RadarChartData>

export type LineChartData = {
  id: string | number
  data: Array<{
    x: number | string | Date
    y: number | string | Date
  }>
}
