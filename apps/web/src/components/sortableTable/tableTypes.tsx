import { SingularChartData } from '@folk/common/types/chartTypes'
import { SWRResponse } from 'swr'
import { FilterObject } from '../filter/FilterUtil'
import { ReactNode } from 'react'

export type DDPayload = { [key: string]: any }

export type ChartType = SingularChartData['type']
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

export enum SortOrder {
  Asc = 'Asc',
  Desc = 'Desc',
}

export type sortValueFn<T> = (rowData: T) => string | number | undefined | null

export interface MUITableConfig<T> {
  label: string
  render: (
    rowData: T,
    toggle?: (id: string) => void,
    toggled?: boolean
  ) => ReactNode
  width?: number
  additionalCellStyle?: React.CSSProperties
  header?: () => ReactNode
  checkBox?: CheckBoxHeader
  sortValue?: sortValueFn<T>
  sortFn?: (a: T, b: T) => number
}

export interface MUITableProps<T> {
  data: T[]
  config: MUITableConfig<T>[]
  keyFn: (rowData: T) => string
  collapsable?: (rowData: T) => ReactNode
  initialSort?: { sortOrder: SortOrder | null; sortBy: string | null }
}

export interface SearchableColumn<T> {
  columnIndex: number
  getSearchValue: sortValueFn<T>
}

export interface CheckBoxHeader {
  label: string
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
  checked: boolean
}

export type GetColumnValueFn = (data: any) => string | number | undefined | null

export interface DDComponentProps {
  payload: any
  title: string
  description?: string
  fullsize?: boolean
  searchable?: boolean
}

export interface DDTableProps extends DDComponentProps {
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
