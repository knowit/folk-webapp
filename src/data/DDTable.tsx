import React from 'react';
import { GridItemHeader } from '../components/GridItem';
import DataTable from './components/table/DataTable';
import SearchInput from '../components/SearchInput';
import { DDComponentProps } from './DDItem';

export default function DDTable({ payload, title, props }: DDComponentProps) {
  const rows = payload as { rowData: any[] }[];

  const handleSearchInputChange = (searchTerm: string) => {
    //
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
