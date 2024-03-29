/**
 * const ex = {
 * }
 */

export type AggregatedData<T> = Record<
  string,
  Record<string, any> & { data: T }
>

export type TableRow<TRowData> = {
  rowId: string
  rowData: TRowData
}
