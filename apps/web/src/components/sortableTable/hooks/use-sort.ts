import { useState } from 'react'
import { MUITableConfig, SortOrder, sortValueFn } from '../tableTypes'

function useSort<T extends object>(
  data: T[],
  config: MUITableConfig<T>[],
  initialSort: { sortOrder: SortOrder | null; sortBy: string | null } = {
    sortOrder: null,
    sortBy: null,
  },
  allowUndetermined = false
) {
  if (!allowUndetermined) {
    initialSort.sortOrder = SortOrder.Asc
    initialSort.sortBy = config ? config[0].label : ''
  }
  const [sortOrder, setSortOrder] = useState<SortOrder | null>(
    initialSort.sortOrder
  )
  const [sortBy, setSortBy] = useState<string | null>(initialSort.sortBy)

  const setSortColumn = (label: string) => {
    if (sortBy && label !== sortBy) {
      setSortOrder(SortOrder.Asc)
      setSortBy(label)
      return
    }

    if (!allowUndetermined) {
      if (sortOrder === SortOrder.Asc) {
        setSortOrder(SortOrder.Desc)
        setSortBy(label)
      } else {
        setSortOrder(SortOrder.Asc)
        setSortBy(label)
      }
    } else {
      if (sortOrder === null) {
        setSortOrder(SortOrder.Asc)
        setSortBy(label)
      } else if (sortOrder === SortOrder.Asc) {
        setSortOrder(SortOrder.Desc)
        setSortBy(label)
      } else {
        setSortOrder(null)
        setSortBy(null)
      }
    }
  }

  const defaultSortFn = (sortValue: sortValueFn<T>, sortOrder: SortOrder) => {
    const sortFn = (a: T, b: T) => {
      const valueA = sortValue(a)
      const valueB = sortValue(b)

      const reversOrder = sortOrder === SortOrder.Desc ? -1 : 1

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return valueA.localeCompare(valueB) * reversOrder
      } else {
        return (+valueA - +valueB) * reversOrder
      }
    }

    return sortFn
  }

  let sortedData = [...data]

  if (sortBy && sortOrder) {
    const column = config.find((c) => c.label === sortBy)

    if (column && column.sortValue) {
      const { sortValue } = column
      const sortFn = column.sortFn
        ? column.sortFn
        : defaultSortFn(sortValue, sortOrder)

      sortedData = [...data].sort(sortFn)
    }
  }

  return {
    sortOrder,
    sortBy,
    sortedData,
    setSortColumn,
  }
}

export default useSort
