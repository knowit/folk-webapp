import { useContext, useEffect, useState } from 'react'
import { UserInfoContext } from '../context/UserInfoContext'
import { useAuthenticator } from '@aws-amplify/ui-react'

export function useUserInfo() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const userInfoContext = useContext(UserInfoContext)
  const { authStatus } = useAuthenticator((context) => [context.authStatus])
  const { user, setUser } = userInfoContext

  useEffect(() => {
    setIsAuthenticated(authStatus === 'authenticated')
  }, [authStatus])

  return { user, setUser, isAuthenticated }
}
