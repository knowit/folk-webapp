import { SingularChartData } from '../../../../../../packages/folk-common/types/chartTypes'
import perCustomerFilter, {
  PerCustomerFilterOptions,
} from './usePerCustomerFilter'
import { Dispatch, SetStateAction } from 'react'

export type ChartFilterType = 'perCustomer'

type FilterOption = PerCustomerFilterOptions

export type FilteredData = {
  filterOptions: FilterOption[]
  selectedFilter: FilterOption
  setSelectedFilter: Dispatch<SetStateAction<FilterOption>>
  getFilteredData: () => SingularChartData
}

const getHook = (type: ChartFilterType) => {
  switch (type) {
    case 'perCustomer':
      return perCustomerFilter
    default:
      return perCustomerFilter
  }
}

const useFilteredData = (
  type: ChartFilterType,
  data: SingularChartData
): FilteredData => {
  const hook = getHook(type)

  const { filterOptions, selectedFilter, setSelectedFilter, getFilteredData } =
    hook(data)

  return { filterOptions, getFilteredData, selectedFilter, setSelectedFilter }
}

export default useFilteredData
