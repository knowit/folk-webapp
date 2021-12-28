export interface YearsWorkingDistributionCount {
  years_working: number
  count: number
}

export interface EmployeeCompetenceAndMotivation {
  email: string
  motivation: number
  competence: number
  subCategory: string
  category: string
  categoryMotivationAvg: number
  categoryCompetenceAvg: number
}

export interface AreaAverageValue {
  value: number
  subCategory: string
  category: string
}
