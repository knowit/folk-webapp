export interface AuthError {
  status: number
  message: string
}

// refresh
export interface RenewResponse {
  accessToken: string
  expiresAt: number
  expiration: number
  sameSite: boolean
  secure: boolean
}

// userInfo
export interface UserInfo {
  name?: string
  email?: string
  picture?: string
}
