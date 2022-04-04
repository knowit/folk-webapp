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

export enum ProjectStatus {
  // InternalProject = 'INTERNAL',
  ExternalProject = 'EXTERNAL',
  NoProject = 'NO_PROJECT',
  WantChange = 'WANT_CHANGE',
  OpenForChange = 'OPEN_FOR_CHANGE',
}

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
 * Employee Competence (only competence/experience data from employee profile)
 */

export interface EmployeeCompetenceResponse {
  email: string
  manager: string
  degree?: string
  tags: Tags
  projectExperience: ProjectExperience[]
  workExperience: WorkExperience[]
}

export interface WorkExperience {
  employer: string
  month_from: number
  year_from: number
  month_to: number
  year_to: number
}

export interface ProjectExperience {
  customer: string
  project: string
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

/**
 * EmployeeProfile
 */

export interface EmployeeProfileResponse extends EmployeeCompetenceResponse {
  user_id: string
  email: string
  name: string
  phone?: string
  title?: string
  image?: string
  links: CvLinks
  customers: Customer[]
}

// employeeRadar has same response as CompetenceAreasResponse
