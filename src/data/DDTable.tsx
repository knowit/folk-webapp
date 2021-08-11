import React, { useState } from 'react';
import { GridItemHeader } from '../components/GridItem';
import { FilterHeader } from '../components/FilterHeader';
import DataTable from './components/table/DataTable';
import SearchInput from '../components/SearchInput';
import CompetenceFilterInput from '../components/CompetenceFilterInput';
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

interface Filter {
  motivationFilter: string[];
  motivationThreshold: number;
  competenceFilter: string[];
  competenceThreshold: number;
  searchTerm: string;
}

const useStyles = makeStyles({
  searchBars: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-around',
    width: '900px',
  },
});

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

const searchAndFilter = (
  allRows: any[],
  searchableColumns: SearchableColumn[],
  filter: Filter
) => {
  const hasMotivationFilters = filter.motivationFilter.length > 0;
  const hasCompetenceFilters = filter.competenceFilter.length > 0;
  const hasSearchTerm = !!filter.searchTerm && filter.searchTerm.trim() !== '';

  const shouldFilter =
    hasMotivationFilters || hasCompetenceFilters || hasSearchTerm;

  if (!shouldFilter) return allRows;

  return allRows.filter((row) => {
    const rowMatchesSearchTerm = hasSearchTerm
      ? searchRow(row, searchableColumns, filter.searchTerm)
      : true;
    const rowMatchesMotivationFilters = hasMotivationFilters
      ? filterRow(
          row.rowData[row.rowData.length - 2],
          filter.motivationFilter,
          filter.motivationThreshold
        )
      : true;
    const rowMatchesCompetenceFilters = hasCompetenceFilters
      ? filterRow(
          row.rowData[row.rowData.length - 1],
          filter.competenceFilter,
          filter.competenceThreshold
        )
      : true;
    return (
      rowMatchesSearchTerm &&
      rowMatchesMotivationFilters &&
      rowMatchesCompetenceFilters
    );
  });
};

export default function DDTable({ payload, title, props }: DDComponentProps) {
  const allRows = payload as { rowData: any[] }[];

  const [filter, setFilter] = useState<Filter>({
    motivationFilter: [],
    motivationThreshold: 4,
    competenceFilter: [],
    competenceThreshold: 3,
    searchTerm: '',
  });

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

  const classes = useStyles();

  const filteredRows = searchAndFilter(allRows, searchableColumns, filter);

  return (
    <>
      <GridItemHeader title={title}>
        <div className={classes.searchBars}>
          <CompetenceFilterInput
            placeholder="Filtrer på kompetanse..."
            filterList={filter.competenceFilter}
            onSelect={(competences) =>
              setFilter((prev) => ({ ...prev, competenceFilter: competences }))
            }
            type="COMPETENCE"
          />
          <CompetenceFilterInput
            placeholder="Filtrer på motivasjon..."
            filterList={filter.motivationFilter}
            onSelect={(motivations) =>
              setFilter((prev) => ({ ...prev, motivationFilter: motivations }))
            }
            type="MOTIVATION"
          />
          <SearchInput
            placeholder="Søk konsulent, kunde..."
            onSearch={(searchTerm) => {
              setFilter({
                ...filter,
                searchTerm,
              });
            }}
            onClear={() => setFilter((prev) => ({ ...prev, searchTerm: '' }))}
          />
        </div>
      </GridItemHeader>
      {filter.competenceFilter.length > 0 && (
        <FilterHeader
          title="Kompetansefilter"
          filterList={filter.competenceFilter}
          filterThreshold={filter.competenceThreshold}
          onThresholdUpdate={(value) =>
            setFilter((prev) => ({ ...prev, competenceThreshold: value }))
          }
          onSkillClick={(competences) =>
            setFilter((prev) => ({ ...prev, competenceFilter: competences }))
          }
        />
      )}
      {filter.motivationFilter.length > 0 && (
        <FilterHeader
          title="Motivasjonsfilter"
          filterList={filter.motivationFilter}
          filterThreshold={filter.motivationThreshold}
          onThresholdUpdate={(value) =>
            setFilter((prev) => ({ ...prev, motivationThreshold: value }))
          }
          onSkillClick={(motivations) =>
            setFilter((prev) => ({ ...prev, motivationFilter: motivations }))
          }
        />
      )}
      <RowCount>
        {allRows.length} av {filteredRows.length}
      </RowCount>
      <DataTable rows={filteredRows} columns={[]} {...props} />
    </>
  );
}
