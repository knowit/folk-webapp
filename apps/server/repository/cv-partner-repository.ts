export interface CVPartnerRepository {
  fetchCVPartnerDataForUser(user_id: string): CVPartnerData
}

export interface EducationItem {
  institution: string
  degree: string
  year: number
}

export interface Project {
  name: string
  description: string
  year: number
}

export interface CVPartnerData {
  Education: EducationItem[]
  Projects: Project[]
}
