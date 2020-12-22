/* eslint-disable no-use-before-define */

import React, { Dispatch, SetStateAction } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useFetchedData } from '../hooks/service';
import { makeStyles } from '@material-ui/core/styles';
import { InputBase, withStyles } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';


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
    border:'none',
    padding:'0px 15px 0px 15px',
    '&:hover, &:focus, &:active': {
      outline: 0,
    },
  },
  option:{
    fontSize:'14px',
    width: '100%',
    margin: 0,
    color:'#000000',
  },
  checkbox:{
    color:'black',
    '&:checked':{
      color:'black',
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

export default function CheckboxesTags(filters:{filterList:string[], setFilterList:Dispatch<SetStateAction<string[]>>}) {
  const filterList = filters.filterList
  const setFilterList = filters.setFilterList
  const categoriesWithGroup = useCategories();

  const alterFilterList = (skill:string) => {
    const index = filterList.indexOf(skill, 0);
    index > -1 ? setFilterList(filterList.filter(filter => filter !== skill)) : setFilterList([...filterList, skill])
    console.log(filterList)
  }
  const classes = useStyles();
  return (
    <Autocomplete
      disableClearable
      forcePopupIcon={false}
      multiple
      autoComplete
      autoSelect
      id="kompetansefilter"
      options={categoriesWithGroup}
      disableCloseOnSelect
      groupBy={(option) => option.category}
      getOptionLabel={(options) => options.skill}
      noOptionsText={'No options'}
      renderOption={(options) => (
        <div className={classes.option} onClick = {() => alterFilterList(options.skill)}>
          <StyledCheckBox
            className={classes.checkbox}
            checked={filterList.indexOf(options.skill, 0)> -1}
          />
          {options.skill}
        </div>
      )}
      renderInput={(params) => (
        <div ref={params.InputProps.ref}>
          <InputBase type="text" {...params.inputProps} className={classes.input} placeholder="Filtrer på kompetanse..."  endAdornment={<FilterListIcon/>}/>
        </div>
      )}
    />
  );
}
