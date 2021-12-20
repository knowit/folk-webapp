import React from 'react'
import { tableStyles } from '../DataTable'
import { createStyles, makeStyles } from '@material-ui/core/styles'

const centeredStyle = makeStyles(() =>
  createStyles({
    centered: {
      justifyContent: 'center',
      margin: '0 auto',
    },
  })
)

export default function CenteredHeaderCell({ title }: { title: string }) {
  const classes = tableStyles()
  const centerClass = centeredStyle()

  return (
    <div className={[classes.tableHead, centerClass.centered].join(' ')}>
      {title}
    </div>
  )
}

export function CenteredDataCell({ data }: { data: any }) {
  const centerClass = centeredStyle()

  return <div className={centerClass.centered}>{data}</div>
}
