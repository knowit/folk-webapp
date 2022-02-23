import React from 'react'
import DDTable from '../../../data/DDTable'
import {
  CheckBoxHeaderCell,
  ConsultantCell,
  CustomerStatusCell,
  CvCell,
  ProjectStatusCell,
  SortableHeaderCell,
} from '../../../data/components/table/DataCells'
import EmployeeInfo from './EmployeeInfo'
import { CustomerStatusData } from '../../../data/components/table/cells/CustomerStatusCell'
import { Skeleton } from '@material-ui/lab'
import { useEmployeeTable } from '../../../api/data/employee/employeeQueries'
import { useCategories } from '../../../components/filter/FilterUtil'
import { GridItem } from '../../../components/gridItem/GridItem'

export function EmployeeTable() {
  const TableSkeleton = () => (
    <Skeleton variant="rect" height={780} animation="wave" />
  )

  const { data: employeeData } = useEmployeeTable()

  return (
    <GridItem fullSize={true}>
      {employeeData ? (
        <DDTable
          title="Prosjektstatus"
          payload={employeeData}
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
          initialFilters={[
            {
              name: 'COMPETENCE',
              values: [],
              threshold: 3,
              placeholder: 'Filtrer på kompetanse...',
              datafetch: useCategories,
            },
            {
              name: 'MOTIVATION',
              values: [],
              threshold: 4,
              placeholder: 'Filtrer på motivasjon...',
              datafetch: useCategories,
            },
          ]}
        />
      ) : (
        <TableSkeleton />
      )}
    </GridItem>
  )
}
