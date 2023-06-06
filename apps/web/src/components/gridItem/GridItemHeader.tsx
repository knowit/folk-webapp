import * as React from 'react'
import { Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import { InfoTooltip } from '../InfoTooltip'
import { Link } from 'react-router-dom'

const ComponentRoot = styled('div', {
  shouldForwardProp: (prop) =>
    prop !== 'big' && prop !== 'green' && prop !== 'card',
})<{ big: boolean; green: boolean; card: boolean }>(
  ({ theme, big, green, card }) => ({
    color: green ? '#FFFFFF' : theme.palette.text.primary,
    height: big ? 102.7 : green ? 70 : card ? 70 : 65,
    backgroundColor: green ? '#00897B' : theme.palette.background.darker,
    paddingLeft: 15,
    paddingRight: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: green && '100%',
    margin: green && 0,
  })
)

const GridHeaderTitle = styled('h2', {
  shouldForwardProp: (prop) =>
    prop !== 'big' && prop !== 'green' && prop !== 'longTitleText',
})<{ big: boolean; green: boolean; longTitleText: boolean }>(
  ({ big, green, longTitleText }) => ({
    fontSize: big ? 30 : longTitleText ? 20 : 24,
    fontWeight: green ? 'bold' : big ? 'normal' : 700,
    paddingLeft: big && 11,
    color: green && '#FFFFFF',
  })
)

const OpenInNewLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.text.secondary,
  },
}))

interface GridItemHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode | React.ReactNode[]
  big?: boolean
  green?: boolean
  card?: boolean
  clickable?: boolean
}

export function GridItemHeader({
  title,
  description,
  children = null,
  big,
  green = false,
  card = false,
  clickable = false,
}: GridItemHeaderProps) {
  const longTitleText = title.length > 22

  return (
    <ComponentRoot big={big} green={green} card={card}>
      <Grid container direction="row" alignItems="center">
        <GridHeaderTitle big={big} green={green} longTitleText={longTitleText}>
          {card && clickable ? (
            <OpenInNewLink to={'/kunder/' + title} target="_blank">
              {title}
            </OpenInNewLink>
          ) : (
            title
          )}
        </GridHeaderTitle>
        {description ? (
          <InfoTooltip description={description} placement="right" />
        ) : null}
      </Grid>
      {children}
    </ComponentRoot>
  )
}
