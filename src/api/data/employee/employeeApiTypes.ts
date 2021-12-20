// employeeTable
interface EmployeeTableEntry {
  rowId: string
  rowData: any[]
}
export interface EmployeeTableResponse {
  data: EmployeeTableEntry[]
}

// employeeRadar has same response as CompetenceAreasResponse

// employeeExperience

interface WorkExperience {
  user_id: string
  email: string
  employer: string
  month_from: number
  year_from: number
  month_to: number
  year_to: number
}

interface Tags {
  languages: string[]
  skills: string[]
  roles: string[]
}

export interface EmployeeExperienceResponse {
  workExperience: WorkExperience[]
  tags: Tags
  manager: string
  guid: string
}

// empData

export interface CustomerArray {
  customer: string
  workOrderDescription: string
  weight: number
}

export interface Employee {
  user_id: string
  guid: string
  navn: string
  manager: string
  title: string
  link: string
  degree: string
  email: string
  customer: string
  weight: number
  work_order_description: string
  customerArray: CustomerArray[]
}

export interface Links {
  no_pdf: string
  int_pdf: string
  no_word: string
  int_word: string
}

export interface EmpDataResponse {
  email_id: string
  user_id: string
  employee: Employee
  workExperience: WorkExperience[]
  degree: string
  manager: string
  links: Links
  customerArray: CustomerArray[]
}
