/* eslint-disable no-use-before-define */

import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { useFetchedData } from '../hooks/service';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface CategoryList{
  category: string,
  subCategories: string[]
}
type CategoriesWithGroup = {
  skill:string,
  category:string
}


const StyledTextField = withStyles(() => ({
  root: {
    height: '20px',
    width: '20px',
    margin: '5px',
    color: 'black',
    '&$checked': {
      color: 'black',
    },
  },
}))(TextField);

const StyledAutocomplete = withStyles({
  root: {
    height: '43px',
    width: '260px',
    margin: '5px',
    color: 'black',
    backgroundColor: '#ffffff'
  },
})(Autocomplete);


export default function CheckboxesTags() {
  const [categories, loading] = useFetchedData<CategoryList[]>({url:"/api/data/competenceFilter"});
  const categoriesWithGroup:CategoriesWithGroup[] = []
  categories?.forEach(
    category => {
      category.subCategories.forEach(
        skill =>{
          categoriesWithGroup.push({
            skill:skill,
            category:category.category,
          });
        }
      )
    }
  )
  return (
    <Autocomplete
      multiple
      autoComplete
      autoHighlight
      autoSelect
      id="kompetansefilter"
      options={categoriesWithGroup}
      loading={loading}
      disableCloseOnSelect
      groupBy ={(option) => option.category}
      getOptionLabel={(options) => options.skill}
      renderOption={(options, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {options.skill}
          {loading ? <CircularProgress color="inherit" size={20} /> : null}
        </React.Fragment>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Filtrer"
          placeholder="Kompetanseområder"
        />
      )}
    />
  );
}