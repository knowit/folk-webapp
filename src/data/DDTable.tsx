import React, { useEffect, useReducer, useState } from 'react';
import { GridItemHeader } from '../components/GridItem';
import { FilterHeader } from '../components/FilterHeader';
import DataTable from './components/table/DataTable';
import SearchInput from '../components/SearchInput';
import CompetenceFilterInput from '../components/CompetenceFilterInput';
import { DDComponentProps } from './types';
import { makeStyles } from '@material-ui/core/styles';

interface Column {
  title: string;
  expandable?: boolean;
  searchable?: boolean;
  searchKey?: string;
}

const useStyles = makeStyles({
  searchBars: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-around',
    width: '600px',
  },
});

export interface RowStates {
  rows: any[];
  motivationFilter: string[];
  competenceFilter: string[];
  searchTerm: string;
}

export type Action =
  | {
      type: 'ADD_TO_MOTIVATION_FILTER';
      filter: string;
      allRows: any[];
      searchableColumns: any[];
    }
  | {
      type: 'REMOVE_FROM_MOTIVATION_FILTER';
      filter: string;
      allRows: any[];
      searchableColumns: any[];
    }
  | {
      type: 'CLEAR_MOTIVATION_FILTER';
      allRows: any[];
      searchableColumns: any[];
    }
  | {
      type: 'ADD_TO_COMPETENCE_FILTER';
      filter: string;
      allRows: any[];
      searchableColumns: any[];
    }
  | {
      type: 'REMOVE_FROM_COMPETENCE_FILTER';
      filter: string;
      allRows: any[];
      searchableColumns: any[];
    }
  | {
      type: 'CLEAR_COMPETENCE_FILTER';
      allRows: any[];
      searchableColumns: any[];
    }
  | {
      type: 'CHANGE_SEARCH_TERM';
      searchTerm: string;
      allRows: any[];
      searchableColumns: any[];
    };

function reducer(currentState: RowStates, action: Action) {
  switch (action.type) {
    case 'ADD_TO_MOTIVATION_FILTER':
      return {
        rows: searchAndFilter(
          currentState.rows,
          [...currentState.motivationFilter, action.filter],
          currentState.competenceFilter,
          currentState.searchTerm,
          action.allRows,
          action.searchableColumns
        ),
        motivationFilter: [...currentState.motivationFilter, action.filter],
        competenceFilter: currentState.competenceFilter,
        searchTerm: currentState.searchTerm,
      };
    case 'REMOVE_FROM_MOTIVATION_FILTER':
      return {
        rows: searchAndFilter(
          currentState.rows,
          currentState.motivationFilter.filter(
            (filter) => filter !== action.filter
          ),
          currentState.competenceFilter,
          currentState.searchTerm,
          action.allRows,
          action.searchableColumns
        ),
        motivationFilter: currentState.motivationFilter.filter(
          (filter) => filter !== action.filter
        ),
        competenceFilter: currentState.competenceFilter,
        searchTerm: currentState.searchTerm,
      };
    case 'CLEAR_MOTIVATION_FILTER':
      return {
        rows: searchAndFilter(
          currentState.rows,
          [],
          currentState.competenceFilter,
          currentState.searchTerm,
          action.allRows,
          action.searchableColumns
        ),
        motivationFilter: [],
        competenceFilter: currentState.competenceFilter,
        searchTerm: currentState.searchTerm,
      };
    case 'ADD_TO_COMPETENCE_FILTER':
      return {
        rows: searchAndFilter(
          currentState.rows,
          currentState.motivationFilter,
          [...currentState.competenceFilter, action.filter],
          currentState.searchTerm,
          action.allRows,
          action.searchableColumns
        ),
        motivationFilter: currentState.motivationFilter,
        competenceFilter: [...currentState.competenceFilter, action.filter],
        searchTerm: currentState.searchTerm,
      };
    case 'REMOVE_FROM_COMPETENCE_FILTER':
      return {
        rows: searchAndFilter(
          currentState.rows,
          currentState.motivationFilter,
          currentState.competenceFilter.filter(
            (filter) => filter !== action.filter
          ),
          currentState.searchTerm,
          action.allRows,
          action.searchableColumns
        ),
        motivationFilter: currentState.motivationFilter,
        competenceFilter: currentState.competenceFilter.filter(
          (filter) => filter !== action.filter
        ),
        searchTerm: currentState.searchTerm,
      };
    case 'CLEAR_COMPETENCE_FILTER':
      return {
        rows: searchAndFilter(
          currentState.rows,
          currentState.motivationFilter,
          [],
          currentState.searchTerm,
          action.allRows,
          action.searchableColumns
        ),
        motivationFilter: currentState.motivationFilter,
        competenceFilter: [],
        searchTerm: currentState.searchTerm,
      };
    case 'CHANGE_SEARCH_TERM':
      return {
        rows: currentState.rows,
        motivationFilter: currentState.motivationFilter,
        competenceFilter: currentState.competenceFilter,
        searchTerm: action.searchTerm,
      };
    default:
      return currentState;
  }
}

const searchAndFilter = (
  rows: any[],
  motivationFilter: string[],
  competenceFilter: string[],
  searchTerm: string,
  allRows: any[],
  searchableColumn: any[]
) => {
  const filterLength = motivationFilter.length;
  if ((!searchTerm || searchTerm.length <= 2) && filterLength === 0) {
    if (rows.length !== allRows.length) return allRows;
    return rows;
  }
  const lowerCaseSearchTerm = searchTerm?.toLowerCase();

  //searching for name
  const searchedRows = allRows.filter((row) => {
    return searchableColumn
      .map(([key, index]) => {
        const rowValue = key
          ? row.rowData[index][key].toLowerCase()
          : row.rowData[index].toLowerCase();
        return rowValue.includes(lowerCaseSearchTerm);
      })
      .reduce((a, b) => a || b, false);
  });

  //if no filter, then skip filtering
  if (filterLength === 0) {
    return searchedRows;
  }

  const newRows: any[] = [];

  searchedRows.forEach((row) => {
    var passedFilters = 0;
    motivationFilter.forEach((skill) => {
      const rowSkills = row.rowData[row.rowData.length - 1];
      if (rowSkills?.indexOf(skill) !== -1 && rowSkills !== undefined) {
        passedFilters++;
      }
    });
    passedFilters === filterLength && newRows.push(row);
  });
  return newRows;
};

export default function DDTable({ payload, title, props }: DDComponentProps) {
  const allRows = payload as { rowData: any[] }[];
  const initialState: RowStates = {
    rows: allRows,
    motivationFilter: [],
    competenceFilter: [],
    searchTerm: '',
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { columns } = props as { columns: Column[] };
  const searchableColumn = columns
    .map(
      (col, i) =>
        [col.searchable, col.searchKey, i] as [boolean, string, number]
    )
    .filter(([searchable]) => searchable)
    .map(([, key, i]) => [key, i] as [string, number]);

  const classes = useStyles();

  return (
    <>
      <GridItemHeader title={title}>
        <div className={classes.searchBars}>
          <CompetenceFilterInput
            filterList={state.motivationFilter}
            dispatch={dispatch}
            allRows={allRows}
            searchableColumns={searchableColumn}
          />
          <SearchInput
            dispatch={dispatch}
            allRows={allRows}
            searchableColumns={searchableColumn}
          />
        </div>
      </GridItemHeader>
      {state.motivationFilter.length > 0 && (
        <FilterHeader
          filterList={state.motivationFilter}
          dispatch={dispatch}
          allRows={allRows}
          searchableColumns={searchableColumn}
        />
      )}
      <DataTable rows={state.rows} columns={[]} {...props} />
    </>
  );
}
