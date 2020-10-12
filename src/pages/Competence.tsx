import React from 'react';
import { Grid } from '@material-ui/core';
import {
  ConsultantCell,
  ExperienceCell,
  CheckBoxHeaderCell,
  EducationCell,
  CvCell
} from '../data/components/table/DataCells';
import DDItem, { DDTable } from '../data/DDItem';
import { Skeleton } from '@material-ui/lab';
import EmployeeInfo from '../components/EmployeeInfo';

export default function Competence() {
  
  const TableSkeleton = () => (
    <Skeleton variant="rect" height={780} animation="wave" />
  );

  return (
    <Grid container spacing={2}>

      <DDItem
        url={'/api/data/competence?page=1'}
        title={'Konsulentkompetanse'}
        fullSize={true}
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
            { title: 'Utdanning', renderCell: EducationCell},
            { title: 'CV', renderCell: CvCell },
          ]
        }}
        SkeletonComponent={TableSkeleton}
      />
    </Grid>
  );
}
