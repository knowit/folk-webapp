import { TableRow } from '../datatypes/typeData'

/**
 * Employee Reports
 */

export type EmployeeInformationReport = EmployeeInformation[]
export type EmployeeInformation = {
  user_id: string
  guid: string
  navn: string
  manager: string
  title?: string
  link: string
  degree?: string
  image_key?: string
  email: string
  customer?: string
  weight?: number
  work_order_description?: string
}

export type BasicEmployeeInformationReport = BasicEmployeeInformation[]
export type BasicEmployeeInformation = {
  user_id: string
  guid: string
  email: string
  name: string
  title?: string
  link: string
  image_key?: string
  primary_customer?: string
  primary_work_order_description?: string
}

export type JobRotationInformationReport = JobRotationInformation[]
export type JobRotationInformation = {
  username: string
  email: string
  questionid: string
  customscalevalue: number
  guid: string
  index: number
  text: string
  categoryid: string
}

export type EmployeeWorkStatusReport = EmployeeWorkStatus[]

export type EmployeeWorkStatus = {
  alias: string
  guid: string
  customer: string
  project_type: string
  last_reg_period: number
  weight_sum: number
}

export type EmployeeMotivationAndCompetenceReport =
  EmployeeMotivationAndCompetence[]
export type EmployeeMotivationAndCompetence = {
  email: string
  motivation: number
  competence: number
  subCategory: string
  category: string
  categoryMotivationAvg: number
  categoryCompetenceAvg: number
}

export type EmployeeSkillsReport = EmployeeSkills[]
export type EmployeeSkills = {
  user_id: string
  email: string
  language: string // Semi-colon separated list
  skill: string // Semi-colon separated list
  role: string // Semi-colon separated list
}

export type WorkExperienceReport = WorkExperience[]
export type WorkExperience = {
  user_id: string
  email: string
  employer: string
  month_from: number
  month_to: number
  year_from: number
  year_to: number
}

export type EmployeeExperienceReport = EmployeeExperience[]
export type EmployeeExperience = {
  user_id: string
  navn: string
  customer: string
  description: string
  year_from: number
  year_to: number
  month_from: number
  month_to: number
}

/**
 * Employee Table
 */
export type EmployeeTableResponse = EmployeeTableRow[]

export type EmployeeTableRow = TableRow<EmployeeTableRowData>

export type EmployeeTableRowData = [
  employeeInfo: EmployeeInfo,
  jobTitle: string | null,
  projectStatus: ProjectStatus,
  primaryCustomer: Customer | null,
  cvLinks: CvLinks,
  motivationScores: Record<string, number>,
  competenceScores: Record<string, number>
]

export type EmployeeInfo = {
  user_id: string
  name: string
  email: string
  image_url?: string
}

export enum ProjectStatus {
  InternalProject = 'INTERNAL',
  ExternalProject = 'EXTERNAL',
  NoProject = 'NO_PROJECT',
  WantChange = 'WANT_CHANGE',
  OpenForChange = 'OPEN_FOR_CHANGE',
}

export type Customer = {
  customer: string
  workOrderDescription: string
}

export type CvLinks = {
  no_pdf: string
  int_pdf: string
  no_word: string
  int_word: string
}

export type JobRotationStatus = [
  WantNewProject: number,
  OpenForNewProject: number
]

export type CategoryScores = [
  Motivation: Record<string, number>,
  Competence: Record<string, number>
]

/**
 * Employee Profile
 */

export type EmployeeProfileResponse = Omit<
  EmployeeWithMergedCustomers,
  'customer' | 'weight' | 'work_order_description' | 'image_key' | 'link'
> & {
  image: string
  workExperience: WorkExperience[]
  tags: Tags
  links: CvLinks
}

export type EmployeeWithMergedCustomers = EmployeeInformation & {
  customers: CustomerWithWeight[]
}

export type CustomerWithWeight = Customer & {
  weight: number
}

export type Tags = {
  languages: string[]
  skills: string[]
  roles: string[]
}

/**
 * Employee Experience
 */

export type CompetenceAreasResponse = {
  setNames: string[]
  sets: Record<string, AreaCategory[]>
}

type AreaCategory = {
  category: string
  motivation: number
  competence: number
}
