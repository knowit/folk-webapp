import { FunctionComponent } from 'react'
import { styled } from '@mui/material/styles'
import { Switch, SwitchProps } from '@mui/material'
import {
  DarkModeOutlined as DarkMode,
  LightModeOutlined as LightMode,
} from '@mui/icons-material'

const SwitchStyled = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 48,
  height: 28,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: 'black',
        border: `1px solid white`,
        opacity: 1,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    border: `1px solid white`,
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.background.default,
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
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
      icon={
        <LightMode
          sx={{
            color: 'black',
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '2px',
          }}
        />
      }
      checkedIcon={
        <DarkMode
          sx={{
            color: 'white',
            backgroundColor: 'black',
            borderRadius: '20px',
            padding: '2px',
          }}
        />
      }
    />
  )
}

export default SwitchComponent
