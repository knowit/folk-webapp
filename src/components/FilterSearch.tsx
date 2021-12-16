import { SearchableColumn, TableState } from '../data/DDTable'
import { CategoryWithGroup } from './FilterInput';


export type FilterObject = {
  name: FilterType;
  values: string[];
  threshold: number;
  placeholder: string;
  datafetch: () => CategoryWithGroup[];
}
export type FilterType = 'COMPETENCE' | 'MOTIVATION' | 'CUSTOMER';

const mapping: Record<FilterType, number> = { 'MOTIVATION': 2, 'COMPETENCE': 1, 'CUSTOMER': 4 }

function searchRow(
  row: any,
  searchableColumns: SearchableColumn[],
  searchTerm: string
) {
  return searchableColumns
    .map((column) =>
      column
        .getSearchValue(row.rowData[column.columnIndex])
        .toLowerCase()
        .trim()
        .includes(searchTerm.toLowerCase().trim())
    )
    .reduce((a, b) => a || b, false)
}

function filterRow(
  columnValue: any,
  filters: string[],
  filterThreshold: number
) {
  return filters
    .map((filterKey) => {
      return columnValue?.[filterKey] >= filterThreshold
    })
    .reduce((a, b) => a && b)
}

const filterCustomerColumn = (columnValue: { [key: string]: any },
  filters: string[]) => filters.map((filter) => (columnValue?.["customer"] ?? 'Ikke i prosjekt') === filter).reduce((prev,curr) => prev || curr)


export const searchAndFilter = (rows: any, searchableColumns: SearchableColumn[], state: TableState) => {
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

export function handleFilterChange(prevState: TableState, newFilterValues: string[], index: number) {
  const filters = prevState.filters;
  filters[index].values = newFilterValues;
  return ({...prevState, filters:[...prevState.filters]})
}

export function handleThresholdChange(prevState: TableState, threshold: number, index: number) {
  const filters = prevState.filters;
  filters[index].threshold = threshold;
  return ({...prevState, filters:[...prevState.filters]})
}