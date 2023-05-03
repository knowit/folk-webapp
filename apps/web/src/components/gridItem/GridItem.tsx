import React from 'react'
import { Grid } from '@mui/material'
import { styled } from '@mui/material/styles'

const GridItemContainer = styled('div')(({ theme }) => ({
  boxShadow: `0px 4px 10px ${theme.palette.text.primary}12`,
  borderRadius: '0px 0px 6px 6px',
  overflow: 'hidden',
  height: '100%',
}))

interface GridItemProps {
  fullSize?: boolean
  children: React.ReactNode | React.ReactNode[]
}

export function GridItem({ children, fullSize = false }: GridItemProps) {
  return (
    <Grid item xs={fullSize ? 12 : 6}>
      <GridItemContainer>{children}</GridItemContainer>
    </Grid>
  )
}
