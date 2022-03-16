import { CustomerWithEmployees } from '../../../api/data/customer/customerApiTypes'
import { SearchableColumn } from '../../../data/DDTable'
import { searchRow } from '../../../components/filter/FilterUtil'

export function searchEmployeesByCustomer(
  customerWithEmployees: CustomerWithEmployees[],
  searchableColumns: SearchableColumn[],
  searchTerm: string
) {
  return customerWithEmployees.reduce(
    (customersWithMatchingEmployees, { customer_name, employees }) => {
      const filteredEmployees = employees.filter((employee) =>
        searchRow(employee, searchableColumns, searchTerm)
      )
      if (filteredEmployees.length > 0) {
        customersWithMatchingEmployees.push({
          customer_name,
          employees: filteredEmployees,
        })
      }
      return customersWithMatchingEmployees
    },
    [] as CustomerWithEmployees[]
  )
}
