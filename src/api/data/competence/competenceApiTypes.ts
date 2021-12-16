export interface CompetenceCategory {
  competenceAmount: number
  motivationAMount: 0
  category: string
  motivationProportion: number
  competenceProportion: number
}

export interface CompetenceResponse {
  setNames: string[]
  sets: Record<string, CompetenceCategory[]>
}
