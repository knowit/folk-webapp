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

export type JobRotationReport = JobRotation[]
export type JobRotation = {
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
export type EmployeeTableRow = {
  rowId: string
  rowData: [
    employeeInfo: {
      user_id: string
      name: string
      email: string
      image_url?: string
    },
    jobTitle: string | null,
    projectStatus: string, // ProjectStatus,
    primaryCustomer: Customer | null,
    cvLinks: CvLinks,
    motivationScores: Record<string, number>,
    competenceScores: Record<string, number>
  ]
}

export type ProjectStatus = 'red' | 'green' | 'yellow' | 'orange' | 'blue'

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

// TODO: should be possible to remove
export type EmployeeWithMergedCustomers = EmployeeInformation & {
  customers: Customer[]
}

export type Customer = {
  customer: string
  workOrderDescription: string
  weight: number
}

export type Tags = {
  languages: string[]
  skills: string[]
  roles: string[]
}

export type CvLinks = {
  no_pdf: string
  int_pdf: string
  no_word: string
  int_word: string
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
