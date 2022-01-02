import React, { useEffect, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { TableCell, withStyles } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import {
  AutoSizer,
  Column,
  Table,
  TableRowProps,
  TableRowRenderer,
} from 'react-virtualized'
import CharacterLimitBox from '../../../components/CharacterLimitBox'

interface DataTableProps {
  columns: DataTableColumn[]
  rows: Omit<DataTableRow, 'columns'>[]
}

export interface DataTableColumn {
  title: string
  expandable?: boolean
  searchable?: boolean
  renderCell?: (props: { data: any }) => JSX.Element
  renderExpanded?: (data: any) => JSX.Element
  headerRenderCell?: JSX.Element
  checkBoxChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

interface DataTableRow {
  rowData: any[]
  columns: DataTableColumn[]
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

type CellTypeProps = (props: {
  data: any
  email?: string
  id?: string
  rowData: any[]
  onExpand?: (id: string) => void
}) => JSX.Element

interface MuiVirtualizedTableProps {
  columns: DataTableColumn[]
  rowCount: number
  rowGetter: (row: { index: number }) => any
  rows: any[]
}

interface CellProps {
  CellType?: CellTypeProps
  isExpandable?: boolean
  onExpand: (id: string) => void
  data: any[]
  id: string
  index: number
}

function GetCell({
  isExpandable,
  data,
  id,
  onExpand,
  index,
  CellType,
}: CellProps): JSX.Element {
  const classes = tableStyles()
  const cellData = data[index]

  if (isExpandable && CellType) {
    return <CellType data={cellData} rowData={[]} id={id} onExpand={onExpand} />
  }
  return (
    <TableCellNoBorders
      component="div"
      className={classes.flexContainer}
      align="left"
    >
      <div className={[classes.standardSize, classes.borders].join(' ')}>
        {CellType ? (
          <CellType data={cellData} rowData={data} />
        ) : (
          <CharacterLimitBox text={cellData ?? '-'} />
        )}
      </div>
    </TableCellNoBorders>
  )
}

function MuiVirtualizedTable({
  columns,
  rowCount,
  rowGetter,
  rows,
}: MuiVirtualizedTableProps) {
  const classes = tableStyles()

  const [rowsExpanded, setRowsExpanded] = useState<string[]>([])

  function onExpand(id: string) {
    if (rowsExpanded.includes(id)) {
      setRowsExpanded([...rowsExpanded.filter((row: string) => row !== id)])
    } else {
      setRowsExpanded([...rowsExpanded, id])
    }
  }

  let ArrayRef: any
  function setRef(ref: any) {
    ArrayRef = ref
  }

  useEffect(() => {
    ArrayRef.recomputeRowHeights()
    ArrayRef.forceUpdate()
  }, [ArrayRef])

  const widthList = [385, 222, 143, 337, 53]

  const PerRowRender: TableRowRenderer = ({
    className,
    index,
    key,
    rowData,
    style,
  }: TableRowProps) => {
    console.log('Definitive failure')
    const id = rows[index].rowId
    console.log('faile?')
    const RenderExpanded = columns[0]?.renderExpanded
    console.log('fail?')
    return (
      <div key={key} className={classes.column} style={style}>
        <div className={className}>
          {columns.map((column, i) => {
            return (
              <div key={i} style={{ width: widthList[i] }}>
                <GetCell
                  CellType={column.renderCell}
                  isExpandable={column.expandable}
                  id={id}
                  data={rowData}
                  index={i}
                  onExpand={onExpand}
                />
              </div>
            )
          })}
        </div>
        {rowsExpanded.includes(id) && RenderExpanded && (
          <RenderExpanded
            data={rowData[0]}
            callBack={() => {
              ArrayRef.recomputeRowHeights()
              ArrayRef.forceUpdate()
            }}
            id={id}
          />
        )}
      </div>
    )
  }

  function headerRenderer(
    title: string,
    index: number,
    checkBoxChangeHandler?: (
      event: React.ChangeEvent<HTMLInputElement>
    ) => void,
    HeaderRenderCell?: any
  ) {
    return HeaderRenderCell ? (
      <HeaderRenderCell
        title={title}
        checkBoxLabel="Se kun ledige"
        checkBoxChangeHandler={checkBoxChangeHandler}
        index={index}
      />
    ) : (
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

  const getRowHeight = ({ index }: { index: number }) => {
    return 70
  }

  function emptyRow() {
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
          rowRenderer={PerRowRender}
          ref={setRef}
          height={height}
          width={width}
          rowHeight={getRowHeight}
          headerHeight={70}
          rowCount={rowCount}
          rowGetter={rowGetter}
          rowClassName={classes.flexContainer}
          noRowsRenderer={emptyRow}
          gridClassName={classes.noFocus}
        >
          {columns.map(
            ({ title, headerRenderCell, checkBoxChangeHandler }, index) => {
              return (
                <Column
                  key={title}
                  headerRenderer={() =>
                    headerRenderer(
                      title,
                      index,
                      checkBoxChangeHandler,
                      headerRenderCell
                    )
                  }
                  className={classes.flexContainer}
                  dataKey={String(index)}
                  width={widthList[index]}
                />
              )
            }
          )}
        </Table>
      )}
    </AutoSizer>
  )
}

export default function DataTable({ columns, rows }: DataTableProps) {
  return (
    <Paper
      style={{
        height: 780,
        width: '100%',
        backgroundColor: 'white',
      }}
    >
      <MuiVirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index].rowData}
        columns={columns}
        rows={rows}
      />
    </Paper>
  )
}
