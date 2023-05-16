import * as React from 'react'
import { styled } from '@mui/material/styles'
import { InfoTooltip } from '../../../components/InfoTooltip'

const CompetenceRow = styled('div')(() => ({
  paddingBottom: '0.8em',
}))
const CompetenceRowLabel = styled('dt')(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  fontWeight: 'bold',
  '&:after': {
    content: "':'",
    marginRight: '0.3em',
  },
}))
const CompetenceRowValue = styled('dd')(() => ({
  display: 'inline',
  margin: 0,
}))
const CompetenceRowFallbackMessage = styled('span')(() => ({
  fontStyle: 'italic',
}))

interface Props {
  label: string
  value?: string
  description?: string
}

export function CompetenceSummaryItem({ label, value, description }: Props) {
  return (
    <CompetenceRow>
      <CompetenceRowLabel>
        {label}
        {description ? <InfoTooltip description={description} /> : null}
      </CompetenceRowLabel>
      <CompetenceRowValue>
        {value ? (
          value
        ) : (
          <CompetenceRowFallbackMessage>
            fant ingen informasjon
          </CompetenceRowFallbackMessage>
        )}
      </CompetenceRowValue>
    </CompetenceRow>
  )
}
