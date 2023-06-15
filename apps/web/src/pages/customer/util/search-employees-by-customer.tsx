import { CustomerWithAccordion } from '../../../api/data/customer/customerApiTypes'
import { SearchableColumn } from '../../employee/table/EmployeeTableWithFilter'
import { searchRow } from '../../../components/filter/FilterUtil'

export function searchEmployeesByCustomer(
  customerWithEmployees: CustomerWithAccordion[],
  searchableColumns: SearchableColumn[],
  searchTerm: string
) {
  return customerWithEmployees.reduce(
    (
      customersWithMatchingEmployees,
      { customer_name, employees, accordion }
    ) => {
      const filteredEmployees = employees.filter((employee) =>
        searchRow(employee, searchableColumns, searchTerm)
      )
      if (filteredEmployees.length > 0) {
        customersWithMatchingEmployees.push({
          customer_name,
          employees: filteredEmployees,
          accordion,
        })
      }
      return customersWithMatchingEmployees
    },
    [] as CustomerWithAccordion[]
  )
}
