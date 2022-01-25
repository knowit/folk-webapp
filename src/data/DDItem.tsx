import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { GridItem } from '../components/GridItem'
import DDTable from './DDTable'
import DDChart from './DDChart'
import { ErrorText, LoggedOutErrorText } from '../components/ErrorText'
import { DDItemProps } from './types'
import { useCookies } from 'react-cookie'

interface DDErrorProps {
  error: Error
}

function DDError({ error }: DDErrorProps) {
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

export default function DDItem({
  fetchHook,
  title,
  description,
  dataComponentProps,
  fullSize = false,
}: DDItemProps) {
  const data = fetchHook().data

  console.log(data, title)

  return (
    <GridItem fullSize={fullSize}>
      {data ? (
        <DDChart
          payload={data}
          title={title}
          description={description}
          props={dataComponentProps}
          fullsize={true}
        />
      ) : (
        <Skeleton variant="rect" height={320} width={400} animation="wave" />
      )}
    </GridItem>
  )
}

export { DDTable, DDChart }
