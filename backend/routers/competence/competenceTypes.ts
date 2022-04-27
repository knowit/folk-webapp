export interface YearsWorkingDistributionCount {
  years_working: number
  count: number
}

export interface CategoryAmountData {
  category: string
  competenceAmount: number
  motivationAmount: number
  motivationProportion: number
  competenceProportion: number
}

export interface CategoriesMap {
  Hovedkategorier: Record<string, CategoryAmountData>
  [key: string]: Record<string, CategoryAmountData>
}

export interface ExperienceDistributionData {
  years: string
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

export interface CompetenceAmount {
  subCategory: string
  subMotivationAmount: number
  subMotivationPropotion: number
  subCompetenceAmount: number
  subCompetencePropotion: number
  category: string
  motivationAmount: number
  motivationPropotion: number
  competenceAmount: number
  competencePropotion: number
}

export interface CategoryMapData {
  category: string
  motivation: number
  competence: number
  subcategories: SubcategoryMapData[]
}

export interface SubcategoryMapData {
  category: string
  motivation: number
  competence: number
  motivationSize: number
  competenceSize: number
}

export interface CategoryAreaData {
  competence: number
  motivation: number
  category: string
}

export interface CategoryAverage {
  competence: number
  motivation: number
  subCategory: string
  category: string
}

export interface AgeDistributionData {
  age: number
  count: number
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

export interface FagEventData {
  event_summary: string
  time_from: string
  time_to: string
}

export interface DegreeDistribution {
  degree: string
  count: number
}

export interface CompetenceFilterRawData {
  category: string
  subCategories: string
}
