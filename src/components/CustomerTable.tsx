import React, { useState } from 'react';
import type { DDPayload } from '../data/types';
import { GridItemHeader } from './GridItem';
import RowCount from '../components/RowCount';
import DataTable from '../data/components/table/DataTable';
import { makeStyles } from '@material-ui/core/styles';
import SearchInputMinimal from './SearchInputMinimal';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';


const useStyles = makeStyles({
  searchBars: {
  },
  tableContainer: {
  },
  sortHeadCell: {
    height: '100%',
    width: '100%',
    marginRight: 0,
  },
  arrowAnchor: {
    marginRight: 0,
    height: '100%',
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  arrowContainer: {
    margin: '1.2em 0 0 auto',
  },
  arrowInactive: {
    opacity: '50%',
  },

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
    <div className={classes.sortHeadCell}>
      <a onClick={
        (e) => {
          e.preventDefault()
          sortChangeHandler(callBackID)
        }
      }
         className={classes.arrowAnchor}
      >
        <div className={classes.arrowContainer}>
          <ArrowDownwardIcon className={columnSortState[callBackID] !== COLUMN_SORT_STATE.DESC ? classes.arrowInactive : ''}/>
          <ArrowUpwardIcon className={columnSortState[callBackID] !== COLUMN_SORT_STATE.ASC ? classes.arrowInactive : ''}/>
        </div>
      </a>
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
        widthList={[670, 235, 235]}
      />
      </div>
    </>
  );
}
