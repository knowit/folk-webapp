export type ChartData =
  | MultipleChartData<SingularChartData[]>
  | SingularChartData

export type MultipleChartData<
  T extends SingularChartData[] = SingularChartData[]
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
  | RadarChartData
  | LineChartData
  | PieChartData
  | SunburstChartData

export interface BarChartData {
  type: 'BarChart'
  indexBy: string
  keys: string[]
  data: any[]
}

export interface RadarChartData {
  type: 'RadarChart'
  indexBy: string
  keys: string[]
  data: any[]
}

export type LineChartData = {
  type: 'LineChart'
  data: any[]
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

export type NetworkNode = {
  id: string
  height: number
  size: number
  color: string
  name?: string
  managerName?: string
  title?: string
}

export type NetworkLink = {
  source: string
  target: string
  distance: number
  color?: string
}

export type NetworkData = {
  nodes: NetworkNode[]
  links: NetworkLink[]
}
