import React from 'react'
import { Avatar, Button, TableCell } from '@mui/material'
import { styled } from '@mui/material/styles'
import {
  ExpandLessIcon,
  ExpandMoreIcon,
  OpenInNewIcon,
} from '../../../assets/Icons'
import FallbackUserIcon from '../../../assets/fallback_user.svg'
import { Link } from 'react-router-dom'
import { ConsultantInfo } from '../../../api/data/employee/employeeApiTypes'
import CharacterLimitBox from '../components/CharacterLimitBox'

const ComponentRoot = styled(TableCell)(() => ({
  flexDirection: 'column',
  display: 'flex',
  padding: 0,
}))

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
const EmployeeCellButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'expanded',
})<{ expanded: boolean }>(({ expanded }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: 'none',
  textDecoration: 'none',
  textTransform: 'inherit',
  padding: 0,
  width: '100%',
  height: 70,
  paddingRight: 15,
  paddingLeft: 15,
  flexDirection: 'row',
  fontWeight: expanded ? 'bold' : 'normal',
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
  return (
    <ComponentRoot component="div" align="left">
      <EmployeeCellButton
        expanded={isExpanded}
        role="button"
        disableRipple
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
          <Link
            to={`/ansatt/${consultant.email}`}
            target={`employee_${consultant.email}`}
          >
            <OpenInNewIcon />
          </Link>
        </ButtonSubRoot>
      </EmployeeCellButton>
    </ComponentRoot>
  )
}
