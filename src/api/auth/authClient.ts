import axios from 'axios'
import { RenewResponse, UserInfo } from './authApiTypes'
import {
  getAccessToken,
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
  const {
    data: { accessToken, expiresAt },
  } = await instance.post<RenewResponse>('/refresh')

  return { accessToken, accessTokenExpiresAt: expiresAt }
}

export const renewAuth = async () => {
  const { accessToken, accessTokenExpiresAt } = await renewAccessToken()

  // TODO: Imrove correct error handling
  if (!(accessToken && accessTokenExpiresAt))
    throw new Error('Unable to renew auth.')

  setAccessToken(accessToken)
  setAccessTokenExpiresAt(accessTokenExpiresAt)
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
  if (options?.forceAuth || !isAccessTokenValid()) {
    console.log('Renewing auth')
    await renewAuth()
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

export const getUserInfo = () => getAtAuth<UserInfo>('/userInfo')
