// access_token
export const setAccessToken = (token: string) =>
  localStorage.setItem('access_token', token)
export const getAccessToken = () => localStorage.getItem('access_token')

// Expiration
export const setAccessTokenExpiresAt = (expiresAt: number) =>
  localStorage.setItem('access_token_expires_at', JSON.stringify(expiresAt))

export const getAccessTokenExpiresAt = () => {
  const expiresAt = localStorage.getItem('access_token_expires_at')
  return expiresAt ? JSON.parse(expiresAt) : 0
}

export const isAccessTokenValid = () => {
  // Devided by 1000 to remove milliseconds
  return new Date().getTime() / 1000 < getAccessTokenExpiresAt() - 10 // 10 second buffer
}
