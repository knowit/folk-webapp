export interface ApiError {
  status: number
  message: string
}

export interface RenewResponse {
  accessToken: string
  expiresAt: number
  expiration: number
  sameSite: boolean
  secure: boolean
}
