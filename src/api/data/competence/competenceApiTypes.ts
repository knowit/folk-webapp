// competenceAmount
interface AmountCategory {
  category: string
  competenceAmount: number
  motivationAMount: number
  motivationProportion: number
  competenceProportion: number
}
export interface CompetenceAmountResponse {
  setNames: string[]
  sets: Record<string, AmountCategory[]>
}

// competenceAmount
interface AreaCategory {
  category: string
  motivation: number
  competence: number
}

export interface CompetenceAreasResponse {
  setNames: string[]
  sets: Record<string, AreaCategory[]>
}

// experienceDistribution
interface Experience {
  years: string
  count: number
}

export interface ExperienceDistributionResponse {
  setNames: string[]
  sets: Record<string, Experience[]>
}

// ageDistribution
interface AgeDistribution {
  age: string
  count: number
}

export interface AgeDistributionResponse {
  setNames: string
  sets: Record<string, AgeDistribution[]>
}

// fagtimer
interface FagtimeDataPoint {
  x: number
  y: number
}

interface Fagtime {
  id: string
  data: FagtimeDataPoint[]
}

export interface FagtimerResponse {
  componentType: string
  setNames: string[]
  sets: Record<string, Fagtime[]>
}

// fagEvents
interface FagEventDataPoint {
  x: string
  y: number
}

interface FagEvent {
  id: number
  data: FagEventDataPoint[]
}

export interface FagEventsResponse {
  setNames: string[]
  sets: Record<string, FagEvent[]>
}

// education
interface EducationDistribution {
  degree: string
  count: number
}

export interface EducationResponse {
  setNames: string[]
  sets: Record<string, EducationDistribution[]>
}

// competenceMapping
interface CompetenceCategory {
  category: string
  value: number
  size: number
}

interface Competence {
  category: string
  children: CompetenceCategory[]
}

export interface CompetenceMappingResponse {
  setNames: string[]
  sets: Record<string, Competence[]>
}

// competenceFilter
export interface CompetenceFilterResponse {
  category: string
  subCategories: string[]
}
