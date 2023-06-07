import React from 'react'
import EmployeeTableWithFilter from './EmployeeTableWithFilter'
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

  const { data: employeeData, error } = useEmployeeTable()

  return (
    <GridItem fullSize={true}>
      {error && <FallbackMessage error={error} />}
      {employeeData ? (
        <EmployeeTableWithFilter
          title="Prosjektstatus"
          payload={
            customerSpecific
              ? employeeData.filter(
                  (row) => row['rowData'][3].customer == customerId
                )
              : employeeData
          }
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
