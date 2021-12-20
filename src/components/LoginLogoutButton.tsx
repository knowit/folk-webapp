import { ButtonBase } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { clearLocalStorage } from '../api/auth/authHelpers'
import { useUserInfo } from '../context/UserInfoContext'

const useStyles = makeStyles(() =>
  createStyles({
    buttonItem: {
      fontSize: '15px',
      fontWeight: 'bold',
      color: '#F1F0ED',
      paddingLeft: '13.75px',
      paddingRight: '13.75px',
      marginLeft: '13.75px',
      marginRight: '13.75px',
      height: 'inherit',
    },
  })
)

export const LoginLogoutButton = () => {
  const { user, setUser } = useUserInfo()
  const classes = useStyles()

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
      setUser(null)
    }
  }

  return (
    <ButtonBase className={`${classes.buttonItem}`} onClick={handleClick}>
      {buttonText}
    </ButtonBase>
  )
}
