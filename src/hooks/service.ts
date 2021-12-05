import { useCallback, useState, useEffect } from 'react'
import { useAPIToken } from '../authToken'

type AsyncFunction<T> = ((...args: any[]) => Promise<T>) | (() => Promise<T>)
type AsyncData<T, K> = [(...args: any[]) => void, boolean, T | null, K | null]

type ServiceCall<T> = [
  T | null,
  boolean,
  Error | null,
  ((...args: any[]) => void) | (() => void)
]

type FetchedCall<T> = [T | null, boolean, Error | null]

interface FetchData {
  url: string
  method?: string
}

export function useAsync<T, K = Error>(
  asyncFunction: AsyncFunction<T>
): AsyncData<T, K> {
  const [pending, setPending] = useState(false)
  const [value, setValue] = useState<T | null>(null)
  const [error, setError] = useState<K | null>(null)

  const execute = useCallback(
    async (...args: any[]) => {
      setPending(true)
      setValue(null)
      setError(null)

      try {
        const result = await asyncFunction(...args)
        setValue(result)
      } catch (e: any) {
        setError(e)
      }

      setPending(false)
    },
    [asyncFunction]
  )

  return [execute, pending, value, error]
}

export function useServiceCall<T>({
  url,
  method = 'GET',
}: FetchData): ServiceCall<T> {
  const token = useAPIToken()

  const fetcher = useCallback(async () => {
    if (!token) return Promise.reject(new Error('Unauthorized'))
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(new Error(res.statusText))
    )
  }, [token, url, method])

  const [handler, pending, value, error] = useAsync<T>(fetcher)

  return [value, pending, error, handler]
}

export function useFetchedData<T>(props: FetchData): FetchedCall<T> {
  const [value, pending, error, handler] = useServiceCall<T>(props)

  useEffect(() => {
    handler()
  }, [handler])

  return [value, pending, error]
}
