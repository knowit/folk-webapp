import React from 'react'
import { Grid } from '@material-ui/core'
import DDItem from '../data/DDItem'
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
      <DDItem
        fetchHook={useCompetenceAmount}
        title="Kompetansemengde"
        description="Andel ansatte som har svart 3 eller mer på kompetansekartleggingen"
        dataComponentProps={{
          chartVariants: [
            {
              type: 'Bar',
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

      <DDItem
        fetchHook={useCompetenceAreas}
        title="Kompetanseområder"
        dataComponentProps={{
          chartVariants: [
            {
              type: 'Radar',
              props: {
                groupKey: 'category',
                valueKey: ['motivation', 'competence'],
              },
            },
            {
              type: 'Bar',
              props: {
                dataKey: 'category',
                yLabels: ['motivation', 'competence'],
              },
            },
          ],
        }}
      />

      <DDItem
        fetchHook={useExperienceDistribution}
        title="Erfaring"
        dataComponentProps={{
          chartVariants: [
            {
              type: 'Bar',
              props: {
                dataKey: 'years',
                yLabels: ['count'],
              },
            },
            {
              type: 'Pie',
              props: {
                groupKey: 'years',
                valueKey: ['count'],
              },
            },
          ],
        }}
      />

      <DDItem
        fetchHook={useAgeDistribution}
        title="Alder"
        dataComponentProps={{
          chartVariants: [
            {
              type: 'Bar',
              props: {
                dataKey: 'age',
                yLabels: ['count'],
              },
            },
          ],
        }}
      />

      <DDItem
        fetchHook={useFagtimer}
        title="Aktivitet faggrupper"
        description="Hver vertikal akse viser antall unike fag aktiviteter per uke, ulike linjene representerer de ulike årene"
        dataComponentProps={{
          chartVariants: [
            {
              type: 'Line',
            },
          ],
        }}
      />

      {/*<DDItem
        fetchHook={useFagEvents}
        title="Fag og hendelser"
        description="Hver vertikal akse viser antall unike hendelser per måned fra Google kalenderne Knowit Events og Knowit Fagkalender."
        dataComponentProps={{
          chartVariants: [
            {
              type: 'Line',
            },
          ],
        }}
      />

      <DDItem
        title="Utdannelse"
        fetchHook={useEducation}
        dataComponentProps={{
          chartVariants: [
            {
              type: 'Pie',
              props: {
                groupKey: 'degree',
                valueKey: 'count',
              },
            },
          ],
        }}
      />*/}

      <DDItem
        fetchHook={useCompetenceMapping}
        title="Kompetansekartlegging"
        description="Grafen viser gjennomsnittlig score på kompetanse/motivasjon innenfor hver av hovedkategoriene. I tillegg vises gjennomsnittlig score for hver underkategori og forholdet mellom underkategoriene i samme hovedkategori."
        dataComponentProps={{
          chartVariants: [
            {
              type: 'Sunburst',
              props: {
                yLabels: ['value'],
                groupKey: 'category',
              },
            },
            {
              type: 'Bar',
              props: {
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
