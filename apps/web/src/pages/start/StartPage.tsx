import { useEffect } from 'react'
import { Grid } from '@mui/material'
import { useMatomo } from '@jonkoops/matomo-tracker-react'
import { pageTitle } from '../../utils/pagetitle'
import AdministrasjonCard from './cards/AdministrationCard'
import Communication from './cards/CommunicationCard'
import MyEmployment from './cards/MyEmploymentCard'
import OtherCard from './cards/OtherCard'
import IntroCard from './cards/IntroCard'

export default function StartPage() {
  const { trackPageView } = useMatomo()

  useEffect(() => {
    trackPageView({
      documentTitle: 'Start',
    })
    pageTitle('Start')
  }, [trackPageView])

  return (
    <Grid container spacing={2} alignItems={'stretch'}>
      <IntroCard />
      <AdministrasjonCard />
      <Communication />
      <MyEmployment />
      <OtherCard />
    </Grid>
  )
}
