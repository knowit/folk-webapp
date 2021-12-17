import React, { ChangeEvent } from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useFetchedData } from '../hooks/service'
import { makeStyles } from '@material-ui/core/styles'
import { InputBase, withStyles } from '@material-ui/core'
import FilterListIcon from '@material-ui/icons/FilterList'
import { DDPayload } from '../data/types'

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
}))(Checkbox)

interface CategoryList {
  category: string
  subCategories: string[]
}

export type CategoryWithGroup = {
  category: string
  group: string
}

const useStyles = makeStyles({
  input: {
    height: '43px',
    width: '210px',
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
  autocomplete: {
    paddingRight: '10px',
  },
})

export function useCategories(): CategoryWithGroup[] {
  const [categories] = useFetchedData<CategoryList[]>({
    url: '/api/data/competenceFilter',
  })
  return (categories ?? []).flatMap((mainCategory) =>
    mainCategory.subCategories.map((subCategory) => ({
      category: subCategory,
      group: mainCategory.category,
    }))
  )
}

export function useCustomer(): CategoryWithGroup[] {
  const [employees] = useFetchedData<DDPayload>({
    url: '/api/data/employeeTable',
  })
  const customers: string[] = employees?.flatMap((workers: any) => [
    workers.rowData[3]['customer'] ?? 'Ikke i prosjekt',
  ])
  return Array.from(new Set(customers)).map((customer: string) => ({
    category: customer,
    group: 'Kunde',
  }))
}

interface Props {
  filterList: string[]
  placeholder: string
  onSelect: (value: string[]) => void
  fetchFilterCategories: () => CategoryWithGroup[]
}

export default function FilterInput({
  filterList,
  placeholder,
  onSelect,
  fetchFilterCategories,
}: Props) {
  const categoriesWithGroup = fetchFilterCategories()
  const classes = useStyles()

  const activeCategories = categoriesWithGroup.filter((categoryWithGroup) =>
    filterList.includes(categoryWithGroup.category)
  )

  const handleCategoryChange = (
    _event: ChangeEvent<unknown>,
    values: CategoryWithGroup[]
  ) => {
    onSelect(values.map((categoriesWithGroup) => categoriesWithGroup.category))
  }

  return (
    <Autocomplete
      id={placeholder}
      value={activeCategories}
      options={categoriesWithGroup}
      groupBy={(option) => option.group}
      getOptionLabel={(option) => option.category}
      getOptionSelected={(option, value) => option.category === value.category}
      multiple
      disableCloseOnSelect
      className={classes.autocomplete}
      onChange={handleCategoryChange}
      renderOption={(option, state) => (
        <div className={classes.option}>
          <StyledCheckBox
            className={classes.checkbox}
            checked={state.selected}
          />
          {option.category}
        </div>
      )}
      renderInput={(params) => (
        <div ref={params.InputProps.ref}>
          <InputBase
            type="text"
            {...params.inputProps}
            className={classes.input}
            placeholder={placeholder}
            endAdornment={<FilterListIcon />}
          />
        </div>
      )}
    />
  )
}
