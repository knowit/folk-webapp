import React, { createContext, useContext, useEffect, useState } from 'react'
import { UserInfo } from '../api/auth/authApiTypes'
import { getUserInfo } from '../api/auth/authClient'

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
      const user = await getUserInfo()

      setFetchedUser(user)
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
