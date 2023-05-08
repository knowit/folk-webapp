import { makeStyles } from '@mui/styles'
import * as React from 'react'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    lineHeight: '1.25em',
    fontSize: '16px',
    flexDirection: 'column',
    padding: '10px',
  },
  header: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    '& > *:not(:first-child)': {
      marginLeft: '25px',
      flexGrow: 1,
    },
  },
  body: {
    display: 'flex',
    padding: '10px',
    flexDirection: 'row',
    '& section': {
      marginTop: '25px',
    },
  },
  column: {
    flexGrow: 1,
    flexBasis: '50%',
    maxWidth: '50%', // Chart does not honor flexBasis
    '&:not(:first-child)': {
      marginLeft: '50px',
    },
  },
})

interface Props {
  customerId: string
}

export function CustomerSiteContent({ customerId }: Props) {
  const classes = useStyles()

  return (
    <article className={classes.root}>
      <div className={classes.header}>
        <h1> {customerId} </h1>
      </div>
      <div className={classes.body}>
        <div className={classes.column}></div>
      </div>
    </article>
  )
}
