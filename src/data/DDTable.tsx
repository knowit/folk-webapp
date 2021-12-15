import React, { useState } from 'react';
import { GridItemHeader } from '../components/GridItem';
import { FilterHeader } from '../components/FilterHeader';
import DataTable from './components/table/DataTable';
import SearchInput from '../components/SearchInput';
import FilterInput from '../components/FilterInput';
import RowCount from '../components/RowCount';
import { DDComponentProps } from './types';
import { makeStyles } from '@material-ui/core/styles';

interface Column {
  title: string;
  expandable?: boolean;
  searchable?: boolean;
  getSearchValue?: GetSearchValueFn;
}

type GetSearchValueFn = (data: unknown) => string;

export interface SearchableColumn {
  columnIndex: number;
  getSearchValue: GetSearchValueFn;
}

const useStyles = makeStyles({
  searchBars: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-around',
    width: '900px',
  },
});

export interface TableState {
  filters: FilterObject[];
  searchTerm: string;
}

export type FilterObject = {
  name: FilterType;
  values: string[];
  threshold: number;
  placeholder: string;
}

export type FilterType = 'COMPETENCE' | 'MOTIVATION' | 'CUSTOMER';

const mapping: Record<FilterType,number> = {'MOTIVATION': 2, 'COMPETENCE': 1, 'CUSTOMER': 4}

const searchRow = (
  row: any,
  searchableColumns: SearchableColumn[],
  searchTerm: string
) =>
  searchableColumns
    .map((column) =>
      column
        .getSearchValue(row.rowData[column.columnIndex])
        .toLowerCase()
        .trim()
        .includes(searchTerm.toLowerCase().trim())
    )
    .reduce((a, b) => a || b, false);

const filterRow = (
  columnValue: { [key: string]: any },
  filters: string[],
  filterThreshold: number
) =>
  filters
    .map((filterKey) => {
      return columnValue?.[filterKey] >= filterThreshold;
    })
    .reduce((a, b) => a && b);

const filterCustomerColumn = (columnValue: { [key: string]: any },
  filters: string[]) => filters.map((filter) => columnValue?.["customer"] === filter).reduce((prev,curr) => prev && curr)

const searchAndFilter = (rows: any, searchableColumns: SearchableColumn[], state: TableState) => {
  
  const hasSearchTerm = !!state.searchTerm && state.searchTerm.trim() !== '';
  return rows.filter((row: any) => {
    
    const rowMatchesSearchTerm = hasSearchTerm
      ? searchRow(row, searchableColumns, state.searchTerm)
      : true;
    
    
    let rowMatchesFilters = true;
    state.filters.map((filter) => {
      if (filter.values.length > 0) {
        if (filter.name === 'CUSTOMER') {
          rowMatchesFilters = rowMatchesFilters &&
            (filterCustomerColumn(row.rowData[row.rowData.length - mapping[filter.name]], filter.values))
        } else {
          rowMatchesFilters = rowMatchesFilters &&
            (filterRow(row.rowData[row.rowData.length - mapping[filter.name]], filter.values, filter.threshold));
        }
      }})
  
    
    return (
      rowMatchesSearchTerm &&
      rowMatchesFilters
    );
  });
};

function handleFilterChange(prevState: TableState, newFilters: string[], index: number) {
  const filters = prevState.filters;
  filters[index].values = newFilters;
  return ({...prevState, filters:[...prevState.filters]})
}

function handleThresholdChange(prevState: TableState, threshold: number, index: number) {
  const filters = prevState.filters;
  filters[index].threshold = threshold;
  return ({...prevState, filters:[...prevState.filters]})
}

export default function DDTable({ payload, title, props }: DDComponentProps) {
  const allRows = payload as { rowData: any[] }[];
  const initialState = {
    filters: [{
      name: "COMPETENCE",
      values: [],
      threshold: 3,
      placeholder:"Filtrer på kompetanse..."
    },
    {
      name: "MOTIVATION",
      values: [],
      threshold: 4,
      placeholder:"Filtrer på motivasjon..."
    },
    {
      name: "CUSTOMER",
      values: [],
      threshold: 3,
      placeholder: "Filtrer på kunder..."
    }],
    searchTerm: '',
  };
  const [state, setState] = useState<TableState>(initialState as TableState);
  
  const { columns } = props as { columns: Column[] };
  const searchableColumns = columns.reduce((result, column, index) => {
    if (column.searchable && column.getSearchValue) {
      result.push({
        columnIndex: index,
        getSearchValue: column.getSearchValue,
      });
    }
    return result;
  }, [] as SearchableColumn[]);

  const filteredRows = searchAndFilter(allRows, searchableColumns, state)
  

  const classes = useStyles();
  return (
    <>
      <GridItemHeader title={title}>
        <div className={classes.searchBars}>
          {state.filters.map(({values, placeholder}, index) =>
            <FilterInput
              key={placeholder}
              filterList={values}
              placeholder={placeholder}
              onSelect={(filter) =>
                setState(prevState => handleFilterChange(prevState, filter, index))}
            />)}
          <SearchInput
            placeholder={"Søk konsulent, kunde, etc..."}
            onSearch={(searchTerm) => {
              setState((prevState) => ({...prevState, searchTerm}))
            }}
            onClear={() => setState((prevState) => ({...prevState, searchTerm:''}))}
          />
        </div>
      </GridItemHeader>
      {state.filters.map(({ values, threshold, name }, index) => values.length > 0 &&
        <FilterHeader
          title={name}
          type={name}
          filterList={values}
          filterThreshold={threshold}
          onThresholdUpdate={(value) => {
            setState((prevState) => 
              handleThresholdChange(prevState, value, index)
            )
          }}
          onSkillClick={(value) => {
            setState(prevState => handleFilterChange(prevState, value, index))}}
        />)}
      <RowCount>
        {filteredRows.length} av {allRows.length}
      </RowCount>
      <DataTable rows={filteredRows} columns={[]} {...props} />
    </>
  );
}
