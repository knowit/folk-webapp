import { FunctionComponent } from 'react'
import { styled } from '@mui/material/styles'
import { Switch, SwitchProps } from '@mui/material'
import { LightModeOutlined as LightMode } from '@mui/icons-material'

const SwitchStyled = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 48,
  height: 28,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '350ms',
    '&.Mui-checked': {
      '& + .MuiSwitch-track': {
        backgroundColor: 'black',
        border: `1.5px solid grey`,
        opacity: 1,
      },
      '& .MuiSwitch-thumb': {
        transition: 'transform 0.3s',
        transform: 'rotate(360deg)',
      },
    },
    '& .MuiSwitch-thumb': {
      transition: 'transform 0.3s',
      transform: 'rotate(0deg)',
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    border: `1.5px solid grey`,
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.background.default,
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
      icon={
        <LightMode
          sx={{
            color: 'black',
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '2px',
            transition: 'transform 0.35s, background-color 0.35s, color 0.35s',
            transform: 'rotate(-90deg)',
          }}
        />
      }
      checkedIcon={
        <LightMode
          sx={{
            color: 'white',
            backgroundColor: 'black',
            borderRadius: '20px',
            padding: '2px',
            transition: 'transform 0.35s, background-color 0.35s, color 0.35s',
            transform: 'rotate(0deg)',
          }}
        />
      }
      sx={{
        margin: '3px',
      }}
    />
  )
}

export default SwitchComponent
