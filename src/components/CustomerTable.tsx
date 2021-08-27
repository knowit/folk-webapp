import React, { useState } from 'react';
import type { DDPayload } from '../data/types';
import { GridItemHeader } from './GridItem';
import RowCount from '../components/RowCount';
import DataTable from '../data/components/table/DataTable';
import { makeStyles } from '@material-ui/core/styles';
import SearchInputMinimal from './SearchInputMinimal';


const useStyles = makeStyles({
  searchBars: {
  },
  tableContainer: {
  }
});

type RowType = {
  rowID: string,
  rowData: any[]
}

export function CustomerTable({ payload, title }: {payload: DDPayload, title: string}) {
  const allRows = payload as RowType[];
  const [displayRows, setDisplayRows] = useState(allRows);

  const classes = useStyles();

  const handleSearchInput = (newValue: string) => {setDisplayRows(allRows.filter(row => row.rowData[0].toLowerCase().includes(newValue.toLowerCase())))}

  return (
    <>
      <GridItemHeader title={title}>
        <div className={classes.searchBars}>
          <SearchInputMinimal
            callback={handleSearchInput}
            placeholder="Søk etter kunde"
          />
        </div>
      </GridItemHeader>
      <RowCount>
        {displayRows.length} av {payload.length}
      </RowCount>
      <div className={classes.tableContainer}>
      <DataTable
        rows={displayRows}
        columns={[
          { title: 'Kunde' },
          { title: 'Antall ansatte' },
          { title: 'Antall timer' },
        ]}
      />
      </div>
    </>
  );
}
