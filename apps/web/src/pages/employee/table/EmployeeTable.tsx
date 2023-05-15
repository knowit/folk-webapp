import React from 'react'
import DDTable from '../../../components/table/DDTable'
import {
  ConsultantCell,
  CustomerStatusCell,
  CvCell,
  ProjectStatusCell,
  SortableHeaderCell,
} from '../../../components/table/DataCells'
import { EmployeeTableExpandedInfo } from './EmployeeTableExpandedInfo'
import {
  ConsultantInfo,
  Customer,
} from '../../../api/data/employee/employeeApiTypes'
import { BaseSkeleton } from '../../../components/skeletons/BaseSkeleton'
import { useEmployeeTable } from '../../../api/data/employee/employeeQueries'
import {
  EmployeeTableColumnMapping,
  useCategories,
} from '../../../components/filter/FilterUtil'
import { GridItem } from '../../../components/gridItem/GridItem'
import { FallbackMessage } from '../components/FallbackMessage'

interface Props {
  customerSpecific?: boolean
  customerId?: string
}

export function EmployeeTable({ customerSpecific, customerId }: Props) {
  const TableSkeleton = () => (
    <BaseSkeleton variant="rectangular" height={780} />
  )

  // eslint-disable-next-line prefer-const
  let { data: employeeData, error } = useEmployeeTable()
  if (employeeData && customerSpecific) {
    employeeData = employeeData.filter(
      (row) => row['rowData'][3].customer == customerId
    )
  }

  return (
    <GridItem fullSize={true}>
      {error && <FallbackMessage error={error} />}
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
                getValue: (consultant: ConsultantInfo) => {
                  return consultant.name
                },
                renderCell: ConsultantCell,
                renderExpanded: EmployeeTableExpandedInfo,
                headerCell: SortableHeaderCell,
                checkBoxLabel: 'Vis kun ledige',
              },
              {
                title: 'Tittel',
                width: 222,
                headerCell: SortableHeaderCell,
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
                getValue: (customer: Customer | null) => {
                  return customer?.customer
                    ? `${customer.customer} ${customer.workOrderDescription}`
                    : undefined
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
              filters: [],
              placeholder: 'Filtrer på kompetanse...',
              datafetch: useCategories,
            },
            {
              label: 'Motivasjon',
              column: EmployeeTableColumnMapping.MOTIVATION,
              filters: [],
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
