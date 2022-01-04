import { UserInfo } from '../../auth/authApiTypes'
import { getAtAuth } from '../../client'

export const getUserInfo = () => getAtAuth<UserInfo>('/userInfo')
