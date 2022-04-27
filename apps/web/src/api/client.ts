import axios from 'axios'
import { renewAuth } from './auth/authClient'
import {
  getAccessToken,
  getAccessTokenExpiresAt,
  isAccessTokenValid,
} from './auth/authHelpers'
import { ApiError } from './errorHandling'

const BASE_URL = '/'

const instance = axios.create({
  baseURL: BASE_URL,
})

interface GetOptions {
  forceAuth?: boolean
  params?: any
}

/**
 * Returns data at specific data source.
 *
 * @param endpoint endpoint for data source
 * @param options
 * @returns the data at the endpoint
 */
const getAt = async <T>(endpoint: string, options?: GetOptions) => {
  const expiresAt = getAccessTokenExpiresAt()
  // Attempt to renew if a user is present and has a valid token/it is to be forced.
  if (options?.forceAuth || !isAccessTokenValid(expiresAt)) {
    try {
      await renewAuth()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const accessToken = getAccessToken()

  try {
    const res = await instance.get<T>(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      params: { ...options?.params },
    })

    return res.data
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const err: ApiError = {
        status: e.response?.status ?? 400,
        message: (e.response?.data as any) ?? '',
        errorType: 'API',
      }
      return Promise.reject(err)
    }

    return Promise.reject(e)
  }
}

export const getAtApi = <T>(endpoint: string, options?: GetOptions) =>
  getAt<T>(`/api${endpoint}`, options)

export const getAtApiV2 = <T>(endpoint: string, options?: GetOptions) =>
  getAt<T>(`/api/v2${endpoint}`, options)

export const getAtAuth = <T>(endpoint: string, options?: GetOptions) =>
  getAt<T>(`/auth${endpoint}`, options)

// For testing only
export const getTestV2 = <T>(endpoint: string, options?: GetOptions) =>
  getAt<T>(`/api/v2${endpoint}`, options)
