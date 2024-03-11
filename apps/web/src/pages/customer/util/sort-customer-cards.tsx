import { CustomerCardData } from '../../../api/data/customer/customerApiTypes'

export function SortCustomerCards(
  data: CustomerCardData[],
  currentSort: string,
  sortOrder: string
) {
  if (!currentSort) return data

  const getCellValue = (row: CustomerCardData) => {
    switch (currentSort) {
      case 'Alfabetisk':
        return row.customer
      case 'Antall konsulenter':
        return row.consultantsLastPeriod
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

  if (currentSort === 'Alfabetisk' && sortOrder === 'ASC') {
    return data.sort((a, b) => compare(a, b))
  } else {
    return data.sort((a, b) => compare(b, a))
  }
}
