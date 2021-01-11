import React from 'react';
import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import {
  ConsultantCell,
  ExperienceCell,
  CheckBoxHeaderCell,
  EducationCell,
  CvCell,
} from '../data/components/table/DataCells';
import DDItem, { DDTable, DDChart } from '../data/DDItem';
import EmployeeInfo from '../components/EmployeeInfo';

export default function Competence() {
  const TableSkeleton = () => (
    <Skeleton variant="rect" height={780} animation="wave" />
  );
  const ChartSkeleton = () => (
    <Skeleton variant="rect" height={320} animation="wave" />
  );

  return (
    <Grid container spacing={2}>
      <DDItem
        url="/api/data/competenceSum"
        title="Kompetansemengde"
        Component={DDChart}
        SkeletonComponent={ChartSkeleton}
        dataComponentProps={{
          yLabels: [],
        }}
      />

      <DDItem
        url="/api/data/competenceAreas"
        title="Kompetanseområder"
        Component={DDChart}
        SkeletonComponent={ChartSkeleton}
        dataComponentProps={{
          yLabels: [],
        }}
      />

      <DDItem
        url="/api/data/experienceDistribution"
        title="Erfaring"
        Component={DDChart}
        SkeletonComponent={ChartSkeleton}
        dataComponentProps={{
          groupKey: 'years',
          valueKey: ['count'],
        }}
      />

      <DDItem
        url="/api/data/ageDistribution"
        title="Alder"
        Component={DDChart}
        SkeletonComponent={ChartSkeleton}
        dataComponentProps={{
          dataKey: 'age',
          yLabels: ['count'],
        }}
      />

      <DDItem
        url="/api/data/fagtimer"
        title="Aktivitet faggrupper"
        Component={DDChart}
        SkeletonComponent={ChartSkeleton}
        dataComponentProps={{
          dataKey: 'week',
          yLabels: ['used_hrs'],
        }}
      />

      <DDItem
        url="/api/data/faggrupper"
        title="Faggrupper oversikt"
        Component={DDChart}
        SkeletonComponent={ChartSkeleton}
        dataComponentProps={{
          yLabels: [],
        }}
      />

      <DDItem
        url="/api/data/education"
        title="Utdannelse"
        Component={DDChart}
        SkeletonComponent={ChartSkeleton}
        dataComponentProps={{
          groupKey: 'degree',
          valueKey: 'count',
        }}
      />

      <DDItem
        url="/api/data/competenceMapping"
        title="Kompetansekartlegging"
        description="Grafen viser gjennomsnittlig score på
        kompetanse/motivasjon innenfor hver av hovedkategoriene. I tillegg viser
        gjennomsnittligs score for hver underkategori og forholdet mellom underkategoriene i samme hovedkategori"
        Component={DDChart}
        SkeletonComponent={ChartSkeleton}
        dataComponentProps={{
          dataKey: 'section',
          yLabels: ['value'],
        }}
      />

      <DDItem
        url="/api/data/competenceAmount"
        title="Kompetansemengde"
        Component={DDChart}
        SkeletonComponent={ChartSkeleton}
      />

      <DDItem
        url="/api/data/competence"
        title="Konsulentkompetanse"
        fullSize
        Component={DDTable}
        dataComponentProps={{
          columns: [
            {
              title: 'Konsulent',
              expandable: true,
              searchable: true,
              searchKey: 'value',
              renderCell: ConsultantCell,
              renderExpanded: EmployeeInfo,
              headerRenderCell: CheckBoxHeaderCell,
              checkBoxLabel: 'Vis kun ledige',
            },
            { title: 'Tittel' },
            { title: 'Erfaring', renderCell: ExperienceCell },
            { title: 'Utdanning', renderCell: EducationCell },
            { title: 'CV', renderCell: CvCell },
          ],
        }}
        SkeletonComponent={TableSkeleton}
      />
    </Grid>
  );
}
