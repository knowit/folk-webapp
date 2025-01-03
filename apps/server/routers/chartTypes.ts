export type ChartData =
  | MultipleChartData<SingularChartData[]>
  | SingularChartData

export type MultipleChartData<
  T extends SingularChartData[] = SingularChartData[],
> = {
  type: 'MultipleChart'
  groups: ChartGroup<T>[]
}

export type ChartGroup<T extends SingularChartData[] = SingularChartData[]> = {
  name: string
  charts: T
}

export type SingularChartData =
  | BarChartData
  | TProfileChartData
  | RadarChartData
  | LineChartData
  | PieChartData
  | SunburstChartData

export interface BarChartData {
  type: 'BarChart'
  indexBy: string
  keys: string[]
  data: any[]
  maxValue?: number | string
}

export interface TProfileChartData {
  type: 'TProfileChart'
  indexBy: string
  keys: string[]
  data: any[]
  maxValue?: number | string
}

export interface RadarChartData {
  type: 'RadarChart'
  indexBy: string
  keys: string[]
  data: any[]
  maxValue?: number | string
}

export type LineChartData = {
  type: 'LineChart'
  data: {
    id: string | number
    data: Array<{
      x: number | string | Date
      y: number | string | Date
    }>
  }[]
}

export interface PieChartData {
  type: 'PieChart'
  id: string
  value: string
  data: any[]
}

export interface SunburstChartData {
  type: 'SunburstChart'
  id: string
  value: string
  data: any[]
}
