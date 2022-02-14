// employeeTable
export type EmployeeInformation = {
  user_id: string
  guid: string
  navn: string
  manager: string
  title: string
  link: string
  degree: string
  image_key: string
  email: string
  customer: string
  weight: number
  work_order_description?: string
}

export type EmployeeWithMergedCustomers = EmployeeInformation & {
  customers: Customer[]
}

export type Customer = {
  customer: string
  workOrderDescription: string
  weight: number
}

export type EmployeeProfile = Omit<
  EmployeeWithMergedCustomers,
  'customer' | 'weight' | 'work_order_description' | 'image_key' | 'link'
> & {
  image: string
  workExperience: EmployeeExperience[]
  tags: Tags
  links: Links
}

type Tags = {
  languages: string[]
  skills: string[]
  roles: string[]
}

type Links = {
  no_pdf: string
  int_pdf: string
  no_word: string
  int_word: string
}

export type EmployeeSkills = {
  user_id: string
  email: string
  language: string // Semi-colon separated list
  skill: string // Semi-colon separated list
  role: string // Semi-colon separated list
}

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

export type JobRotationStatus = [
  WantNewProject: number,
  OpenForNewProject: number
]

export interface EmployeeMotivationAndCompetence {
  email: string
  motivation: number
  competence: number
  subCategory: string
  category: string
  categoryMotivationAvg: number
  categoryCompetenceAvg: number
}

export type CategoryScores = [
  Motivation: Record<string, number>,
  Competence: Record<string, number>
]

// employeeExperience
export interface EmployeeExperience {
  user_id: string
  navn: string
  customer: string
  description: string
  year_from: number
  year_to: number
  month_from: number
  month_to: number
}

interface AreaCategory {
  category: string
  motivation: number
  competence: number
}

export interface CompetenceAreasResponse {
  setNames: string[]
  sets: Record<string, AreaCategory[]>
}
