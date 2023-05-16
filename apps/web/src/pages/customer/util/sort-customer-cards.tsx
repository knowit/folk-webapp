import { CustomerData } from '../cards/CustomerCard'

export function SortCustomerCards(
  data: CustomerData[],
  currentSort: string,
  sortOrder: string
) {
  if (!currentSort) return data

  const getCellValue = (row: CustomerData) => {
    switch (currentSort) {
      case 'Alfabetisk':
        return row.customer
      case 'Antall konsulenter':
        return row.consultants
      case 'Antall timer':
        return row.billedTotal
    }
  }

  const compare = (a: CustomerData, b: CustomerData) => {
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
