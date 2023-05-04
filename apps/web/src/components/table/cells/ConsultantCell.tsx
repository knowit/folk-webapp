import React from 'react'
import { Avatar, Button } from '@mui/material'
import { TableCell } from '@mui/material'
import { createStyles, makeStyles, DefaultTheme } from '@mui/styles'
import { styled } from '@mui/material/styles'
import { ExpandLessIcon, ExpandMoreIcon } from '../../../assets/Icons'
import { ReactComponent as FallbackUserIcon } from '../../../assets/fallback_user.svg'
import CharacterLimitBox from '../components/CharacterLimitBox'
import { OpenIneNewIcon } from '../../../assets/Icons'
import { Link } from 'react-router-dom'
import { ConsultantInfo } from '../../../api/data/employee/employeeApiTypes'

const ButtonSubRoot = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}))
const EmployeeName = styled('span')(() => ({
  marginTop: 'auto',
  marginBottom: 'auto',
  marginLeft: 15,
}))
const AvatarStyled = styled(Avatar)(() => ({
  width: 50,
  height: 50,
}))
const FallbackUserIconStyled = styled(FallbackUserIcon)(() => ({
  width: 50,
  height: 50,
}))
const useCompetenceMappingStyles = makeStyles((theme: DefaultTheme) =>
  createStyles({
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
    <TableCell
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
        <ButtonSubRoot>
          {consultant.image_url ? (
            <AvatarStyled alt={consultant.name} src={consultant.image_url} />
          ) : (
            <AvatarStyled alt={consultant.name}>
              <FallbackUserIconStyled />
            </AvatarStyled>
          )}
          <EmployeeName>
            <CharacterLimitBox text={consultant.name} />
          </EmployeeName>
        </ButtonSubRoot>
        <ButtonSubRoot>
          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          <Link to={'/ansatt/' + consultant.email} target="_blank">
            <OpenIneNewIcon />
          </Link>
        </ButtonSubRoot>
      </Button>
    </TableCell>
  )
}
