import React from 'react'
import DDTable from '../../../data/DDTable'
import {
  ConsultantCell,
  CustomerStatusCell,
  CvCell,
  ProjectStatusCell,
  SortableHeaderCell,
} from '../../../data/components/table/DataCells'
import EmployeeInfo from './EmployeeInfo'
import {
  Customer,
  ConsultantInfo,
} from '../../../api/data/employee/employeeApiTypes'
import { Skeleton } from '@material-ui/lab'
import { useEmployeeTable } from '../../../api/data/employee/employeeQueries'
import {
  EmployeeTableColumnMapping,
  useCategories,
} from '../../../components/filter/FilterUtil'
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
                width: 385,
                isExpandable: true,
                getSearchValue: (consultant: Pick<ConsultantInfo, 'name'>) => {
                  return consultant.name
                },
                renderCell: ConsultantCell,
                renderExpanded: EmployeeInfo,
                headerCell: SortableHeaderCell,
                checkBoxLabel: 'Vis kun ledige',
              },
              {
                title: 'Tittel',
                width: 222,
                headerCell: SortableHeaderCell,
                getSearchValue: (jobTitle: string | undefined | null) => {
                  return jobTitle
                },
              },
              {
                title: 'Prosjektstatus',
                width: 143,
                renderCell: ProjectStatusCell,
              },
              {
                title: 'Kunde',
                width: 337,
                renderCell: CustomerStatusCell,
                getSearchValue: (customer: Customer | null) => {
                  return customer?.customer
                    ? `${customer.customer} ${customer.workOrderDescription}`
                    : 'Ikke i prosjekt'
                },
                headerCell: SortableHeaderCell,
              },
              { title: 'CV', width: 53, renderCell: CvCell },
            ],
          }}
          initialFilters={[
            {
              label: 'Kompetanse',
              column: EmployeeTableColumnMapping.COMPETENCE,
              values: [],
              threshold: 3,
              placeholder: 'Filtrer på kompetanse...',
              datafetch: useCategories,
            },
            {
              label: 'Motivasjon',
              column: EmployeeTableColumnMapping.MOTIVATION,
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
