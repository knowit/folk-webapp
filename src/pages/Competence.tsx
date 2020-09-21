import React from 'react';
import { Grid } from '@material-ui/core';
import {
  ConsultantCell,
  ExperienceCell,
  CvCell
} from '../components/DataTableCells';
import DDItem, { DDTable } from '../components/DDItem';
import { FilterFunctionArgument } from '../components/dd/DataTable';
import { Skeleton } from '@material-ui/lab';

export default function Competence() {
  
  const TableSkeleton = () => (
    <Skeleton variant="rect" height={780} animation="wave" />
  );

  return (
    <Grid container spacing={2}>

      <DDItem
        url={'/api/data/competence'}
        title={'Konsulentkompetanse'}
        fullSize={true}
        Component={DDTable}
        dataComponentProps={{
          columns: [
            {
              title: 'Konsulent',
              expandable: true,
              renderCell: ConsultantCell
            },
            { title: 'Tittel' },
            { title: 'Erfaring', renderCell: ExperienceCell },
            { title: 'Utdanning' },
            { title: 'CV', renderCell: CvCell },
          ],
          searchFilterFunction: (
            row: FilterFunctionArgument,
            searchTerm: string
          ) => row.rowData[0].value.toLowerCase().includes(searchTerm.toLowerCase()), // TODO: Update filter to reflect structure of actual backend data
        }}
        SkeletonComponent={TableSkeleton}
      />
    </Grid>
  );
}
