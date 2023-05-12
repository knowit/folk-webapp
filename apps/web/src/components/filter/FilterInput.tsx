import React, { ChangeEvent } from 'react'
import Checkbox from '@mui/material/Checkbox'
import { styled } from '@mui/material/styles'
import { InputBase, Autocomplete } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import { CategoryWithGroup, FilterEntry } from './FilterUtil'

const CheckBoxStyled = styled(Checkbox)(({ theme }) => ({
  height: 15,
  width: 15,
  margin: 5,
  color: theme.palette.text.primary,
}))

const InputBaseStyled = styled(InputBase)(({ theme }) => ({
  height: 43,
  width: 260,
  fontSize: 16,
  lineHeight: 18,
  backgroundColor: theme.palette.background.default,
  border: 'none',
  padding: '0px 15px 0px 15px',
  '&:hover, &:focus, &:active': {
    outline: 0,
  },
}))

const OptionItem = styled('li')(({ theme }) => ({
  fontSize: 14,
  width: '100%',
  margin: 0,
  color: theme.palette.text.primary,
}))

interface Props {
  filterList: FilterEntry[]
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

  const activeCategories = categoriesWithGroup.filter((categoryWithGroup) =>
    filterList.some(
      (filterEntry) => filterEntry.value == categoryWithGroup.category
    )
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
      isOptionEqualToValue={(option, value) =>
        option.category === value.category
      }
      multiple
      disableCloseOnSelect
      onChange={handleCategoryChange}
      renderOption={(props, option, state) => (
        <OptionItem {...props}>
          <CheckBoxStyled checked={state.selected} />
          {option.category}
        </OptionItem>
      )}
      renderInput={(params: any) => (
        <div ref={params.InputProps.ref}>
          <InputBaseStyled
            type="text"
            inputProps={{ ...params.inputProps }}
            placeholder={placeholder}
            endAdornment={<FilterListIcon />}
          />
        </div>
      )}
    />
  )
}
