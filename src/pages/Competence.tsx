import { Grid } from '@material-ui/core'
import React from 'react'
import {
  useAgeDistributionCharts,
  useCompetenceAmountCharts,
  useCompetenceAreasCharts,
  useCompetenceMappingCharts,
  useEducationCharts,
  useExperienceDistributionCharts,
  useFagEventsCharts,
  useFagtimerCharts,
} from '../api/data/competence/competenceQueries'
import ChartCard from '../components/charts/ChartCard'

export default function Competence() {
  const { data: competenceAmountData } = useCompetenceAmountCharts()
  const { data: competenceAreasData } = useCompetenceAreasCharts()
  const { data: experienceDistributionData } = useExperienceDistributionCharts()
  const { data: ageDistributionData } = useAgeDistributionCharts()
  const { data: fagtimerData } = useFagtimerCharts()
  const { data: fagEventsData } = useFagEventsCharts()
  const { data: educationData } = useEducationCharts()
  const { data: competenceMappingData } = useCompetenceMappingCharts()

  return (
    <Grid container spacing={2}>
      {competenceAmountData && (
        <ChartCard
          title="Kompetansemengde"
          description="Andel ansatte som har svart 3 eller mer på kompetansekartleggingen"
          data={competenceAmountData}
        />
      )}

      {competenceAreasData && (
        <ChartCard title="Kompetanseområder" data={competenceAreasData} />
      )}

      {experienceDistributionData && (
        <ChartCard title="Erfaring" data={experienceDistributionData} />
      )}

      {ageDistributionData && (
        <ChartCard title="Alder" data={ageDistributionData} />
      )}

      {fagtimerData && (
        <ChartCard
          title="Aktivitet faggrupper"
          description="Hver vertikal akse viser antall unike fag aktiviteter per uke, deulike linjene representerer de ulike årene"
          data={fagtimerData}
        />
      )}

      {fagEventsData && (
        <ChartCard
          title="Fag og hendelser"
          description="Hver vertikal akse viser antall unike hendelser per måned fra Google kalenderne Knowit Events og Knowit Fagkalender."
          data={fagEventsData}
        />
      )}

      {educationData && <ChartCard title="Utdannelse" data={educationData} />}

      {competenceMappingData && (
        <ChartCard
          title="Kompetansekartlegging"
          description="Grafen viser gjennomsnittlig score på kompetanse/motivasjon innenfor hver av hovedkategoriene. I tillegg vises gjennomsnittlig score for hver underkategori og forholdet mellom underkategoriene i samme hovedkategori."
          data={competenceMappingData}
        />
      )}
    </Grid>
  )
}
