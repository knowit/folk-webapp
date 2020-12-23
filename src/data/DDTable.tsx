import React, { useEffect, useState } from 'react';
import { GridItemHeader } from '../components/GridItem';
import { FilterHeader } from '../components/FilterHeader';
import DataTable from './components/table/DataTable';
import SearchInput from '../components/SearchInput';
import CompetenceFilterInput from  '../components/CompetenceFilterInput'
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
  }
});

export default function DDTable({ payload, title, props }: DDComponentProps) {
  const allRows = payload as { rowData: any[] }[];
  const [rows, setRows] = useState(allRows);
  const [filterList, setFilterList] = useState<string[]>([]);
  const [searchBarInput, setSearchBarInput] = useState<string>();
  const { columns } = props as { columns: Column[] };
  const searchableColumn = columns
    .map(
      (col, i) =>
        [col.searchable, col.searchKey, i] as [boolean, string, number]
    )
    .filter(([searchable]) => searchable)
    .map(([, key, i]) => [key, i] as [string, number]);

  const searchAndFilter = () => {
    const filterLength = filterList.length
    if ((!searchBarInput || searchBarInput.length <= 2) && filterLength === 0) {
      if (rows.length !== allRows.length) setRows(allRows);
      return;
    }
    const lowerCaseSearchTerm = searchBarInput?.toLowerCase();

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
      })
    
    //if no filter, then skip filtering
    if (filterLength === 0 ){
      setRows(searchedRows)
      return;
    } 

    const newRows:any[] = []
    
    searchedRows.forEach(row=>{
      var passedFilters = 0
      filterList.forEach(skill =>{
        const rowSkills = row.rowData[row.rowData.length-1]
        if(rowSkills?.indexOf(skill)!== -1 && rowSkills !== undefined){
          passedFilters++; 
        }
      })
      passedFilters === filterLength && newRows.push(row)
    })
    setRows(newRows)
  }

  useEffect(()=>{
    console.log("useEffect")
    searchAndFilter();
  },[filterList.length, searchBarInput])



  const classes = useStyles();

  return (
    <>
      <GridItemHeader title={title}>
        <div className={classes.searchBars}>
          <CompetenceFilterInput filterList={filterList} setFilterList={setFilterList}/>
          <SearchInput onChange={setSearchBarInput} />
        </div>
      </GridItemHeader>
      {filterList.length > 0 && <FilterHeader  filterList={filterList} setFilterList={setFilterList} />}
      <DataTable rows={rows} columns={[]} {...props} />
    </>
  );
}
