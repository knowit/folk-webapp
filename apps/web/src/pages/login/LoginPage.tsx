import { useMatomo } from '@jonkoops/matomo-tracker-react'
import { Button } from '@mui/material'
import { useEffect } from 'react'

const LoginPage = () => {
  const { trackPageView } = useMatomo()

  const onClickHandler = () => {
    console.log('clicked')
    window.location.replace('/auth/login')
  }

  useEffect(() => {
    trackPageView({
      documentTitle: 'Login',
    })
  })

  return (
    <div>
      <Button onClick={onClickHandler}>Logg Inn</Button>
    </div>
  )
}

export default LoginPage
