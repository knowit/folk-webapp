import { AxiosError } from 'axios'

export interface NotFoundError {
  status: 404
  message: string
}

export interface ParamError {
  status: 400
  message: string
}

export interface ApiError {
  errorType: 'API'
  status: number
  message: string
  error: AxiosError
}

export interface AuthError {
  errorType: 'AUTH'
  status: number
  message: string
  error: AxiosError
}

type AppError = ApiError | AuthError

const isAppError = (e: unknown): e is AppError => {
  return (e as AppError).errorType !== undefined
}

const isNotFoundError = (e: unknown): e is NotFoundError => {
  return (e as NotFoundError).status === 404
}

const isParamError = (e: unknown): e is ParamError => {
  return (e as ParamError).status === 400
}

export const errorHandler = (err, req, res, next) => {
  console.log('An error has occured!')
  console.log('Path: ', req.path)

  // App error
  if (isAppError(err)) {
    console.error(err.error.response.data)
    res.status(err.status).send(err.message)

    // Parameter missing
  } else if (isParamError(err)) {
    console.error(err.message)
    res.status(400).send('Missing parameters.')

    // 404
  } else if (isNotFoundError(err)) {
    console.error(err.message)
    res.status(404).send('Endpoint does not exist.')

    // Other
  } else {
    console.error(err)
    res.status(500).send('Something broke!')
  }
}
