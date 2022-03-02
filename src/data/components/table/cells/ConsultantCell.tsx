import React from 'react'
import {
  Avatar,
  Button,
  makeStyles,
  TableCell,
  withStyles,
  Theme,
  createStyles,
} from '@material-ui/core'
import { ReactComponent as FallbackUserIcon } from '../../../../assets/fallback_user.svg'
import CharacterLimitBox from '../components/CharacterLimitBox'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { OpenInNew } from '@material-ui/icons'
import { Link } from 'react-router-dom'

const useCompetenceMappingStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    image: {
      width: 50,
      height: 50,
    },
    text: {
      marginTop: 'auto',
      marginBottom: 'auto',
      marginLeft: 15,
    },
    cellExpandable: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: 'none',
      textDecoration: 'none',
      textTransform: 'inherit',
    },
    flexContainer: {
      display: 'flex',
      padding: 0,
    },
    standardSize: {
      width: '100%',
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      paddingRight: '15px',
      paddingLeft: '15px',
    },
    bolderText: {
      fontWeight: 'bold',
    },
    column: {
      flexDirection: 'column',
    },
    borders: {
      borderLeft: `1px solid ${theme.palette.background.paper}`,
      borderTop: `1px solid ${theme.palette.background.paper}`,
    },
    spread: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  })
)
const TableCellNoBorders = withStyles({
  root: {
    borderBottom: '1px solid #F1F0ED',
  },
})(TableCell)

const ExpandMoreIconWithStyles = withStyles({
  root: {
    color: '#707070',
    cursor: 'pointer',
    '&:hover': {
      color: '#333333',
    },
  },
})(ExpandMoreIcon)

const ExpandLessIconWithStyles = withStyles({
  root: {
    color: '#707070',
    cursor: 'pointer',
    '&:hover': {
      color: '#333333',
    },
  },
})(ExpandLessIcon)

export const OpenInNewStyled = withStyles({
  root: {
    color: '#707070',
    cursor: 'pointer',
    '&:hover': {
      color: '#333333',
    },
  },
})(OpenInNew)

interface ConsultantCellProps {
  data: {
    value: string
    image?: string
    email: string
    email_id: string
    user_id: string
    competenceUrl: string
  }
  id: string
  isExpanded: boolean
  toggleExpand: (id: string) => void
}

export default function ConsultantCell({
  data,
  id,
  isExpanded,
  toggleExpand,
}: ConsultantCellProps) {
  const classes = useCompetenceMappingStyles()
  const openStyle = isExpanded ? classes.bolderText : ''
  return (
    <TableCellNoBorders
      component="div"
      className={[classes.flexContainer, classes.column, classes.borders].join(
        ' '
      )}
      align="left"
    >
      <Button
        role="button"
        disableRipple
        className={[
          classes.cellExpandable,
          openStyle,
          classes.standardSize,
          classes.flexContainer,
          classes.spread,
        ].join(' ')}
        onClick={() => toggleExpand(id)}
      >
        <div className={classes.root}>
          {data.image ? (
            <Avatar
              alt={data.value}
              className={classes.image}
              src={data.image}
            />
          ) : (
            <Avatar alt={data.value} className={classes.image}>
              <FallbackUserIcon className={classes.image} />
            </Avatar>
          )}
          <span className={classes.text}>
            <CharacterLimitBox text={data.value} />
          </span>
        </div>
        <div className={classes.root}>
          {isExpanded ? (
            <ExpandLessIconWithStyles />
          ) : (
            <ExpandMoreIconWithStyles />
          )}
          <Link to={'/ansatt/' + data.email} target="_blank">
            <OpenInNewStyled />
          </Link>
        </div>
      </Button>
    </TableCellNoBorders>
  )
}
