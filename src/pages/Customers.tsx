import React from 'react';
import { Grid } from '@material-ui/core';
import { PerProjectView } from '../components/PerProjectView';

export default function Customers() {
  return (
    <Grid container spacing={2}>
      <PerProjectView />
    </Grid>
  );
}
