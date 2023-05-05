import * as React from 'react'
import { Grid } from '@mui/material'
import { styled } from '@mui/material'
import { InfoTooltip } from '../InfoTooltip'

const ComponentRoot = styled('div', {
  shouldForwardProp: (prop) => prop !== 'big' && prop !== 'green',
})<{ big: boolean; green: boolean }>(({ theme, big, green }) => ({
  color: green ? '#FFFFFF' : theme.palette.text.primary,
  height: big ? 102.7 : green ? 70 : 65,
  backgroundColor: green ? '#00897B' : theme.palette.background.darker,
  paddingLeft: 15,
  paddingRight: 15,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: green && '100%',
  margin: green && 0,
}))

const GridHeaderTitle = styled('h2', {
  shouldForwardProp: (prop) => prop !== 'big' && prop !== 'green',
})<{ big: boolean; green: boolean }>(({ big, green }) => ({
  fontSize: big ? 30 : 24,
  fontWeight: green ? 'bold' : big ? 'normal' : 700,
  paddingLeft: big && 11,
  color: green && '#FFFFFF',
}))

interface GridItemHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode | React.ReactNode[]
  big?: boolean
  green?: boolean
}

export function GridItemHeader({
  title,
  description,
  children = null,
  big,
  green = false,
}: GridItemHeaderProps) {
  return (
    <ComponentRoot big={big} green={green}>
      <Grid container direction="row" alignItems="center">
        <GridHeaderTitle big={big} green={green}>
          {title}
        </GridHeaderTitle>
        {description ? (
          <InfoTooltip description={description} placement="right" />
        ) : null}
      </Grid>
      {children}
    </ComponentRoot>
  )
}
