import { Checkbox, FormControlLabel } from '@mui/material'
import { styled } from '@mui/material/styles'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import { FilterListIcon, IconBaseStyle } from '../../../assets/Icons'

const IconWrapper = styled('div')({ cursor: 'pointer', paddingTop: '5px' })

const CheckboxStyled = styled(Checkbox)(() => IconBaseStyle)
interface Props {
  checkBox1: any
  checkBox2: any
}

const MenuStyled = styled(Menu)(({ theme }) => ({
  '& .MuiMenu-paper': {
    backgroundColor: theme.palette.background.default,
  },
}))

const CustomerGraphFilter = ({ checkBox1, checkBox2 }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconWrapper onClick={(e: any) => handleClick(e)}>
        <FilterListIcon />
      </IconWrapper>
      <MenuStyled
        id="customer-graph-filter"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem>
          <FormControlLabel
            label={checkBox1.label}
            checked={checkBox1.checked}
            control={
              <CheckboxStyled
                disableRipple
                onChange={checkBox1.changeHandler}
              />
            }
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            label={checkBox2.label}
            checked={checkBox2.checked}
            control={
              <CheckboxStyled
                disableRipple
                onChange={checkBox2.changeHandler}
              />
            }
          />
        </MenuItem>
      </MenuStyled>
    </>
  )
}

export default CustomerGraphFilter
