import { useCallback } from 'react'
import { ArrowDownIcon, ArrowUpIcon } from '../../assets/Icons'
import useSort from './hooks/use-sort'

import MUITable, {
  CellCheckbox,
  HeaderRoot,
  HeaderTitle,
  TableCellStyled,
} from './MUITable'
import {
  MUITableConfig,
  MUITableProps,
  SearchableColumn,
  SortOrder,
} from './tableTypes'

export function getSearchableColumns<T>(
  columns: MUITableConfig<T>[]
): SearchableColumn<T>[] {
  const result: SearchableColumn<T>[] = []
  columns.forEach((column, index) => {
    if (column.searchValue) {
      result.push({
        columnIndex: index,
        getSearchValue: column.searchValue,
      })
    }
  })
  return result
}

const SortableTable = <T extends object>(props: MUITableProps<T>) => {
  const { config, data, initialSort } = props
  const { sortOrder, sortBy, sortedData, setSortColumn } = useSort<T>(
    data,
    config,
    initialSort
  )
  const getIcon = useCallback(
    (label: string, sortBy: string | null, sortOrder: SortOrder | null) => {
      if (label === sortBy) {
        if (sortOrder === SortOrder.Asc) {
          return <ArrowDownIcon />
        } else if (sortOrder === SortOrder.Desc) {
          return <ArrowUpIcon />
        }
      }
      return undefined
    },
    []
  )

  const updatedConfig = config.map((column) => {
    if (!column.sortValue) {
      return column
    }

    return {
      ...column,
      header: (
        <TableCellStyled key={`head-${column.label}`}>
          <HeaderRoot>
            <HeaderTitle onClick={() => setSortColumn(column.label)}>
              {column.label}
              {getIcon(column.label, sortBy, sortOrder)}
            </HeaderTitle>

            {column.checkBox ? <CellCheckbox {...column.checkBox} /> : null}
          </HeaderRoot>
        </TableCellStyled>
      ),
    }
  })

  return (
    <div>
      <MUITable {...props} config={updatedConfig} data={sortedData}></MUITable>
    </div>
  )
}

export default SortableTable
