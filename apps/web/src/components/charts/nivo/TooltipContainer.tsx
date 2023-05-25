import { FunctionComponent } from 'react'
import { styled } from '@mui/material/styles'

const ComponentRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.text.primary}`,
  borderRadius: 5,
  color: theme.palette.text.primary,
  padding: 5,
}))

interface Props {
  children: any
}

const TooltipContainer: FunctionComponent<Props> = ({ children }) => {
  return <ComponentRoot>{children}</ComponentRoot>
}

export default TooltipContainer
