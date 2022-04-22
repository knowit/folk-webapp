import { Grid } from '@material-ui/core'
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

export default function CompetencePage() {
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
