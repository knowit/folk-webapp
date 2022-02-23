// employeeTable
export interface EmployeeTableResponse {
  rowId: string
  rowData: any[]
}

// employeeRadar has same response as CompetenceAreasResponse

// employeeExperience

export interface EmployeeExperienceResponse {
  workExperience: WorkExperience[]
  tags: Tags
  manager: string
  guid: string
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

interface Tags {
  languages: string[]
  skills: string[]
  roles: string[]
}

/**
 * EmployeeProfile
 */

export interface EmployeeProfileResponse extends Employee {
  image?: string
  workExperience: WorkExperience[]
  tags: Tags
  links: Links
}

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

export interface Customer {
  customer: string
  workOrderDescription: string
  weight: number
}

interface Tags {
  skills: string[]
  languages: string[]
  roles: string[]
}

interface Links {
  no_pdf: string
  int_pdf: string
  no_word: string
  int_word: string
}
