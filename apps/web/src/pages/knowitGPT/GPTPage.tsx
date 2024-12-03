import { Grid } from '@mui/material'
import { useEffect } from 'react'

import { useMatomo } from '@jonkoops/matomo-tracker-react'
import { pageTitle } from '../../utils/pagetitle'
import { GPTChat } from './components/GPTChat'

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
      <GPTChat></GPTChat>
    </Grid>
  )
}
