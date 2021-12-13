import React, { createContext, useContext, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useFetchedData } from './hooks/service'
import { AuthContext, renewToken } from './authToken'

interface UserInfo {
  name?: string
  email?: string
  picture?: string
}

const UserContext = createContext<UserInfo>({})

export const useUserInfo = () => useContext(UserContext)

const UserInfoProvider = ({
  children,
}: React.PropsWithChildren<React.ReactNode>) => {
  const [userInfo, pending, error] = useFetchedData<UserInfo>({
    url: '/auth/userInfo',
  })

  const value = pending || error ? {} : userInfo || {}
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default function LoginProvider({
  children,
}: React.PropsWithChildren<React.ReactNode>) {
  const [cookies, setCookie] = useCookies()

  useEffect(() => {
    if (cookies.accessToken && cookies.refreshToken) {
      const interval = setInterval(async () => {
        console.log('Interval started')
        const renewedAccessToken = await renewToken(
          cookies.accessToken,
          cookies.refreshToken
        )
        if (renewedAccessToken)
          setCookie('accessToken', renewedAccessToken.accessToken, {
            maxAge: renewedAccessToken.expiration,
            sameSite: renewedAccessToken.sameSite,
            secure: renewedAccessToken.secure,
          })
      }, 600000)

      return () => clearInterval(interval)
    }
  }, [cookies])

  return (
    <AuthContext.Provider value={cookies.accessToken}>
      <UserInfoProvider>{children}</UserInfoProvider>
    </AuthContext.Provider>
  )
}
