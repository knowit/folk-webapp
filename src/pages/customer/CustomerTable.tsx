import React, { useEffect } from 'react'
import DataTable from '../../data/components/table/DataTable'
import { SimpleComponentProps } from '../../data/SimpleDDItem'

export default function CustomerTable({
  payload,
  callback,
  props,
}: SimpleComponentProps) {
  const allRows = payload
  console.log(payload)
  useEffect(() => {
    if (props.columns) {
      callback(props.columns)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <DataTable rows={allRows} columns={props.columns} />
}
