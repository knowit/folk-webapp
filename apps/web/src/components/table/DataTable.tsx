import * as React from 'react'
import { FC, useEffect, useRef, useState } from 'react'
import { createStyles, makeStyles, DefaultTheme, withStyles } from '@mui/styles'
import { Paper, TableCell } from '@mui/material'
import {
  AutoSizer as _AutoSizer,
  AutoSizerProps,
  Column as _VirtualizedColumn,
  ColumnProps,
  Index,
  Table as _Table,
  TableProps,
  TableRowProps,
} from 'react-virtualized'
import CharacterLimitBox from './components/CharacterLimitBox'
import { Column, ColumnSort } from './tableTypes'
import { EmployeeTableRow } from '../../api/data/employee/employeeApiTypes'
import { EmployeeForCustomerList } from '../../api/data/customer/customerApiTypes'
import { SortColumnInTable } from './util/sort-column-in-table'

// Hack to allow upgrade to React 18
// https://github.com/bvaughn/react-virtualized/issues/1739#issuecomment-1264276522
// TODO Not maintained. Consider swapping to https://github.com/bvaughn/react-window
const AutoSizer = _AutoSizer as unknown as FC<AutoSizerProps>
const Table = _Table as unknown as FC<TableProps>
const VirtualizedColumn = _VirtualizedColumn as unknown as FC<ColumnProps>

interface DataTableProps {
  columns: Column[]
  rows: EmployeeTableRow[] | EmployeeForCustomerList[]
  setColumnSort?: (CurrentSort: ColumnSort) => void
  checkBox?: CheckBoxHeader
  currentColumnSort?: ColumnSort
}

type CellTypeProps = (props: {
  data: any
  email?: string
  id?: string
  name?: string
  isExpandable?: boolean
  toggleExpand?: (id: string) => void
  isExpanded?: boolean
}) => JSX.Element

interface CellProps {
  CellType?: CellTypeProps
  isExpandable?: boolean
  toggleExpand?: (id: string) => void
  cellData: any[]
  rowId: string
  name: string
}

export interface CheckBoxHeader {
  label: string
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
  checked: boolean
}

const TableCellNoBorders = withStyles({
  root: {
    borderBottom: '1px solid #F1F0ED',
  },
})(TableCell)

export const tableStyles = makeStyles((theme: DefaultTheme) =>
  createStyles({
    tableHead: {
      fontWeight: 'bold',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      borderBottom: `1px solid ${theme.palette.background.paper}`,
      borderLeft: `1px solid ${theme.palette.background.paper}`,
      padding: 0,
      paddingRight: '15px',
      paddingLeft: '15px',
    },
    flexContainer: {
      display: 'flex',
      padding: 0,
    },
    standardSize: {
      width: '100%',
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      paddingRight: '15px',
      paddingLeft: '15px',
    },
    column: {
      flexDirection: 'column',
    },
    borders: {
      borderLeft: `1px solid ${theme.palette.background.paper}`,
      borderTop: `1px solid ${theme.palette.background.paper}`,
    },
    emptyTable: {
      borderBottom: `1px solid ${theme.palette.background.paper}`,
      borderLeft: `1px solid ${theme.palette.background.paper}`,
      width: '1155px',
    },
    noFocus: {
      outline: 0,
      '&:hover, &:focus, &:active': {
        outline: 0,
      },
    },
  })
)

const DEFAULT_CELL_HEIGHT = 70
const EXPANDED_CELL_HEIGHT = 522

export function VirtualizedTable({
  columns,
  rows,
  setColumnSort,
  currentColumnSort,
  checkBox,
}: DataTableProps) {
  const classes = tableStyles()
  const tableRef = useRef<_Table>(null)
  const [expandedRowIds, setExpandedRowIds] = useState<string[]>([])
  const [sortOrderUnchanged, setSortOrderUnchanged] = useState(true)

  useEffect(() => {
    // We need to alert the react-virtualized table that the height of a
    // row has changed, so that it can recalculate total height and reposition
    // rows. This runs when a row is expanded/collapsed or when the sort order is changed:
    tableRef.current?.recomputeRowHeights()
  }, [tableRef, expandedRowIds, currentColumnSort])

  function rowIsExpanded(rowId: string) {
    return expandedRowIds.includes(rowId)
  }
  function toggleExpand(rowId: string) {
    if (rowIsExpanded(rowId)) {
      setExpandedRowIds((prevState) => [
        ...prevState.filter((expandedRowId) => expandedRowId !== rowId),
      ])
    } else {
      setExpandedRowIds((prevState) => [...prevState, rowId])
    }
  }

  function getRowHeight({ index }: Index) {
    const rowId = rows[index].rowId
    return rowIsExpanded(rowId) ? EXPANDED_CELL_HEIGHT : DEFAULT_CELL_HEIGHT
  }

  function getRowData({ index }: Index) {
    return rows[index].rowData
  }

  function onSortChange(columnSort: ColumnSort) {
    if (setColumnSort) {
      setColumnSort(columnSort)
    }
    if (sortOrderUnchanged) {
      setSortOrderUnchanged(false)
    }
  }

  function Cell({
    cellData,
    rowId,
    toggleExpand,
    isExpandable,
    name,
    CellType,
  }: CellProps) {
    if (isExpandable && CellType) {
      return (
        <CellType
          data={cellData}
          id={rowId}
          toggleExpand={toggleExpand}
          isExpanded={rowIsExpanded(rowId)}
        />
      )
    }
    return (
      <TableCellNoBorders
        component="div"
        className={classes.flexContainer}
        align="left"
      >
        <div className={[classes.standardSize, classes.borders].join(' ')}>
          {CellType ? (
            <CellType data={cellData} name={name} />
          ) : (
            <CharacterLimitBox text={`${cellData}` ?? '-'} />
          )}
        </div>
      </TableCellNoBorders>
    )
  }

  function Row({ className, index, key, rowData, style }: TableRowProps) {
    const rowId = rows[index].rowId
    const ExpandedRowComponent = columns[0]?.renderExpanded
    return (
      <div key={key} className={classes.column} style={style}>
        <div className={className}>
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} style={{ width: column.width }}>
              <Cell
                CellType={column.renderCell}
                rowId={rowId}
                cellData={rowData[columnIndex]}
                name={rowData[0].value}
                isExpandable={column.isExpandable}
                toggleExpand={toggleExpand}
              />
            </div>
          ))}
        </div>
        {rowIsExpanded(rowId) && ExpandedRowComponent ? (
          <ExpandedRowComponent data={rowData[0]} id={rowId} />
        ) : null}
      </div>
    )
  }

  function renderHeaderCell(
    title: string,
    index: number,
    currentOrder?: ColumnSort,
    HeaderCell?: (props: any) => JSX.Element,
    checkBox?: CheckBoxHeader
  ) {
    if (HeaderCell) {
      return (
        <HeaderCell
          title={title}
          checkBox={checkBox}
          columnIndex={index}
          column={columns[index]}
          onOrderChange={onSortChange}
          currentOrder={
            currentOrder?.columnIndex === index
              ? currentOrder.sortOrder
              : 'NONE'
          }
          sortOrderUnchanged={sortOrderUnchanged}
        />
      )
    }

    return (
      <TableCell
        component="div"
        className={classes.tableHead}
        variant="head"
        align="left"
      >
        {title}
      </TableCell>
    )
  }

  function EmptyRow() {
    return (
      <TableCell
        className={classes.emptyTable}
        component="div"
        align="center"
        colSpan={4}
      >
        Ingen resultater
      </TableCell>
    )
  }

  function getTableHeight() {
    let currHeight = 0
    rows.forEach((item, index) => {
      const currIndex: Index = { index: index }
      currHeight += getRowHeight(currIndex)
    })
    return currHeight + 70 //Adding 70 to make room for header
  }

  return (
    <Paper
      style={{
        height: getTableHeight(),
        width: '100%',
        backgroundColor: 'white',
      }}
    >
      <AutoSizer>
        {({ height, width }) => (
          <Table
            rowRenderer={Row}
            ref={tableRef}
            height={height}
            width={width}
            rowHeight={getRowHeight}
            headerHeight={DEFAULT_CELL_HEIGHT}
            rowCount={rows.length}
            rowGetter={getRowData}
            rowClassName={classes.flexContainer}
            noRowsRenderer={EmptyRow}
            gridClassName={classes.noFocus}
          >
            {columns.map((column, index) => (
              <VirtualizedColumn
                key={column.title}
                headerRenderer={() =>
                  renderHeaderCell(
                    column.title,
                    index,
                    currentColumnSort,
                    column.headerCell,
                    checkBox
                  )
                }
                className={classes.flexContainer}
                dataKey={String(index)}
                width={column.width}
              />
            ))}
          </Table>
        )}
      </AutoSizer>
    </Paper>
  )
}

export default function DataTable(props: DataTableProps) {
  const [currentColumnSort, setColumnSort] = useState<ColumnSort>({
    columnIndex: 0,
    sortOrder: 'NONE',
  })

  const sortedRows = SortColumnInTable(props.rows, currentColumnSort)

  return (
    <Paper
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
      }}
    >
      <VirtualizedTable
        {...props}
        rows={sortedRows}
        setColumnSort={setColumnSort}
        currentColumnSort={currentColumnSort}
      />
    </Paper>
  )
}
