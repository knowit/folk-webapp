import axios from 'axios'
import { RenewResponse } from './authApiTypes'

const BASE_URL = '/auth'

const instance = axios.create({
  baseURL: BASE_URL,
})

/**
 * Uses the refreshToken stored in cookies to renew the access token.
 * @returns the new accessToken and its expiration time
 */
export const renewAccessToken = async () => {
  const {
    data: { accessToken, expiresAt },
  } = await instance.post<RenewResponse>('/refresh', {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return { accessToken, accessTokenExpiresAt: expiresAt }
}
