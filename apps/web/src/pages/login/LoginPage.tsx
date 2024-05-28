import { useMatomo } from '@jonkoops/matomo-tracker-react'
import { useEffect } from 'react'
import LoginLogoutButton from '../../components/LoginLogoutButton'

const LoginPage = () => {
  const { trackPageView } = useMatomo()

  useEffect(() => {
    trackPageView({
      documentTitle: 'Login',
    })
  })

  return (
    <div>
      <LoginLogoutButton />
    </div>
  )
}

export default LoginPage
