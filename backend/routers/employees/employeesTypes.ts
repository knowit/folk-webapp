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

export type MergeEmployees = EmployeeInformation & {
  customerArray: {
    customer: string
    wordOrderDescription: string
    weight: number
  }[]
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
