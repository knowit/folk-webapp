import { ApiError } from './errorHandling'
import { fetchAuthSession } from 'aws-amplify/auth'
import axios from 'axios'

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
  const session = await fetchAuthSession({ forceRefresh: true })

  try {
    const res = await instance.get<T>(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.tokens?.accessToken.toString()}`,
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

export const getAtApiV2 = <T>(endpoint: string, options?: GetOptions) =>
  getAt<T>(`/api/v2${endpoint}`, options)

export const getAtAuth = <T>(endpoint: string, options?: GetOptions) =>
  getAt<T>(`/auth${endpoint}`, options)
