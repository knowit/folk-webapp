import React, { useState, useEffect, useRef } from 'react'
import { InputBase, InputAdornment, Theme } from '@mui/material'
import { styled } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'
import { makeStyles } from '@mui/styles'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

const InputBaseStyled = styled(InputBase)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  height: 43,
  minWidth: 303,
  paddingLeft: 15,
  paddingRight: 15,
  fontSize: 16,
}))
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: 'white',
    height: 43,
    minWidth: 303,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 16,
  },
  icon: {
    color: theme.palette.primary.main,
    borderRadius: 0,
    transition: 'none',
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}))

interface Props {
  onSearch: (val: string) => void
  currentSearchValue?: string
  onClear: () => void
  placeholder: string
  debounceDelay?: number
}

export default function SearchInput({
  onSearch,
  onClear,
  currentSearchValue = '',
  placeholder,
  debounceDelay = 250,
}: Props) {
  const classes = useStyles()
  const [searchValue, setSearchValue] = useState(currentSearchValue)
  const searchRef = useRef('')
  const previousSearchRef = useRef('')
  const timerRunning = useRef(false)
  searchRef.current = searchValue

  useEffect(() => {
    setSearchValue(currentSearchValue)
  }, [currentSearchValue])

  useEffect(() => {
    const delay = searchValue !== '' ? debounceDelay : 0
    if (!timerRunning.current) {
      timerRunning.current = true
      onSearch(searchRef.current)
      previousSearchRef.current = searchRef.current
      setTimeout(() => {
        if (searchRef.current !== previousSearchRef.current) {
          onSearch(searchRef.current)
        }
        timerRunning.current = false
      }, delay)
    }
  }, [searchValue, onSearch, debounceDelay])

  const clearInput = () => {
    setSearchValue('')
    onClear()
  }

  const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setSearchValue(event.target.value)
  }

  return (
    <>
      <InputBaseStyled
        onChange={changeValue}
        value={searchValue}
        type="text"
        name="search"
        placeholder={placeholder}
        endAdornment={
          <InputAdornment position="end">
            {searchValue === '' ? (
              <SearchIcon className={classes.icon} />
            ) : (
              <IconButton
                color="inherit"
                className={classes.icon}
                aria-label="Tøm"
                onClick={clearInput}
                title="Tøm"
              >
                <CloseIcon />
              </IconButton>
            )}
          </InputAdornment>
        }
      />
    </>
  )
}
