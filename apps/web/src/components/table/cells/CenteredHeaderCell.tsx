import React from 'react'
import { tableStyles } from '../DataTable'
import { createStyles, makeStyles } from '@material-ui/core/styles'

const centeredStyle = makeStyles(() =>
  createStyles({
    centered: {
      justifyContent: 'center',
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
