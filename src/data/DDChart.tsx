import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { GridItem } from '../components/GridItem'
import Chart from './components/chart/Chart'
import { DDItemProps } from './types'
import { DDError } from './DDError'

export default function DDChart({
  fetchHook,
  title,
  description,
  dataComponentProps,
  fullSize = false,
}: DDItemProps) {
  const { data, error } = fetchHook()

  if (error) {
    return <DDError />
  }

  return (
    <GridItem fullSize={fullSize}>
      {data ? (
        <Chart
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
