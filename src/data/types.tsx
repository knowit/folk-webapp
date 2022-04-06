import * as React from 'react'
import { SWRResponse } from 'swr'
import { FilterObject } from '../components/filter/FilterUtil'

export type ChartType = 'Line' | 'Bar' | 'Pie' | 'Radar' | 'Sunburst'
export type ChartVariant = {
  type: ChartType
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

export type Column = {
  title: string
  width: number
  isExpandable?: boolean
  checkBoxLabel?: string
  getValue?: GetColumnValueFn
  renderCell?: (props: any) => JSX.Element
  renderExpanded?: (props: any) => JSX.Element
  headerCell?: (props: any) => JSX.Element
  checkBoxChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export type GetColumnValueFn = (data: any) => string | number | undefined | null

export interface DDComponentProps {
  payload: any
  title: string
  description?: string
  fullsize?: boolean
}

export type SortOrder = 'NONE' | 'ASC' | 'DESC'

export interface ColumnSort {
  sortOrder: SortOrder
  columnIndex: number
  getSortValue?: GetColumnValueFn
}

export interface DDTableProps extends DDComponentProps {
  props: {
    columns: Column[]
  }
  initialFilters: FilterObject[]
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
