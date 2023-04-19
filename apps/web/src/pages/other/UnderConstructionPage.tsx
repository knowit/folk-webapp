import React from 'react'
import { Typography, Box } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { pageTitle } from '../../utils/pagetitle'

export default function UnderConstruction() {
  const location = useLocation()

  pageTitle(location.pathname.split('/')[1])

  return (
    <Box justifyContent="center">
      <Typography align="center" variant="h6">
        Under Construction: {location.pathname}
      </Typography>
    </Box>
  )
}
