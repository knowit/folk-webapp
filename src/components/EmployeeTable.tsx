import DDTable from '../data/DDTable'
import {
  CheckBoxHeaderCell,
  ConsultantCell,
  CustomerStatusCell,
  CvCell,
  ProjectStatusCell,
  SortableHeaderCell,
} from '../data/components/table/DataCells'
import EmployeeInfo from './EmployeeInfo'
import { CustomerStatusData } from '../data/components/table/cells/CustomerStatusCell'
import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { useEmployeeTable } from '../api/data/employee/employeeQueries'
import { GridItem } from './GridItem'

export function EmployeeTable() {
  const TableSkeleton = () => (
    <Skeleton variant="rect" height={780} animation="wave" />
  )

  const employeeData = useEmployeeTable()

  return (
    <GridItem fullSize={true}>
      {employeeData.data ? (
        <DDTable
          title="Prosjektstatus"
          payload={employeeData.data}
          props={{
            columns: [
              {
                title: 'Konsulent',
                isExpandable: true,
                searchable: true,
                getSearchValue: (consultant: { value: string }) => {
                  return consultant.value
                },
                renderCell: ConsultantCell,
                renderExpanded: EmployeeInfo,
                headerCell: CheckBoxHeaderCell,
                checkBoxLabel: 'Vis kun ledige',
              },
              {
                title: 'Tittel',
                headerCell: SortableHeaderCell,
              },
              { title: 'Prosjektstatus', renderCell: ProjectStatusCell },
              {
                title: 'Kunde',
                renderCell: CustomerStatusCell,
                searchable: true,
                getSearchValue: (customer: CustomerStatusData) => {
                  return customer.customer
                    ? `${customer.customer} ${customer.workOrderDescription}`
                    : 'Ikke i prosjekt'
                },
                headerCell: SortableHeaderCell,
              },
              { title: 'CV', renderCell: CvCell },
            ],
          }}
        />
      ) : (
        <TableSkeleton />
      )}
    </GridItem>
  )
}
