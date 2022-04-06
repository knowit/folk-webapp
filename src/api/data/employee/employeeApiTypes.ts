// employeeTable

export interface EmployeeTableResponse {
  rowId: string
  rowData: any[]
}

/**
 * EmployeeExperience (= project experience for employee)
 */

export interface EmployeeExperienceResponse {
  name: string
  experience?: ProjectExperience[]
}

export interface ProjectExperience {
  customer: string
  project: string
  time_to: string
  time_from: string
}

/**
 * EmployeeProfile
 */

interface Employee {
  user_id: string
  guid: string
  navn: string
  manager: string
  title: string
  degree?: string
  email: string
  customers: Customer[]
}

export interface EmployeeProfileResponse extends Employee {
  image?: string
  workExperience: WorkExperience[]
  tags: Tags
  links: CvLinks
}

export interface Customer {
  customer: string
  workOrderDescription: string
  weight: number
}

export interface WorkExperience {
  user_id: string
  email: string
  employer: string
  month_from: number
  year_from: number
  month_to: number
  year_to: number
}

export interface Tags {
  skills: string[]
  languages: string[]
  roles: string[]
}

export interface CvLinks {
  no_pdf: string
  int_pdf: string
  no_word: string
  int_word: string
}
