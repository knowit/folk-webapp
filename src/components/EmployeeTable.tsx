import DDItem, { DDTable } from '../data/DDItem';
import {
  CheckBoxHeaderCell,
  ConsultantCell,
  CustomerStatusCell,
  CvCell,
  ProjectStatusCell,
} from '../data/components/table/DataCells';
import EmployeeInfo from './EmployeeInfo';
import { CustomerStatusData } from '../data/components/table/cells/CustomerStatusCell';
import React from 'react';
import { Skeleton } from '@material-ui/lab';

export function EmployeeTable() {
  const TableSkeleton = () => (
    <Skeleton variant="rect" height={780} animation="wave" />
  );

  return (
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
            getSearchValue: (customer: CustomerStatusData) => {
              return `${customer.customer} ${customer.workOrderDescription}`;
            },
          },
          { title: 'CV', renderCell: CvCell },
        ],
      }}
      SkeletonComponent={TableSkeleton}
    />
  );
}
