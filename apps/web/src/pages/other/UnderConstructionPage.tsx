import { useEffect } from 'react'
import { Typography, Box } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { useMatomo } from '@jonkoops/matomo-tracker-react'

export default function UnderConstruction() {
  const location = useLocation()
  const { trackPageView } = useMatomo()

  useEffect(() => {
    trackPageView({
      documentTitle: `${location.pathname.split('/')[1]}`,
    })
  })

  return (
    <Box justifyContent="center">
      <Typography align="center" variant="h6">
        Under Construction: {location.pathname}
      </Typography>
    </Box>
  )
}
