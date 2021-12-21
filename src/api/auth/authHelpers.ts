import { UserInfo } from './authApiTypes'
import { ACCESS_TOKEN, ACCESS_TOKEN_EXPIRES_AT } from './constants'

// access_token
export const setAccessToken = (token: string) =>
  localStorage.setItem(ACCESS_TOKEN, token)

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN)

export const removeAccessToken = () => localStorage.removeItem(ACCESS_TOKEN)

// Expiration
export const setAccessTokenExpiresAt = (expiresAt: number) =>
  localStorage.setItem(ACCESS_TOKEN_EXPIRES_AT, JSON.stringify(expiresAt))

export const getAccessTokenExpiresAt = () => {
  const expiresAt = localStorage.getItem(ACCESS_TOKEN_EXPIRES_AT)
  return expiresAt ? +expiresAt : 0
}

export const removeAccessTokenExpiresAt = () =>
  localStorage.removeItem(ACCESS_TOKEN_EXPIRES_AT)

// Consider using localStorage.clear()
export const clearLocalStorage = () => {
  localStorage.clear()
}

export const isAccessTokenValid = (expires_at: number) => {
  // Devided by 1000 to remove milliseconds
  return new Date().getTime() / 1000 < expires_at - 10 // 10 second buffer
}

export const isLoggedIn = (user: UserInfo | null) => {
  const expiresAt = getAccessTokenExpiresAt()
  return user && isAccessTokenValid(expiresAt)
}
