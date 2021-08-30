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

export enum COLUMN_SORT_STATE {
  ASC = 'ASC',
  DESC = 'DESC',
  INACTIVE = 'INACTIVE',
}

const getDefaultColumnSortState = () => Array(3).fill(COLUMN_SORT_STATE.INACTIVE)

export function CustomerTable({ payload, title }: {payload: DDPayload, title: string}) {
  const allRows = payload as RowType[];
  const [displayRows, setDisplayRows] = useState(allRows);
  const [columnSortState, setColumnSortState] = useState<COLUMN_SORT_STATE[]>(getDefaultColumnSortState());

  const classes = useStyles();

  const handleSearchInput = (newValue: string) => {setDisplayRows(allRows.filter(row => row.rowData[0].toLowerCase().includes(newValue.toLowerCase())))}

  const sortChangeHandler = (columnNum : number) => {
    const newState = getDefaultColumnSortState()
    if (columnSortState[columnNum] === COLUMN_SORT_STATE.ASC) {
      newState[columnNum] = COLUMN_SORT_STATE.DESC
    } else {
      newState[columnNum] = COLUMN_SORT_STATE.ASC
    }
    sortRows(newState);
    setColumnSortState(newState)
  }

  const sortRows = (newSortState : COLUMN_SORT_STATE[]) => {
    const sort_on = newSortState.findIndex((el) => el !== COLUMN_SORT_STATE.INACTIVE)
    const isDesc = newSortState[sort_on] === COLUMN_SORT_STATE.DESC;
    let sorted;
    if ( sort_on in alphabeticalColumns) {
      sorted = [...displayRows].sort((a, b) => a.rowData[sort_on].localeCompare( b.rowData[sort_on]))
    } else {
      sorted = [...displayRows].sort((a, b) => a.rowData[sort_on] - b.rowData[sort_on])
    }
    if (isDesc) {
      sorted.reverse()
    }
    setDisplayRows(sorted)
  }

  const SortHeadCell = (callBackID : number) => (
    <div> - {columnSortState[callBackID]}
      <button
        onClick={
          (e) => {
            e.preventDefault()
            sortChangeHandler(callBackID)
          }
        }
      >
        Trykk!
      </button>
    </div>
  )

  const alphabeticalColumns = [0];
  const columns = [
    { title: 'Kunde',
      headerCellAddition: () => SortHeadCell(0),
    },
    { title: 'Antall ansatte',
      headerCellAddition: () => SortHeadCell(1),
    },
    { title: 'Antall timer',
      headerCellAddition: () => SortHeadCell(2),
    },
  ];

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
        columns={columns}
      />
      </div>
    </>
  );
}
