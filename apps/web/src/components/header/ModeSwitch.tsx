import { FunctionComponent } from 'react'
import { styled } from '@mui/material/styles'
import { Switch, SwitchProps } from '@mui/material'
import LightModeIcon from '../../assets/iconLightMode.svg?react'
import DarkModeIcon from '../../assets/iconDarkMode.svg?react'

const SwitchStyled = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 48,
  height: 28,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 1,
    margin: 2,
    transitionDuration: '350ms',
    '&.Mui-checked': {
      '& + .MuiSwitch-track': {
        backgroundColor: '#000',
        border: `1.5px solid grey`,
        opacity: 1,
      },
      '& .MuiSwitch-thumb ': {
        backgroundImage: `url(${DarkModeIcon})`,
        backgroundColor: '#000',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        transition: 'transform 0.35s, background-color 0.35s',
        transform: 'rotate(0deg)',
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundImage: `url(${LightModeIcon})`,
      backgroundColor: '#fff',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'contain',
      transition: 'transform 0.35s, background-color 0.35s',
      transform: 'rotate(-90deg)',
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    border: `1.5px solid grey`,
    borderRadius: 26 / 2,
    backgroundColor: '#fff',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 350,
    }),
  },
}))

const SwitchComponent: FunctionComponent<SwitchProps> = ({
  onChange,
  checked,
}) => {
  return (
    <SwitchStyled
      onChange={onChange}
      checked={checked}
      sx={{
        margin: '3px',
      }}
    />
  )
}

export default SwitchComponent
