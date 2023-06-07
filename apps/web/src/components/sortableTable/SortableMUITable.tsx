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
    if (column.sortValue) {
      result.push({
        columnIndex: index,
        getSearchValue: column.sortValue,
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

  const updatedConfig = config.map((column) => {
    if (!column.sortValue) {
      return column
    }

    return {
      ...column,
      header: () => (
        <TableCellStyled key={`head-${column.label}`}>
          <HeaderRoot>
            <HeaderTitle onClick={() => setSortColumn(column.label)}>
              {column.label}
              {getIcons(column.label, sortBy, sortOrder)}
            </HeaderTitle>

            {column.checkBox ? <CellCheckbox {...column.checkBox} /> : null}
          </HeaderRoot>
        </TableCellStyled>
      ),
    }
  })

  const getIcons = (
    label: string,
    sortBy: string | null,
    sortOrder: SortOrder | null
  ) => {
    if (label !== sortBy) {
      return <div></div>
    }

    if (sortOrder === null) {
      return <div></div>
    } else if (sortOrder === SortOrder.Asc) {
      return (
        <div>
          <ArrowDownIcon />
        </div>
      )
    } else if (sortOrder === SortOrder.Desc) {
      return (
        <div>
          <ArrowUpIcon />
        </div>
      )
    }
  }

  return (
    <div>
      <MUITable {...props} config={updatedConfig} data={sortedData}></MUITable>
    </div>
  )
}

export default SortableTable
