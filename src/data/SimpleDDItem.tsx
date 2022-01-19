import { Columns, DDPassProps, DDPayload } from './types'
import { GridItem } from '../components/GridItem'
import React from 'react'

export interface SimpleComponentProps {
  payload: DDPayload
  props: DDPassProps
  callback: (columns: Columns[]) => void
}

export interface SimpleItemProps {
  payload: DDPayload
  Component: (props: SimpleComponentProps) => JSX.Element
  callback: (columns: Columns[]) => void
  fullSize?: boolean
  dataComponentProps?: DDPassProps
}

export function SimpleDDItem({
  Component,
  fullSize,
  payload,
  callback,
  dataComponentProps = {},
}: SimpleItemProps) {
  return (
    <GridItem fullSize={fullSize}>
      <Component
        callback={callback}
        payload={payload}
        props={dataComponentProps}
      />
    </GridItem>
  )
}
