import { Grid } from '@mui/material'
import { useEffect } from 'react'

import { useMatomo } from '@jonkoops/matomo-tracker-react'
import { pageTitle } from '../../utils/pagetitle'
import { ChatBot } from './components/ChatBot'

export default function GPTPage() {
  const { trackPageView } = useMatomo()

  useEffect(() => {
    trackPageView({
      documentTitle: 'KnowitGPT',
    })
    pageTitle('KnowitGPT')
  }, [trackPageView])

  return (
    <Grid container spacing={2}>
      <ChatBot></ChatBot>
    </Grid>
  )
}
