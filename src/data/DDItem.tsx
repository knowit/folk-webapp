import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { useFetchedData } from '../hooks/service'
import {
  GridItem,
  GridItemHeader,
  GridItemContent,
} from '../components/GridItem'
import DDTable from './DDTable'
import DDChart from './DDChart'
import { ErrorText, LoggedOutErrorText } from '../components/ErrorText'
import { DDPayload } from './types'
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
  url,
  title,
  description,
  Component,
  SkeletonComponent,
  HeaderSkeletonComponent = () => (
    <Skeleton variant="rect" height={43} width={120} animation="wave" />
  ),
  fullSize = false,
  dataComponentProps = {},
}: DDItemProps) {
  const [payload, pending, error] = useFetchedData<DDPayload>({ url })

  return (
    <GridItem fullSize={fullSize}>
      {pending || error || !payload ? (
        <>
          <GridItemHeader title={title}>
            {pending && !error ? <HeaderSkeletonComponent /> : null}
          </GridItemHeader>
          <GridItemContent>
            {error && <DDError error={error} />}
            {pending && !error && <SkeletonComponent />}
          </GridItemContent>
        </>
      ) : (
        <Component
          payload={payload}
          title={title}
          description={description}
          props={dataComponentProps}
        />
      )}
    </GridItem>
  )
}

export { DDTable, DDChart }
