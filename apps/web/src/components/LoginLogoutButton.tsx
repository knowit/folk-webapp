import { ButtonBase } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'
import { clearLocalStorage } from '../api/auth/authHelpers'
import { useUserInfo } from '../context/UserInfoContext'

const ButtonBaseStyled = styled(ButtonBase)(() => ({
  fontSize: '15px',
  fontWeight: 'bold',
  height: 'inherit',
}))

export const LoginLogoutButton = () => {
  const { user, logout } = useUserInfo()

  let buttonText = ''
  if (!user) {
    buttonText = 'Logg inn'
  } else {
    buttonText = 'Logg ut'
  }

  const handleClick = () => {
    if (!user) {
      window.location.replace('/auth/login')
    } else {
      window.location.replace('/auth/logout')
      clearLocalStorage()
      logout()
    }
  }

  return <ButtonBaseStyled onClick={handleClick}>{buttonText}</ButtonBaseStyled>
}
