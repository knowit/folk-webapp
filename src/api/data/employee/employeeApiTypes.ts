// employeeTable
interface EmployeeTableEntry {
  rowId: string
  rowData: any[]
}
export interface EmployeeTableResponse {
  data: EmployeeTableEntry[]
}
