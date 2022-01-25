import { SWRResponse } from 'swr'

export type DDPayload = { [key: string]: any }

export type ChartVariant = {
  type: 'Bar' | 'Line' | 'Pie' | 'Radar' | 'Sunburst'
  props?: {
    maxValue?: string | number
    yLabels?: string[]
    groupKey?: string
    dataKey?: string
    tooltipValues?: string[]
    valueKey?: string[] | string
    margin?: { top: number; right: number; bottom: number; left: number }
  }
}

export type Columns = {
  title: string
  isExpandable?: boolean
  searchable?: boolean
  checkBoxLabel?: string
  getSearchValue?: (props: any) => string
  renderCell?: (props: any) => JSX.Element
  renderExpanded?: (props: any) => JSX.Element
  headerCell?: (props: any) => JSX.Element
  checkBoxChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface DDComponentProps {
  payload: any
  title: string
  description?: string
  fullsize?: boolean
}

export interface DDTableProps extends DDComponentProps {
  props: {
    columns: Columns[]
  }
}

export interface DDChartProps extends DDComponentProps {
  props: {
    chartVariants: ChartVariant[]
  }
}

export interface DDItemProps {
  fetchHook: () => SWRResponse
  title: string
  dataComponentProps: {
    chartVariants: ChartVariant[]
  }
  description?: string
  fullSize?: boolean
}
