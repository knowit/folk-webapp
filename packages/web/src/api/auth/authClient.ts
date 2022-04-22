import axios from 'axios'
import { AuthError } from '../errorHandling'
import { RenewResponse } from './authApiTypes'
import { setAccessToken, setAccessTokenExpiresAt } from './authHelpers'

const BASE_URL = '/auth'

const headers = {
  'Content-Type': 'application/json',
}

const instance = axios.create({
  baseURL: BASE_URL,
  headers,
})

/**
 * Uses the refreshToken stored in cookies to renew the access token.
 * @returns the new accessToken and its expiration time
 */
export const renewAccessToken = async () => {
  try {
    const {
      data: { accessToken, expiresAt },
    } = await instance.post<RenewResponse>('/refresh')

    return { accessToken, accessTokenExpiresAt: expiresAt }
  } catch (e) {
    const error: AuthError = {
      message: 'Unauthorized. Could not renew auth.',
      errorType: 'AUTH',
    }
    return Promise.reject(error)
  }
}

export const renewAuth = () =>
  renewAccessToken().then((auth) => {
    setAccessToken(auth.accessToken)
    setAccessTokenExpiresAt(auth.accessTokenExpiresAt)
    return auth
  })
