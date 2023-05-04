import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { createStyles, makeStyles } from '@mui/styles'

interface Props {
  title: string
  order?: string
  active: boolean
  onClick: (type: string) => void
}

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      marginRight: '10px',
      marginLeft: '10px',
      width: 'fit-content',
      whiteSpace: 'nowrap',
      height: '40px',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
      display: 'flex',
      cursor: 'pointer',
      alignItems: 'center',
      padding: '8px 12px',
      gap: '8px',
    },
    active: {
      background: '#FFFFFF',
    },
    inactive: {
      background: '#F1F0ED;',
    },
  })
)

const SortButton = ({ title, order, active, onClick }: Props) => {
  const classes = useStyles()

  const sortClick = () => {
    if (order && order === 'DESC') {
      return <ArrowUpward />
    } else {
      return <ArrowDownward />
    }
  }

  return (
    <div
      onClick={() => {
        onClick(title)
      }}
      className={[
        classes.button,
        active ? classes.active : classes.inactive,
      ].join(' ')}
    >
      {title} {order && sortClick()}{' '}
    </div>
  )
}

export default SortButton
