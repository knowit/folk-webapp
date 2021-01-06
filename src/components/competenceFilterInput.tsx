/* eslint-disable no-use-before-define */

import React, { Dispatch } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useFetchedData } from '../hooks/service';
import { makeStyles } from '@material-ui/core/styles';
import { InputBase, withStyles } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Action } from '../data/DDTable';

const StyledCheckBox = withStyles(() => ({
  root: {
    height: '15px',
    width: '15px',
    margin: '5px',
    color: 'black',
    '&$checked': {
      color: 'black',
    },
  },
  checked: {},
}))(Checkbox);

interface CategoryList {
  category: string;
  subCategories: string[];
}

type CategoriesWithGroup = {
  skill: string;
  category: string;
};

const useStyles = makeStyles({
  input: {
    height: '43px',
    width: '260px',
    fontSize: '16px',
    lineHeight: '18px',
    backgroundColor: 'white',
    border: 'none',
    padding: '0px 15px 0px 15px',
    '&:hover, &:focus, &:active': {
      outline: 0,
    },
  },
  option: {
    fontSize: '14px',
    width: '100%',
    margin: 0,
    color: '#000000',
  },
  checkbox: {
    color: 'black',
    '&:checked': {
      color: 'black',
    },
  },
});

function useCategories() {
  const [categories] = useFetchedData<CategoryList[]>({
    url: '/api/data/competenceFilter',
  });
  const categoriesWithGroup: CategoriesWithGroup[] = [];
  categories?.forEach((category) => {
    category.subCategories.forEach((skill) => {
      categoriesWithGroup.push({
        skill: skill,
        category: category.category,
      });
    });
  });
  if (categoriesWithGroup !== null) {
    return categoriesWithGroup;
  } else {
    return [{ skill: '', category: '' }];
  }
}

export default function CheckboxesTags({
  filterList,
  dispatch,
  allRows,
  searchableColumns,
  type
}: {
  filterList: string[];
  dispatch: Dispatch<Action>;
  allRows: any[];
  searchableColumns: [string, number][];
  type: 'COMPETENCE' | 'MOTIVATION'
}) {
  const categoriesWithGroup = useCategories();
  const dispatchRemove = type === 'COMPETENCE' ? 'REMOVE_FROM_COMPETENCE_FILTER' : 'REMOVE_FROM_MOTIVATION_FILTER'
  const dispatchAdd = type === 'COMPETENCE' ? 'ADD_TO_COMPETENCE_FILTER' : 'ADD_TO_MOTIVATION_FILTER'
  const alterFilterList = (skill: string) => {
    const index = filterList.indexOf(skill, 0);
    index > -1
      ? dispatch({
          type: dispatchRemove,
          filter: skill,
          allRows,
          searchableColumns,
        })
      : dispatch({
          type: dispatchAdd,
          filter: skill,
          allRows,
          searchableColumns,
        });
  };
  const classes = useStyles();
  return (
    <Autocomplete
     // disableClearable
      multiple
      id={type}
      options={categoriesWithGroup}
      disableCloseOnSelect
      groupBy={(option) => option.category}
      getOptionLabel={(options) => options.skill}
      getOptionSelected={(option, value) => option.skill === value.skill}
      noOptionsText={'No options'}
      renderOption={(options) => (
        <div
          className={classes.option}
          onClick={() => alterFilterList(options.skill)}
        >
          <StyledCheckBox
            className={classes.checkbox}
            checked={filterList.indexOf(options.skill, 0) > -1}
          />
          {options.skill}
        </div>
      )}
      renderInput={(params) => (
        <div ref={params.InputProps.ref}>
          <InputBase
            type="text"
            {...params.inputProps}
            className={classes.input}
            placeholder={type === 'COMPETENCE'? "Filtrer på kompetanse..":"Filtrer på motivasjon..."}
            endAdornment={<FilterListIcon />}
          />
        </div>
      )}
    />
  );
}
