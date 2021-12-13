import { DDPassProps, DDPayload } from './types'
import { Column } from './DDTable'
import { GridItem } from '../components/GridItem'
import React from 'react'

export interface SimpleComponentProps {
  payload: DDPayload;
  props: DDPassProps;
  callback?(columns: Column[]): void;
}

export interface SimpleItemProps {
  fullSize?: boolean;
  dataComponentProps?: DDPassProps;
  Component: (props: SimpleComponentProps ) => JSX.Element;
  payload: DDPayload;
  callback?(columns: Column[]): void;
}

export function SimpleDDItem({Component, fullSize, payload, callback, dataComponentProps = {}}: SimpleItemProps ) {
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
