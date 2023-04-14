import { TableRow } from 'server/routers/datatypes/typeData'
import { ColumnSort } from '../../../components/table/tableTypes'

export function SortColumnInTable(
  rows: TableRow<any>[],
  currentSort: ColumnSort
) {
  if (!currentSort) return rows

  const getValueFnFallback = (rowData: any) => JSON.stringify(rowData)
  const getValueFn = currentSort.getSortValue ?? getValueFnFallback

  const getCellValue = (row: TableRow<any>) => {
    return getValueFn(row.rowData[currentSort.columnIndex])
  }

  const compare = (a: TableRow<any>, b: TableRow<any>) => {
    const aValue = getCellValue(a)
    const bValue = getCellValue(b)
    if (!aValue) return 1
    if (!bValue) return -1
    return String(aValue).localeCompare(String(bValue))
  }

  switch (currentSort.sortOrder) {
    case 'ASC':
      return rows.sort((a, b) => compare(a, b))
    case 'DESC':
      return rows.sort((a, b) => compare(b, a))
    default:
      return rows
  }
}
