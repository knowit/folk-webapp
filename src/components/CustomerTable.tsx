import React, { useEffect } from 'react'
import DataTable from '../data/components/table/DataTable'
import { SimpleComponentProps } from '../data/SimpleDDItem'

export default function CustomerTable({
  payload,
  callback,
  props,
}: SimpleComponentProps) {
  const allRows = payload as { rowData: any[] }[]

  useEffect(() => {
    callback(props.columns)
  }, [])

  return <DataTable rows={allRows} columns={[]} {...props} />
}
