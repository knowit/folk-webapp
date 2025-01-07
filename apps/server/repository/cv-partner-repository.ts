import {
  BasicEmployeeInformation,
  EmployeeExperience,
  EmployeeWorkStatus,
} from '../routers/employees/employeesTypes'

export abstract class CVPartnerRepository {
  // Fetches ALL data for basic employee information
  abstract getEmployeeInformation(): Promise<BasicEmployeeInformation[]>
  abstract getEmployeeWorkStatus(): Promise<EmployeeWorkStatus[]>
  abstract getEmployeeWorkInformation(): Promise<EmployeeExperience[]>
}
