import { Box, Button, Modal, styled, useTheme } from '@mui/material'
import { ReactNode, useState } from 'react'
import { EmployeeProfileInformation } from 'server/routers/employees/employeesTypes'
import { useEmployeeProfile } from '../../../api/data/employee/employeeQueries'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid black',
  boxShadow: 24,
  pl: 4,
  pr: 4,
  pt: 2,
  pb: 2,
}

const EmployeeCard = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
})

const EmployeeCardName = styled('div')({
  fontSize: '1.25rem',
  fontWeight: 600,
})

const EmployeeCardContent = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: '1rem',
  width: '100%',
})

const EmployeeCardContentLeft = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  gap: '0.5rem',
  width: '65%',
})

const EmployeeCardContentRight = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
  width: '35%',
})

const EmployeeCardField = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
})

const EmployeeCardFieldLabel = styled('div')({
  fontWeight: 600,
})

const EmployeeCardFieldValue = styled('div')({})

const EmployeeCardImage = styled('img')({
  borderRadius: '50%',
  width: '100%',
})

interface Props {
  children: ReactNode
  employee: EmployeeProfileInformation
  searchTerm: string
  [k: string]: any
}

const NameText = ({ children, employee, searchTerm, ...rest }: Props) => {
  const [openEmployeeCard, setOpenEmployeeCard] = useState(false)
  const handleOpenEmployeeCard = () => setOpenEmployeeCard(true)
  const handleCloseEmployeeCard = () => setOpenEmployeeCard(false)

  const employeeUrl = `${window.location.origin}/ansatt/${employee.email}`

  const employeeProfile = useEmployeeProfile(employee.email)
  const employeeImageUrl = employeeProfile.data?.image

  const theme = useTheme()
  const halo = theme.palette.background.paper // Stroke around the labels in case they overlap with a link
  const haloWidth = 0.2

  return (
    <>
      <text
        onClick={handleOpenEmployeeCard}
        style={{ cursor: 'pointer' }}
        stroke={halo}
        strokeWidth={haloWidth}
        paintOrder="stroke"
        fill={theme.palette.text.primary}
        opacity={
          searchTerm.length < 0
            ? 1
            : employee.name.toLowerCase().includes(searchTerm)
            ? 1
            : 0.3
        }
        {...rest}
      >
        {children}
      </text>
      <Modal open={openEmployeeCard} onClose={handleCloseEmployeeCard}>
        <Box sx={style}>
          <EmployeeCard sx={{ display: 'flex' }}>
            <EmployeeCardName>{employee.name}</EmployeeCardName>
            <EmployeeCardContent>
              <EmployeeCardContentLeft>
                <EmployeeCardField>
                  <EmployeeCardFieldLabel>{'Tittel: '}</EmployeeCardFieldLabel>
                  <EmployeeCardFieldValue>
                    {employee.title ?? 'Ingen'}
                  </EmployeeCardFieldValue>
                </EmployeeCardField>
                <EmployeeCardField>
                  <EmployeeCardFieldLabel>
                    {'Nærmeste leder: '}
                  </EmployeeCardFieldLabel>
                  <EmployeeCardFieldValue>
                    {employee.manager}
                  </EmployeeCardFieldValue>
                </EmployeeCardField>
              </EmployeeCardContentLeft>
              <EmployeeCardContentRight>
                <EmployeeCardImage src={employeeImageUrl} />
                <Button
                  fullWidth={true}
                  href={employeeUrl}
                  size="small"
                  sx={{
                    background: theme.palette.secondary.main,
                    fontSize: 10,
                  }}
                >
                  Gå til profil
                </Button>
              </EmployeeCardContentRight>
            </EmployeeCardContent>
          </EmployeeCard>
        </Box>
      </Modal>
    </>
  )
}

export default NameText
