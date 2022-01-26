import React from 'react'
import { useCookies } from 'react-cookie'
import { ErrorText, LoggedOutErrorText } from '../components/ErrorText'

export function DDError() {
  // eslint-disable-next-line no-console
  const [cookies] = useCookies()
  let errormessage = <p />
  if (cookies.refreshToken && !cookies.accessToken) {
    errormessage = <ErrorText height={320} />
  }
  if (!cookies.refreshToken && !cookies.accessToken) {
    errormessage = <LoggedOutErrorText height={320} />
  }
  return errormessage
}
