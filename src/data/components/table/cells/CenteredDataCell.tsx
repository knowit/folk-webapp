import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'

const centeredStyle = makeStyles(() =>
  createStyles({
    centered: {
      justifyContent: 'center',
      margin: '0 auto',
    },
  })
)

export default function CenteredDataCell({ data }: { data: any }) {
  const centerClass = centeredStyle()

  return <div className={centerClass.centered}>{data}</div>
}
