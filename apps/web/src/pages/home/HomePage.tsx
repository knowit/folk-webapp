import { useEffect } from 'react'
import { Grid } from '@mui/material'
import { useMatomo } from '@jonkoops/matomo-tracker-react'
import { pageTitle } from '../../utils/pagetitle'
import IntroCard from './cards/IntroCard'
import LinksCard from './cards/LinksCard'
import { employmentLinks } from './cards/MyEmployment'
import { communicationLinks } from './cards/Communication'
import { administrationLinks } from './cards/Administration'
import { otherLinks } from './cards/Other'

export default function HomePage() {
  const { trackPageView } = useMatomo()

  useEffect(() => {
    trackPageView({
      documentTitle: 'Hjem',
    })
    pageTitle('Hjem')
  }, [trackPageView])

  return (
    <Grid container spacing={2} alignItems={'stretch'}>
      <IntroCard />
      <LinksCard title="Administrasjon" links={administrationLinks} />
      <LinksCard title="Kommunikasjon" links={communicationLinks} />
      <LinksCard title="Min ansettelse" links={employmentLinks} />
      <LinksCard title="Annet" links={otherLinks} />
    </Grid>
  )
}
