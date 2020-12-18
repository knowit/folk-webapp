/* eslint-disable no-use-before-define */

import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { useFetchedData } from '../hooks/service';
import { makeStyles } from '@material-ui/core/styles';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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
    height: 77,
    width: 300,
    backgroundColor:"green",
    paddingLeft: 12,
    paddingTop: 0,
    paddingBottom: 0,
    lineHeight: '43px',
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

export default function CheckboxesTags() {
  const categoriesWithGroup = useCategories();
  const filterList:string[] = [];
  const alterFilterList = (skill:string, selected:boolean) => {
    if(selected === true){
      filterList.push(skill)
    }else{
      const index = filterList.indexOf(skill, 0);
      if (index > -1) {
        filterList.splice(index, 1);
      }
    }
    console.log(filterList)
  }
  const classes = useStyles();
  return (
    <Autocomplete
      style={{ width: 300 }}
      multiple
      autoComplete
      autoHighlight
      autoSelect
      id="kompetansefilter"
      options={categoriesWithGroup}
      disableCloseOnSelect
      groupBy={(option) => option.category}
      getOptionLabel={(options) => options.skill}
      renderOption={(options, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
            onClick = {() => alterFilterList(options.skill, !selected)}
          />
          {options.skill}
        </React.Fragment>
      )}
      renderInput={(params) => (
        <div ref={params.InputProps.ref}>
          {console.log(params.inputProps)}
          <input className={classes.input} type="text" {...params.inputProps} placeholder="filtrer på kompetanse.."/>
        </div>
      )}
    />
  );
}
