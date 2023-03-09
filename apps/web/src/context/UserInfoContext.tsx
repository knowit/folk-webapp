import React, { createContext, useContext, useEffect, useState } from 'react'
import { UserInfo } from '../api/auth/authApiTypes'
import { getUserInfo } from '../api/data/user/userApi'

import { isError } from '../api/errorHandling'

interface UserContextProps {
  user: UserInfo | null | undefined
  setUser: (val: UserInfo | null) => void
}
interface UserInfoProviderProps {
  children: React.ReactNode
}

const UserContext = createContext<UserContextProps | null>(null)

export const useUserInfo = () => {
  const userContext = useContext(UserContext)

  if (userContext === null) {
    throw Error('UserInfoProvider not existing')
  }

  const { user, setUser } = userContext
  const logout = () => setUser(null)

  return { user, logout }
}

export const UserInfoProvider: React.FC<UserInfoProviderProps> = ({
  children,
}) => {
  const [fetchedUser, setFetchedUser] = useState<UserInfo | null>(undefined)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        /* The timeout is to prevent a user which was logged in in previous seesion from seeing the login page for a short flash.
         * When user is undefined, App component will return null, which will prevent the login page from being rendered. */
        const timeout = setTimeout(
          () => {
            setFetchedUser(null)
          },
          localStorage.getItem('login') ? 3000 : 0
        )
        const user = await getUserInfo()
        clearTimeout(timeout)
        setFetchedUser(user)
      } catch (error) {
        if (isError(error)) {
          setFetchedUser(null)
        }
      }
    }
    fetchUser()
  }, [])

  return (
    <UserContext.Provider
      value={{ user: fetchedUser, setUser: setFetchedUser }}
    >
      {children}
    </UserContext.Provider>
  )
}
