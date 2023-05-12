import * as React from 'react'
import { makeStyles } from '@mui/styles'
import { MultiLineSkeleton } from '../../../components/skeletons/MultiLineSkeleton'
import { FallbackMessage } from '../../employee/components/FallbackMessage'

import { EmployeeForCustomerList } from '../../../api/data/customer/customerApiTypes'

import ConsultantCell from '../../../components/table/cells/ConsultantCell'

import {
  ConsultantInfo,
  Customer,
} from '../../../api/data/employee/employeeApiTypes'
import { GridItem } from '../../../components/gridItem/GridItem'
import DDTable from '../../../components/table/DDTable'
import { EmployeeTableExpandedInfo } from '../../employee/table/EmployeeTableExpandedInfo'
import { BaseSkeleton } from '../../../components/skeletons/BaseSkeleton'

const TableSkeleton = () => <BaseSkeleton variant="rectangular" height={780} />

interface Props {
  employees?: EmployeeForCustomerList[]
  isLoading?: boolean
  error?: object
}

export function EmployeesForCustomer({
  employees: employees,
  isLoading,
  error,
}: Props) {
  if (error) {
    return <FallbackMessage error={error} />
  }

  if (isLoading) {
    return <MultiLineSkeleton />
  }

  if (!employees || employees.length === 0) {
    return <FallbackMessage message="Fant ingen ansatte å vise." />
  }

  return (
    <GridItem fullSize={true}>
      {error && <FallbackMessage error={error} />}
      {employees ? (
        <DDTable
          title="Konsulenter på prosjekt"
          payload={employees}
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
              },
              {
                title: 'Tittel',
                width: 222,
              },
              {
                title: 'Kunde',
                width: 337,
                getValue: (customer: Customer | null) => {
                  return customer?.customer
                    ? `${customer.customer} ${customer.workOrderDescription}`
                    : undefined
                },
              },
            ],
          }}
          initialFilters={[]}
          searchable={false}
        />
      ) : (
        <TableSkeleton />
      )}
    </GridItem>
  )
}
