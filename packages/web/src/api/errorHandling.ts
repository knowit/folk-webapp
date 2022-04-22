export interface ApiError {
  status: number
  message: string
  errorType: 'API'
}

export interface AuthError {
  message: string
  errorType: 'AUTH'
}

export type Error = ApiError | AuthError

export const isError = (e: unknown): e is Error => {
  return (e as Error).errorType !== undefined
}
