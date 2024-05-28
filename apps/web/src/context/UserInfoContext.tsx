import { createContext, useEffect, useState } from 'react'
import { getUserInfo } from '../api/data/user/userApi'
import { isError } from '../api/errorHandling'
import { UserInfo } from '../api/auth/authApiTypes'

interface UserInfoContextProps {
  user: UserInfo | null | undefined
  setUser: (val: UserInfo | null) => void
}

export const UserInfoContext = createContext<UserInfoContextProps | null>(null)

const UserInfoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        /* The timeout is to prevent a user which was logged in in previous seesion from seeing the login page for a short flash.
         * When user is undefined, App component will return null, which will prevent the login page from being rendered. */
        /*  const timeout = setTimeout(
          () => {
            setUserInfo(null)
          },
          localStorage.getItem('login') ? 3000 : 0
        ) */

        const user = await getUserInfo()

        /* clearTimeout(timeout) */

        setUserInfo(user)
      } catch (error) {
        if (isError(error)) {
          setUserInfo(null)
        }
      }
    }

    fetchUser()
  }, [])

  return (
    <UserInfoContext.Provider value={{ user: userInfo, setUser: setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  )
}

export default UserInfoProvider
