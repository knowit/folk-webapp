import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { TableCell, withStyles } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import {
  AutoSizer,
  Column,
  Index,
  Table,
  TableRowProps,
} from 'react-virtualized'
import CharacterLimitBox from './components/CharacterLimitBox'
import { ColumnSort } from '../../DDTable'
import { Columns } from '../../types'
import { EmployeeTableRow } from '../../../api/data/employee/employeeApiTypes'
import { EmployeeForCustomerList } from '../../../pages/customer/CustomerList'

interface DataTableProps {
  columns: Columns[]
  rows: EmployeeTableRow[] | EmployeeForCustomerList[]
  setColumnSort?: (CurrentSort: ColumnSort) => void
  checkBoxChangeHandler?: () => void
  checked?: boolean
  currentColumnSort?: ColumnSort
  columnWidths: number[]
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

const TableCellNoBorders = withStyles({
  root: {
    borderBottom: '1px solid #F1F0ED',
  },
})(TableCell)

export const tableStyles = makeStyles((theme: Theme) =>
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

function VirtualizedTable({
  columns,
  rows,
  setColumnSort,
  checkBoxChangeHandler,
  currentColumnSort,
  checked,
  columnWidths,
}: DataTableProps) {
  const classes = tableStyles()
  const tableRef = useRef<Table>(null)
  const [expandedRowIds, setExpandedRowIds] = useState<string[]>([])

  useEffect(() => {
    // We need to alert the react-virtualized table that the height of a
    // row has changed, so that it can recalculate total height and reposition
    // rows. This runs when a row is expanded/collapsed and when sorting is changed:
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
            <div key={columnIndex} style={{ width: columnWidths[columnIndex] }}>
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
    checkBoxChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void
  ) {
    if (HeaderCell) {
      return (
        <HeaderCell
          title={title}
          checkBoxLabel="Se kun ledige"
          checkBoxChangeHandler={checkBoxChangeHandler}
          columnIndex={index}
          onOrderChange={onSortChange}
          currentOrder={
            currentOrder?.columnIndex === index
              ? currentOrder.sortOrder
              : 'NONE'
          }
          checked={checked}
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

  return (
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
          {columns.map(({ title, headerCell }, index) => (
            <Column
              key={title}
              headerRenderer={() =>
                renderHeaderCell(
                  title,
                  index,
                  currentColumnSort,
                  headerCell,
                  checkBoxChangeHandler
                )
              }
              className={classes.flexContainer}
              dataKey={String(index)}
              width={columnWidths[index]}
            />
          ))}
        </Table>
      )}
    </AutoSizer>
  )
}

export default function DataTable(props: DataTableProps) {
  return (
    <Paper
      style={{
        height: 780,
        width: '100%',
        backgroundColor: 'white',
      }}
    >
      <VirtualizedTable {...props} />
    </Paper>
  )
}
