export type DDPayload = { [key: string]: any }
export type DDPassProps = {
  columns?: Columns[]
  chartVariants?: ChartVariant[]
}

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
  payload: DDPayload
  title: string
  description?: string
  props: DDPassProps
}

export interface DDItemProps {
  url: string
  fullSize?: boolean
  title: string
  description?: string
  dataComponentProps?: DDPassProps
  Component: (props: DDComponentProps) => JSX.Element
  SkeletonComponent: () => JSX.Element
  HeaderSkeletonComponent?: () => JSX.Element
}
