import React from 'react'
import { Avatar, Button } from '@mui/material'
import { TableCell } from '@mui/material'
import { createStyles, makeStyles, DefaultTheme } from '@mui/styles'
import { styled } from '@mui/material/styles'
import { ReactComponent as FallbackUserIcon } from '../../../assets/fallback_user.svg'
import CharacterLimitBox from '../components/CharacterLimitBox'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { OpenInNew } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { ConsultantInfo } from '../../../api/data/employee/employeeApiTypes'

const useCompetenceMappingStyles = makeStyles((theme: DefaultTheme) =>
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
const TableCellNoBorders = styled(TableCell)(() => ({
  borderBottom: '1px solid #F1F0ED',
}))
const ExpandMoreIconWithStyles = styled(ExpandMoreIcon)(() => ({
  color: '#707070',
  cursor: 'pointer',
  '&:hover': {
    color: '#333333',
  },
}))
const ExpandLessIconWithStyles = styled(ExpandLessIcon)(() => ({
  color: '#707070',
  cursor: 'pointer',
  '&:hover': {
    color: '#333333',
  },
}))
export const OpenInNewWithStyles = styled(OpenInNew)(() => ({
  color: '#707070',
  cursor: 'pointer',
  '&:hover': {
    color: '#333333',
  },
}))

interface ConsultantCellProps {
  data: ConsultantInfo
  id: string
  isExpanded: boolean
  toggleExpand: (id: string) => void
}

export default function ConsultantCell({
  data: consultant,
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
          {consultant.image_url ? (
            <Avatar
              alt={consultant.name}
              className={classes.image}
              src={consultant.image_url}
            />
          ) : (
            <Avatar alt={consultant.name} className={classes.image}>
              <FallbackUserIcon className={classes.image} />
            </Avatar>
          )}
          <span className={classes.text}>
            <CharacterLimitBox text={consultant.name} />
          </span>
        </div>
        <div className={classes.root}>
          {isExpanded ? (
            <ExpandLessIconWithStyles />
          ) : (
            <ExpandMoreIconWithStyles />
          )}
          <Link to={'/ansatt/' + consultant.email} target="_blank">
            <OpenInNewWithStyles />
          </Link>
        </div>
      </Button>
    </TableCellNoBorders>
  )
}
