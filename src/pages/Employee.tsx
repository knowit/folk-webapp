import React from 'react';
import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import {
  ConsultantCell,
  CheckBoxHeaderCell,
  ProjectStatusCell,
  CustomerStatusCell,
  CvCell,
} from '../data/components/table/DataCells';
import DDItem, { DDTable } from '../data/DDItem';
import EmployeeInfo from '../components/EmployeeInfo';

export default function Employee() {
  const TableSkeleton = () => (
    <Skeleton variant="rect" height={780} animation="wave" />
  );

  return (
    <Grid container spacing={2}>
      <DDItem
        url="/api/data/employeeTable"
        title="Prosjektstatus"
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
            { title: 'Prosjektstatus', renderCell: ProjectStatusCell },
            { title: 'Kunde', renderCell: CustomerStatusCell },
            { title: 'CV', renderCell: CvCell },
          ],
        }}
        SkeletonComponent={TableSkeleton}
      />
    </Grid>
  );
}
