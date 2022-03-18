import { TableRow } from '../tableResponses'

/**
 * EmployeeTable
 */

export type EmployeeTableResponse = EmployeeTableRow[]

export type EmployeeTableRow = TableRow<EmployeeTableRowData>

export type EmployeeTableRowData = [
  employeeInfo: ConsultantInfo,
  jobTitle: string | null,
  projectStatus: ProjectStatus,
  primaryCustomer: Customer | null,
  cvLinks: CvLinks,
  motivationScores: Record<string, number>,
  competenceScores: Record<string, number>
]

export interface ConsultantInfo {
  user_id: string
  name: string
  email: string
  image_url?: string
}

export type ProjectStatus = 'red' | 'green' | 'yellow' | 'orange'

export interface Customer {
  customer: string
  workOrderDescription: string
}

export interface CvLinks {
  no_pdf: string
  int_pdf: string
  no_word: string
  int_word: string
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
  customers: CustomerWithWeight[]
}

export interface EmployeeProfileResponse extends Employee {
  image?: string
  workExperience: WorkExperience[]
  tags: Tags
  links: CvLinks
}

export interface CustomerWithWeight extends Customer {
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

// employeeRadar has same response as CompetenceAreasResponse
