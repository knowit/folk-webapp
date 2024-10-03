import { Grid } from '@mui/material'
import { useEffect } from 'react'
import {
  AgeDistributionCard,
  CompetenceAmountCard,
  CompetenceAreasCard,
  CompetenceMappingCard,
  EducationCard,
  ExperienceDistributionCard,
  FagEventsCard,
  FagtimerCard,
} from './cards'
import { useMatomo } from '@jonkoops/matomo-tracker-react'
import { pageTitle } from '../../utils/pagetitle'

export default function CompetencePage() {
  const { trackPageView } = useMatomo()

  useEffect(() => {
    trackPageView({
      documentTitle: 'Kompetanse',
    })
    pageTitle('Kompetanse')
  }, [trackPageView])

  return (
    <Grid container spacing={2}>
      <CompetenceAmountCard />
      <CompetenceAreasCard />
      <ExperienceDistributionCard />
      <AgeDistributionCard />
      <FagtimerCard />
      <FagEventsCard />
      <EducationCard />
      <CompetenceMappingCard />
    </Grid>
  )
}
