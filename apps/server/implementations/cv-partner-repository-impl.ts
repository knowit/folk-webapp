import { CVPartnerRepository } from '../repository/cv-partner-repository'
import { getFileFromS3 } from '../dataplattform/databricksS3Call'
import {
  BasicEmployeeInformation,
  EmployeeExperience,
  EmployeeWorkStatus,
} from '../routers/employees/employeesTypes'

export class CVPartnerRepositoryImpl extends CVPartnerRepository {
  async getEmployeeWorkStatus(): Promise<EmployeeWorkStatus[]> {
    return JSON.parse(await getFileFromS3('employeeWorkStatus'))
  }
  async getEmployeeWorkInformation(): Promise<EmployeeExperience[]> {
    return JSON.parse(await getFileFromS3('ubwExperience'))
  }
  async getEmployeeInformation(): Promise<BasicEmployeeInformation[]> {
    return JSON.parse(await getFileFromS3('basicEmployeeInformation'))
  }
}
