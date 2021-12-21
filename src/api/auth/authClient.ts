import axios from 'axios'
import { Error } from '../errorHandling'
import { RenewResponse, UserInfo } from './authApiTypes'
import {
  getAccessToken,
  getAccessTokenExpiresAt,
  isAccessTokenValid,
  setAccessToken,
  setAccessTokenExpiresAt,
} from './authHelpers'

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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('Could not renew access token.')
    }

    return { accessToken: null, accessTokenExpiresAt: null }
  }
}

export const renewAuth = async () => {
  const { accessToken, accessTokenExpiresAt } = await renewAccessToken()

  if (!(accessToken && accessTokenExpiresAt)) return false

  setAccessToken(accessToken)
  setAccessTokenExpiresAt(accessTokenExpiresAt)

  return true
}

/**
 * Returns data at specific auth source.
 *
 * @param endpoint endpoint for data source
 * @param options
 * @returns the data at the endpoint
 */
export const getAtAuth = async <T>(
  endpoint: string,
  options?: {
    forceAuth?: boolean
  }
) => {
  const expiresAt = getAccessTokenExpiresAt()
  // Attempt to renew if a user is present and has a valid token/it is to be forced.
  if (options?.forceAuth || !isAccessTokenValid(expiresAt)) {
    const renewed = await renewAuth()

    if (!renewed) {
      const error: Error = {
        message: 'Unauthorized. Could not renew auth.',
        errorType: 'AUTH',
      }
      Promise.reject(error)
    }
  }

  const accessToken = getAccessToken()
  const res = await instance.get<T>(endpoint, {
    headers: {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return res.data
}

export const getUserInfo = async () => getAtAuth<UserInfo | null>('/userInfo')
