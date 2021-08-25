import React from 'react';
import { Grid } from '@material-ui/core';
import { PerProjectView } from '../components/PerProjectView';
import { CustomerTable } from '../components/CustomerTable';
import DDItem from '../data/DDItem';
import { Skeleton } from '@material-ui/lab';

const TableSkeleton = () => (
  <Skeleton variant="rect" width={780} height={780} animation="wave" />
);

const tableColumns = [
  { title: 'Kunde' },
  { title: 'Antall ansatte' },
  { title: 'Antall timer' },
]

export default function Customers() {
  return (
    <Grid container spacing={2}>
      <PerProjectView />
      <DDItem
        url="/api/data/customerTable"
        title="Kundeinformasjon fra siste UBW-periode"
        fullSize
        Component={CustomerTable}
        dataComponentProps={{
          columns: tableColumns
        }}
        SkeletonComponent={TableSkeleton}
      />
    </Grid>
  );
}
