import React from 'react';
import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import DDItem, { DDChart } from '../data/DDItem';
import { EmployeeTable } from '../components/EmployeeTable';

export default function Competence() {
  const ChartSkeleton = () => (
    <Skeleton variant="rect" height={320} animation="wave" />
  );

  return (
    <Grid container spacing={2}>
      <DDItem
        url="/api/data/competenceAmount"
        title="Kompetansemengde"
        Component={DDChart}
        SkeletonComponent={ChartSkeleton}
        description="Andel ansatte som har svart 3 eller mer på kompetansekartleggingen"
        dataComponentProps={{
          chartVariants: [
            {
              type: 'Bar',
              props: {
                dataKey: 'kategori',
                yLabels: ['kompetanseandel', 'motivasjonandel'],
                maxValue: 'auto',
                tooltipValues: ['kompetanseverdi', 'motivasjonverdi'],
              },
            },
          ],
        }}
      />

      <DDItem
        url="/api/data/competenceAreas"
        title="Kompetanseområder"
        Component={DDChart}
        SkeletonComponent={ChartSkeleton}
        dataComponentProps={{
          chartVariants: [
            {
              type: 'Radar',
              props: {
                groupKey: 'kategori',
                valueKey: ['motivasjon', 'kompetanse'],
              },
            },
            {
              type: 'Bar',
              props: {
                dataKey: 'kategori',
                yLabels: ['motivasjon', 'kompetanse'],
              },
            },
          ],
        }}
      />

      <DDItem
        url="/api/data/experienceDistribution"
        title="Erfaring"
        Component={DDChart}
        SkeletonComponent={ChartSkeleton}
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
        url="/api/data/ageDistribution"
        title="Alder"
        Component={DDChart}
        SkeletonComponent={ChartSkeleton}
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
        url="/api/data/fagtimer"
        title="Aktivitet faggrupper"
        Component={DDChart}
        SkeletonComponent={ChartSkeleton}
        dataComponentProps={{
          chartVariants: [
            {
              type: 'Line',
            },
          ],
        }}
      />

      <DDItem
        url="/api/data/fagEvents"
        title="Fag og hendelser"
        description="Hver vertikal akse viser antall unike hendelser per måned fra Google kalenderne Knowit Events og Knowit Fagkalender."
        Component={DDChart}
        SkeletonComponent={ChartSkeleton}
        dataComponentProps={{
          chartVariants: [
            {
              type: 'Line',
            },
          ],
        }}
      />

      <DDItem
        url="/api/data/education"
        title="Utdannelse"
        Component={DDChart}
        SkeletonComponent={ChartSkeleton}
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
      />

      <DDItem
        url="/api/data/competenceMapping"
        title="Kompetansekartlegging"
        description="Grafen viser gjennomsnittlig score på kompetanse/motivasjon innenfor hver av hovedkategoriene. I tillegg vises gjennomsnittlig score for hver underkategori og forholdet mellom underkategoriene i samme hovedkategori."
        Component={DDChart}
        SkeletonComponent={ChartSkeleton}
        dataComponentProps={{
          chartVariants: [
            {
              type: 'Sunburst',
              props: {
                yLabels: ['verdi'],
                groupKey: 'kategori',
              },
            },
            {
              type: 'Bar',
              props: {
                dataKey: 'kategori',
                yLabels: ['verdi'],
              },
            },
          ],
        }}
      />

      <EmployeeTable />
    </Grid>
  );
}
