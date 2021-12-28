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

export interface AgeDistribution {
  age: number
  count: number
}

export interface AgeGroupDistribution {
  age_group: number
  count: number
}

// TODO: Should be translated
export interface FagtimeStats {
  year: number
  week: number
  used_hrs: number
}
