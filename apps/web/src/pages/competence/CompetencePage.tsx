import { Grid } from '@mui/material'
import React from 'react'
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
import { pageTitle } from '../../utils/pagetitle'

export default function CompetencePage() {
  pageTitle('Kompetanse')
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
