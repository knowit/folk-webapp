import { CustomerCardData } from '../../../api/data/customer/customerApiTypes'
import { ChartPeriod } from '../../../components/charts/chartFilters/useChartData'

export function SortCustomerCards(
  data: CustomerCardData[],
  currentSort: string,
  sortOrder: string,
  selectedChartPeriod: ChartPeriod
) {
  if (!currentSort) return data

  const getCellValue = (row: CustomerCardData) => {
    switch (currentSort) {
      case 'Alfabetisk':
        return row.customer
      case 'Antall konsulenter':
        return selectedChartPeriod === ChartPeriod.WEEK
          ? row.consultantsLastPeriod
          : row.consultantsLastLongPeriod
      case 'Antall timer':
        return row.billedTotal
    }
  }

  const compare = (a: CustomerCardData, b: CustomerCardData) => {
    const aValue = getCellValue(a)
    const bValue = getCellValue(b)
    if (currentSort === 'Alfabetisk') {
      if (!aValue) return 1
      if (!bValue) return -1
      return String(aValue).localeCompare(String(bValue))
    } else {
      return Number(aValue) - Number(bValue)
    }
  }

  if (sortOrder === 'ASC') {
    return data.sort((a, b) => compare(a, b))
  } else {
    return data.sort((a, b) => compare(b, a))
  }
}
