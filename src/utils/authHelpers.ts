// access_token
export const setAccessToken = (token: string) =>
  localStorage.setItem('access_token', token)
export const getAccessToken = () => localStorage.getItem('access_token')

// access_token_expires_at
export const setAccessTokenExpiresAt = (expiresAt: number) =>
  localStorage.setItem('access_token_expires_at', JSON.stringify(expiresAt))
export const getAccessTokenExpiresAt = () =>
  localStorage.getItem('access_token_expires_at')
