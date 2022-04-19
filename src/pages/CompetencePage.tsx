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
} from './competence/'

export default function Competence() {
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
