import EmployeeTableWithFilter from './EmployeeTableWithFilter'
import { BaseSkeleton } from '../../../components/skeletons/BaseSkeleton'
import { useEmployeeTable } from '../../../api/data/employee/employeeQueries'
import {
  EmployeeTableColumnMapping,
  useCategories,
} from '../../../components/filter/FilterUtil'
import { GridItem } from '../../../components/gridItem/GridItem'
import { FallbackMessage } from '../components/FallbackMessage'
import { useCustomerCardData } from '../../../api/data/customer/customerQueries'
import { ChartPeriod } from '../../../components/charts/chartFilters/useChartData'

interface Props {
  customerSpecific?: boolean
  customerId?: string
  selectedChartPeriod?: ChartPeriod
}

export function EmployeeTable({
  customerSpecific,
  customerId,
  selectedChartPeriod,
}: Props) {
  const TableSkeleton = () => (
    <BaseSkeleton variant="rectangular" height={780} />
  )
  const { data: employeeData, error } = useEmployeeTable()
  const cardData = useCustomerCardData(customerId)
  const specificConsultants =
    selectedChartPeriod === ChartPeriod.WEEK
      ? cardData?.consultants
      : cardData?.consultantsLongPeriod
  const specificEmployees = customerSpecific
    ? employeeData?.filter((ed) =>
        specificConsultants.includes(ed['rowData'][0].email)
      )
    : employeeData

  return (
    <GridItem fullSize={true}>
      {error && <FallbackMessage error={error} />}
      {specificEmployees ? (
        <EmployeeTableWithFilter
          title="Prosjektstatus"
          payload={specificEmployees}
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
