import * as React from 'react'
import { makeStyles } from '@material-ui/core'
import { InfoTooltip } from '../../../components/InfoTooltip'

const useStyles = makeStyles({
  item: {
    display: 'flex',
    paddingBottom: '0.8em',
  },
  itemLabel: {
    fontWeight: 'bold',
    display: 'inline-flex',
    alignItems: 'center',
    '&:after': {
      content: "':'",
    },
  },
  itemValue: {
    marginLeft: '0.3em',
  },
  fallbackMessage: {
    fontStyle: 'italic',
  },
})

interface Props {
  label: string
  value?: string
  description?: string
}

export function CompetenceSummaryItem({ label, value, description }: Props) {
  const classes = useStyles()

  return (
    <div className={classes.item}>
      <dt className={classes.itemLabel}>
        {label}
        {description ? <InfoTooltip description={description} /> : null}
      </dt>
      <dd className={classes.itemValue}>
        {value ? (
          value
        ) : (
          <span className={classes.fallbackMessage}>
            fant ingen informasjon
          </span>
        )}
      </dd>
    </div>
  )
}
