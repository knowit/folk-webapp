import React from 'react'
import { Grid } from '@material-ui/core'
import DDChart from '../data/DDChart'
import {
  useCompetenceAmount,
  useCompetenceAreas,
  useExperienceDistribution,
  useAgeDistribution,
  useFagtimer,
  useFagEvents,
  useEducation,
  useCompetenceMapping,
} from '../api/data/competence/competenceQueries'

export default function Competence() {
  return (
    <Grid container spacing={2}>
      <DDChart
        fetchHook={useCompetenceAmount}
        title="Kompetansemengde"
        description="Andel ansatte som har svart 3 eller mer på kompetansekartleggingen"
        dataComponentProps={{
          chartVariants: [
            {
              type: 'BarChart',
              props: {
                dataKey: 'category',
                yLabels: ['competenceProportion', 'motivationProportion'],
                maxValue: 'auto',
                tooltipValues: ['competenceAmount', 'motivationAmount'],
              },
            },
          ],
        }}
      />

      <DDChart
        fetchHook={useCompetenceAreas}
        title="Kompetanseområder"
        dataComponentProps={{
          chartVariants: [
            {
              type: 'RadarChart',
              props: {
                groupKey: 'category',
                valueKey: ['motivation', 'competence'],
              },
            },
            {
              type: 'BarChart',
              props: {
                dataKey: 'category',
                yLabels: ['motivation', 'competence'],
              },
            },
          ],
        }}
      />

      <DDChart
        fetchHook={useExperienceDistribution}
        title="Erfaring"
        dataComponentProps={{
          chartVariants: [
            {
              type: 'BarChart',
              props: {
                dataKey: 'years',
                yLabels: ['count'],
              },
            },
            {
              type: 'PieChart',
              props: {
                groupKey: 'years',
                valueKey: ['count'],
              },
            },
          ],
        }}
      />

      <DDChart
        fetchHook={useAgeDistribution}
        title="Alder"
        dataComponentProps={{
          chartVariants: [
            {
              type: 'BarChart',
              props: {
                dataKey: 'age',
                yLabels: ['count'],
              },
            },
          ],
        }}
      />

      <DDChart
        fetchHook={useFagtimer}
        title="Aktivitet faggrupper"
        description="Hver vertikal akse viser antall unike fag aktiviteter per uke, deulike linjene representerer de ulike årene"
        dataComponentProps={{
          chartVariants: [
            {
              type: 'LineChart',
            },
          ],
        }}
      />

      <DDChart
        fetchHook={useFagEvents}
        title="Fag og hendelser"
        description="Hver vertikal akse viser antall unike hendelser per måned fra Google kalenderne Knowit Events og Knowit Fagkalender."
        dataComponentProps={{
          chartVariants: [
            {
              type: 'LineChart',
            },
          ],
        }}
      />

      <DDChart
        title="Utdannelse"
        fetchHook={useEducation}
        dataComponentProps={{
          chartVariants: [
            {
              type: 'PieChart',
              props: {
                groupKey: 'degree',
                valueKey: 'count',
              },
            },
          ],
        }}
      />

      <DDChart
        fetchHook={useCompetenceMapping}
        title="Kompetansekartlegging"
        description="Grafen viser gjennomsnittlig score på kompetanse/motivasjon innenfor hver av hovedkategoriene. I tillegg vises gjennomsnittlig score for hver underkategori og forholdet mellom underkategoriene i samme hovedkategori."
        dataComponentProps={{
          chartVariants: [
            {
              type: 'SunburstChart',
              props: {
                maxValue: 5,
                yLabels: ['value'],
                groupKey: 'category',
              },
            },
            {
              type: 'BarChart',
              props: {
                maxValue: 5,
                yLabels: ['value'],
                dataKey: 'category',
              },
            },
          ],
        }}
      />
    </Grid>
  )
}
