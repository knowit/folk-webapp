import { Button } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'

const LoginPage = () => {
  const history = useHistory()

  const onClickHandler = () => {
    console.log('clicked')
    window.location.replace('/auth/login')
  }

  return (
    <div>
      <Button onClick={onClickHandler}>Logg Inn</Button>
    </div>
  )
}

export default LoginPage
