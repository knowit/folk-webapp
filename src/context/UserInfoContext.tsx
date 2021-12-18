import React, {
  createContext,
  useContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react'
import { UserInfo } from '../api/auth/authApiTypes'
import { getUserInfo } from '../api/auth/authClient'

const UserContext = createContext<UserInfo | null>(null)
export const useUserInfo = () => useContext(UserContext)

export const UserInfoProvider = ({ children }: PropsWithChildren<any>) => {
  const [fetchedUser, setFetchedUser] = useState<UserInfo | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserInfo()

      setFetchedUser(user)
    }
    fetchUser()
  }, [])

  return (
    <UserContext.Provider value={fetchedUser}>{children}</UserContext.Provider>
  )
}
