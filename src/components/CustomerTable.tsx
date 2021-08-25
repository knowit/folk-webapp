import React, { useState } from 'react';
import type { DDPayload } from '../data/types';
import { GridItemHeader } from './GridItem';
import RowCount from '../components/RowCount';
import DataTable from '../data/components/table/DataTable';
import { makeStyles } from '@material-ui/core/styles';
import SearchInputMinimal from './SearchInputMinimal';


const useStyles = makeStyles({
  searchBars: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-around',
    width: '900px',
  },
});

export function CustomerTable({ payload, title }: {payload: DDPayload, title: string}) {
  const allRows = payload as [];

  const [displayRows, setDisplayRows] = useState(allRows);

  const classes = useStyles();

  const handleSearchInput = (newValue: string) => {
    console.log('søkeinput:', newValue)

    // TODO: Do the filtering
    setDisplayRows(allRows)
  }

  return (
    <>
      <GridItemHeader title={title}>
        <div className={classes.searchBars}>
          <SearchInputMinimal
            callback={handleSearchInput}
            placeholder="Søk kunde (funker ikke enda)"
          />
        </div>
      </GridItemHeader>
      <RowCount>
        {payload.length} av {displayRows.length}
      </RowCount>
      <DataTable
        rows={displayRows}
        columns={[
          { title: 'Kunde' },
          { title: 'Antall ansatte' },
          { title: 'Antall timer' },
        ]}
      />
    </>
  );
}
