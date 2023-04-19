import { Button } from '@mui/material'
import React from 'react'
import { pageTitle } from '../../utils/pagetitle'

const LoginPage = () => {
  const onClickHandler = () => {
    console.log('clicked')
    window.location.replace('/auth/login')
  }

  pageTitle('Login')

  return (
    <div>
      <Button onClick={onClickHandler}>Logg Inn</Button>
    </div>
  )
}

export default LoginPage
