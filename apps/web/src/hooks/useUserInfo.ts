import { useContext, useEffect, useState } from 'react'
import { UserInfoContext } from '../context/UserInfoContext'
import { useAuthenticator } from '@aws-amplify/ui-react'

export function useUserInfo() {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const userInfoContext = useContext(UserInfoContext)
  const { authStatus } = useAuthenticator((context) => [context.authStatus])
  const { user, setUser, userEmployeeProfile } = userInfoContext

  useEffect(() => {
    if (user) {
      setIsAuthenticated(authStatus === 'authenticated')
    }
  }, [authStatus, user, userEmployeeProfile])

  return { user, setUser, isAuthenticated, userEmployeeProfile }
}
