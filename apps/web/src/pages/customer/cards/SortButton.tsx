import { ArrowDownIcon, ArrowUpIcon } from '../../../assets/Icons'
import { styled } from '@mui/material/styles'

const Button = styled('div', {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ active, theme }) => ({
  marginRight: '10px',
  marginLeft: '10px',
  whiteSpace: 'nowrap',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
  display: 'flex',
  cursor: 'pointer',
  padding: '8px 12px',
  background: active
    ? theme.palette.background.paper
    : theme.palette.background.default,
}))

interface Props {
  title: string
  order?: string
  active: boolean
  onClick: (type: string) => void
}

const SortButton = ({ title, order, active, onClick }: Props) => {
  const sortIcon = order === 'DESC' ? <ArrowDownIcon /> : <ArrowUpIcon />

  return (
    <Button
      onClick={() => {
        onClick(title)
      }}
      active={active}
    >
      {title} {title === 'Alfabetisk' && sortIcon}
    </Button>
  )
}

export default SortButton
