import { createContext, useEffect, useState } from 'react'
import { getEmployeeProfile } from '../api/data/employee/employeeApi'
import { getUserInfo } from '../api/data/user/userApi'
import { isError } from '../api/errorHandling'
import { EmployeeProfileResponse } from '../api/data/employee/employeeApiTypes'
import { UserInfo } from '../api/auth/authApiTypes'

interface UserInfoContextProps {
  user: UserInfo | null | undefined
  setUser: (val: UserInfo | null) => void
  userEmployeeProfile: EmployeeProfileResponse
}

export const UserInfoContext = createContext<UserInfoContextProps | null>(null)

const UserInfoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [userEmployeeProfile, setUserEmployeeProfile] =
    useState<EmployeeProfileResponse>()

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getUserInfo()
        setUserInfo(user)
      } catch (error) {
        if (isError(error)) {
          setUserInfo(null)
        }
      }
    }

    fetchUser()
  }, [])

  useEffect(() => {
    async function fetchEmployeeProfile() {
      if (userInfo) {
        const userEmail = userInfo.email?.toLowerCase()
        if (userEmail) {
          const data = await getEmployeeProfile(userEmail)
          setUserEmployeeProfile(data)
        }
      } else {
        setUserEmployeeProfile(null)
      }
    }

    fetchEmployeeProfile()
  }, [userInfo])

  return (
    <UserInfoContext.Provider
      value={{
        user: userInfo,
        setUser: setUserInfo,
        userEmployeeProfile,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  )
}

export default UserInfoProvider
