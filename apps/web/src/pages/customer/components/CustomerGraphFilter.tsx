import { withStyles } from '@mui/styles'
import { CheckboxProps, Checkbox, FormControlLabel } from '@mui/material'
import { styled } from '@mui/material/styles'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import FilterListIcon from '@mui/icons-material/FilterList'

const BlackCheckBox = withStyles({
  root: {
    color: '#333333',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
})((props: CheckboxProps) => (
  <Checkbox color="default" disableRipple {...props} />
))

const IconWrapper = styled('div')({ cursor: 'pointer', paddingTop: '5px' })

interface Props {
  checkBox1: any
  checkBox2: any
}

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
      <Menu
        id="customer-graph-filter"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem>
          <FormControlLabel
            label={checkBox1.label}
            checked={checkBox1.checked}
            control={<BlackCheckBox onChange={checkBox1.changeHandler} />}
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            label={checkBox2.label}
            checked={checkBox2.checked}
            control={<BlackCheckBox onChange={checkBox2.changeHandler} />}
          />
        </MenuItem>
      </Menu>
    </>
  )
}

export default CustomerGraphFilter
