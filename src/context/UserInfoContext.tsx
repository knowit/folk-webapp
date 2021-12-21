import React, { createContext, useContext, useEffect, useState } from 'react'
import { UserInfo } from '../api/auth/authApiTypes'
import { getUserInfo } from '../api/data/user/userApi'

import { isError } from '../api/errorHandling'

interface UserContextProps {
  user: UserInfo | null
  setUser: (val: UserInfo | null) => void
}

const UserContext = createContext<UserContextProps | null>(null)

export const useUserInfo = () => {
  const userContext = useContext(UserContext)

  if (userContext === null) {
    throw Error('UserInfoProvider not existing')
  }

  return userContext
}

export const UserInfoProvider: React.FC = ({ children }) => {
  const [fetchedUser, setFetchedUser] = useState<UserInfo | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserInfo()

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
