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
import { CustomerStatusData } from '../data/components/table/cells/CustomerStatusCell';

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
              getSearchValue: (consultant: { value: string }) => {
                return consultant.value;
              },
              renderCell: ConsultantCell,
              renderExpanded: EmployeeInfo,
              headerRenderCell: CheckBoxHeaderCell,
              checkBoxLabel: 'Vis kun ledige',
            },
            { title: 'Tittel' },
            { title: 'Prosjektstatus', renderCell: ProjectStatusCell },
            {
              title: 'Kunde',
              renderCell: CustomerStatusCell,
              searchable: true,
              getSearchValue: (customers: CustomerStatusData[]) => {
                const {
                  customer,
                  workOrderDescription,
                } = customers.reduce((prevCustomer, currCustomer) =>
                  currCustomer.weight < prevCustomer.weight
                    ? currCustomer
                    : prevCustomer
                );
                return `${customer} ${workOrderDescription}`;
              },
            },
            { title: 'CV', renderCell: CvCell },
          ],
        }}
        SkeletonComponent={TableSkeleton}
      />
    </Grid>
  );
}
