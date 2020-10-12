import React, { useState } from 'react';
import { GridItemHeader } from '../components/GridItem';
import DataTable from './components/table/DataTable';
import SearchInput from '../components/SearchInput';
import { DDComponentProps } from './DDItem';

interface Column {
  title: String,
  expandable?: boolean,
  searchable?: boolean,
  searchKey?: string
}

export default function DDTable({ payload, title, props }: DDComponentProps) {
  const allRows = payload as { rowData: any[] }[]
  const [rows, setRows] = useState(allRows);

  const { columns } = props as { columns: Column[] }
  const searchableColumn = columns
      .map((col, i) => ([col.searchable, col.searchKey, i] as [boolean, string, number]))
      .filter(([searchable]) => searchable)
      .map(([_, key, i]) => [key, i] as [string, number]) 

  const handleSearchInputChange = (searchTerm: string) => {
    if (!searchTerm || searchTerm.length <= 2) {
      if (rows.length !== allRows.length){
        setRows(allRows)
      }
      return
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase()

    setRows(allRows.filter(row => {
      return searchableColumn
        .map(([key, index]) => {
          const rowValue = key 
            ? row.rowData[index][key].toLowerCase()
            : row.rowData[index].toLowerCase()

          return rowValue.includes(lowerCaseSearchTerm)
        })
        .reduce((a, b) => a || b, false)
    }))
  };

  return (
    <>
      <GridItemHeader title={title}>
        <SearchInput onChange={handleSearchInputChange} />
      </GridItemHeader>

      <div style={{ backgroundColor: '#fff', padding: '20px 0' }}>
        <DataTable rows={rows} columns={[]} {...props} />
      </div>
    </>
  );
}
